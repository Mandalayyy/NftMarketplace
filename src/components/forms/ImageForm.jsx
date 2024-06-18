"use client";
import React from "react";
import { useFormState } from "react-dom";



import { uploadProfileImageAction } from "@/data/actions/profile-actions";


import ImagePicker from "@/components/custom/ImagePicker";
import { ZodErrors } from "@/components/custom/ZodErrors";
import { StrapiErrors } from "@/components/custom/StrapiErrors";


const initialState = {
  message: null,
  data: null,
  strapiErrors: null,
  zodErrors: null,
};

export function ImageForm({
  data,
  fieldName,
}) {
    
    const uploadProfileImageWithIdAction = uploadProfileImageAction.bind(
        null,
        data?.id,
        
      );

  const [formState, formAction] = useFormState(
    uploadProfileImageWithIdAction,
    initialState
  );
  console.log(data, "IMG DATA")
  return (
    <form className="grid gap-20"  action={formAction}>
      <div >
        <ImagePicker
          id="image"
          name="image"
          label="Profile Image"
          defaultValue={data?.url || ""}
        />
        <input type="hidden" name="fieldName" value={fieldName} />
        <ZodErrors error={formState.zodErrors?.image} />
        <StrapiErrors error={formState.strapiErrors} />
      </div>
      <div className="flex justify-end">
        <button text="Update Image" loadingText="Saving Image" className="w-full bg-action rounded-img py-12 font-semibold text-base lg:w-fit lg:px-105 lg:h-fit">Update Image</button>
      </div>
    </form>
  );
}