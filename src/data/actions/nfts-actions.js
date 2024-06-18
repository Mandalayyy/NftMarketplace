"use server";
import { z } from "zod";
import { getAuthToken } from "@/data/services/get-token";
import { mutateData } from "@/data/services/mutate-data";
import { flattenAttributes } from "@/lib/utils";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";

import {
  fileDeleteService,
  fileUploadService,
} from "@/data/services/file-service";


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

export async function createNftAction(prevState,formData) {
  const authToken = await getAuthToken();
  if (!authToken) throw new Error("No auth token found");

  // Convert form data to object
  const data = Object.fromEntries(formData);


  // Validate the image
  const validatedFields = imageSchema.safeParse({
    image: data.image,
  });

  if (!validatedFields.success) {
    return {
      strapiErrors: null,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      data: null,
      message: "Invalid Image",
    };
  }

  // Upload the new image to the media library
  const fileUploadResponse = await fileUploadService(data.image);

  if (!fileUploadResponse) {
    return {
      strapiErrors: null,
      zodErrors: null,
      data: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (fileUploadResponse.error) {
    return {
      strapiErrors: fileUploadResponse.error,
      zodErrors: null,
      data: null,
      message: "Failed to Upload File.",
    };
  }

  const imageId = fileUploadResponse[0].id;

  // Create the NFT with the image ID
  const payload = {
    nftName: data.nftName,
    nftPrice: data.nftPrice,
    nftDescription: data.nftDescription,
    nftImg: imageId, // Assuming the field name in Strapi is nftImg
  };

  const responseData = await mutateData("POST", "/api/nfts", { data: payload });

  if (!responseData) {
    return {
      strapiErrors: null,
      zodErrors: null,
      data: null,
      message: "Oops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      strapiErrors: responseData.error,
      zodErrors: null,
      data: null,
      message: "Failed to create NFT.",
    };
  }

  const flattenedData = flattenAttributes(responseData);
  redirect(`/`);

  return {
    strapiErrors: null,
    zodErrors: null,
    data: flattenedData,
    message: "NFT created successfully",
  };
}

export async function updateNftAction(prevState, formData) {
  const rawFormData = Object.fromEntries(formData);
  const id = rawFormData.id;
  const payload = {
    nftName: rawFormData.nftName,
    nftPrice: rawFormData.nftPrice,
    nftDescription: rawFormData.nftDescription,
  };


  // Перевірка, чи є нове зображення у формі
  if (rawFormData.image) {
    // Validate the image
    const validatedFields = imageSchema.safeParse({
      image: rawFormData.image,
    });

    if (!validatedFields.success) {
      return {
        strapiErrors: null,
        zodErrors: validatedFields.error.flatten().fieldErrors,
        data: null,
        message: "Invalid Image",
      };
    }

    // Upload the new image to the media library
    const fileUploadResponse = await fileUploadService(rawFormData.image);

    if (!fileUploadResponse) {
      return {
        strapiErrors: null,
        zodErrors: null,
        data: null,
        message: "Oops! Something went wrong. Please try again.",
      };
    }

    if (fileUploadResponse.error) {
      return {
        strapiErrors: fileUploadResponse.error,
        zodErrors: null,
        data: null,
        message: "Failed to Upload File.",
      };
    }

    const imageId = fileUploadResponse[0].id;
    payload.nftImg = imageId; // Assuming the field name in Strapi is nftImg
  }

  const authToken = await getAuthToken();
  if (!authToken) throw new Error("No auth token found");

  // Оновлення NFT
  const responseData = await mutateData("PUT", `/api/nfts/${id}`, { data: payload });

  if (!responseData) {
    return {
      strapiErrors: null,
      zodErrors: null,
      data: null,
      message: "Oops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      strapiErrors: responseData.error,
      zodErrors: null,
      data: null,
      message: "Failed to update NFT.",
    };
  }

  const flattenedData = flattenAttributes(responseData);
  

  return {
    strapiErrors: null,
    zodErrors: null,
    data: flattenedData,
    message: "NFT updated successfully",
  };
}

export async function deleteNftAction(id, prevState) {
  const responseData = await mutateData("DELETE", `/api/nfts/${id}`);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      message: "Oops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      message: "Failed to delete summary.",
    };
  }

  redirect("");
}



export async function uploadNftImageAction(
  imageId,
  prevState,
  formData,
) {

  // GET THE LOGGED IN USER
  const user = await getUserMeLoader();
  if (!user.ok) throw new Error("You are not authorized to perform this action.");
  
  

  // CONVERT FORM DATA TO OBJECT
  const data = Object.fromEntries(formData);
    console.log(data, 'DATAimg')
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
    `/api/nfts/${data.nftId}`,
    {data: payload}
  );
  const flattenedData = flattenAttributes(updateImageResponse);
  console.log(updateImageResponse)

  return {
    ...prevState,
    data: flattenedData,
    zodErrors: null,
    strapiErrors: null,
    message: "Image Uploaded",
  };
}

