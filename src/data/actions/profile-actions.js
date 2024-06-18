"use server";
import { z } from "zod";
import qs from "qs";

import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import { mutateData } from "@/data/services/mutate-data";
import { flattenAttributes } from "@/lib/utils";
import { redirect } from "next/navigation";

import {
  fileDeleteService,
  fileUploadService,
} from "@/data/services/file-service";

export async function updateProfileAction(
  userId,
  prevState,
  formData
) {
  const rawFormData = Object.fromEntries(formData);

  const query = qs.stringify({
    populate: "*",
  });

  const payload = {
    firstName: rawFormData.firstName,
    lastName: rawFormData.lastName,
    bio: rawFormData.bio,
  };

  const responseData = await mutateData(
    "PUT",
    `/api/users/${userId}?${query}`,
    payload
  );

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      message: "Failed to Register.",
    };
  }

  const flattenedData = flattenAttributes(responseData);
  redirect(`/user/${userId}`);
  return {
    ...prevState,
    message: "Profile Updated",
    data: flattenedData,
    strapiErrors: null,
  };
}


const MAX_FILE_SIZE = 5000000;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// VALIDATE IMAGE WITH ZOD 
const imageSchema = z.object({
  image: z
    .any()
    .refine((file) => {
      if (file.size === 0 || file.name === undefined) return false;
      else return true;
    }, "Please update or add new image.")

    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    )
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`),
});

export async function uploadProfileImageAction(
  imageId,
  prevState,
  formData,
) {

  // GET THE LOGGED IN USER
  const user = await getUserMeLoader();
  if (!user.ok) throw new Error("You are not authorized to perform this action.");
  
  const userId = user.data.id;

  // CONVERT FORM DATA TO OBJECT
  const data = Object.fromEntries(formData);
    console.log(data.fieldName)
  // VALIDATE THE IMAGE
  const validatedFields = imageSchema.safeParse({
    image: data.image,
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      data: null,
      message: "Invalid Image",
    };
  }

  // DELETE PREVIOUS IMAGE IF EXISTS
  if (imageId) {
    try {
      await fileDeleteService(imageId);
    } catch (error) {
      return {
        ...prevState,
        strapiErrors: null,
        zodErrors: null,
        message: "Failed to Delete Previous Image.",
      };
    }
  }


  // UPLOAD NEW IMAGE TO MEDIA LIBRARY
  const fileUploadResponse = await fileUploadService(data.image);

  if (!fileUploadResponse) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (fileUploadResponse.error) {
    return {
      ...prevState,
      strapiErrors: fileUploadResponse.error,
      zodErrors: null,
      message: "Failed to Upload File.",
    };
  }
  const updatedImageId = fileUploadResponse[0].id;

  const payload = { [data.fieldName] : updatedImageId };
  console.log(payload)
  
  // UPDATE USER PROFILE WITH NEW IMAGE
  const updateImageResponse = await mutateData(
    "PUT",
    `/api/users/${userId}`,
    payload
  );
  const flattenedData = flattenAttributes(updateImageResponse);
  redirect(`/user/${userId}`);
  return {
    ...prevState,
    data: flattenedData,
    zodErrors: null,
    strapiErrors: null,
    message: "Image Uploaded",
  };
}