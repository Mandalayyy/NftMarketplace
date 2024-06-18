"use client";
import React from "react";
import ImagePicker from "../custom/ImagePicker";
import { useFormState } from "react-dom";
import { ZodErrors } from "../custom/ZodErrors";
import { StrapiErrors } from "@/components/custom/StrapiErrors";
import { createNftAction } from "@/data/actions/nfts-actions";





const INITIAL_STATE = {
  data: null,
  strapiErrors: null,
  message: null,
};




export function NftForm({

}) {



  const [formState, formAction] = useFormState(
    createNftAction,
    INITIAL_STATE
  );

  return (
    <form action={formAction}
      className="px-30 grid gap-20 py-30 md:px-0 md:pr-72 md:py-80 w-full max-w-[37.5rem] md:max-w-[83.5rem] lg:max-w-[105rem] ">
      <div className="grid md:grid-cols-2 gap-15 text-bg text-base font-normal leading-relaxed ">
        <div className="grid gap-20 h-fit">
            <input
              id="nftName"
              name="nftName"
              placeholder="NFT name"
              className="w-full lg:h-fit rounded-img px-20 py-12"            
            />
    
            <input
              id="nftPrice"
              name="nftPrice"
              placeholder="NFT Price"
              className="w-full lg:h-fit rounded-img px-20 py-12"
            />
          <textarea
            id="bio"
            name="bio"
            placeholder="Write nft description here..."
            className="resize-y border rounded-md w-full py-12 px-20"
            required
          />
        </div>
        <div className="flex items-center">
        <ImagePicker
          id="image"
          name="image"
          label="nft Image"
        />
        <input type="hidden" name="fieldName" value='nftImg' />
        <ZodErrors error={formState.zodErrors?.image} />
        <StrapiErrors error={formState.strapiErrors} />
        </div>
       
      </div>
      <div className="flex justify-center">
        <button type="submit" text="Update Profile" loadingText="Saving Profile" className="w-full bg-action justify-self-center rounded-img py-12 font-semibold text-base lg:w-fit lg:px-105 lg:h-fit" >Create NFT</button>
      </div>
      <StrapiErrors error={formState?.strapiErrors} />
    </form>
  );
}