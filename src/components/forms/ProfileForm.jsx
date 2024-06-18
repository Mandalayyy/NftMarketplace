"use client";
import React from "react";

import { useFormState } from "react-dom";
import { updateProfileAction } from "@/data/actions/profile-actions";






import { StrapiErrors } from "@/components/custom/StrapiErrors";

const INITIAL_STATE = {
  data: null,
  strapiErrors: null,
  message: null,
};




export function ProfileForm({
  data,
}) {

  const updateUserWithId = updateProfileAction.bind(null, data.id);

  const [formState, formAction] = useFormState(
    updateUserWithId,
    INITIAL_STATE
  );

  return (
    <form action={formAction}
      className="px-30 grid gap-20 py-30 md:px-0 md:pr-72 md:py-80">
      <div className=" grid gap-15 text-bg text-base font-normal leading-relaxed lg:w-325">
        <div className="grid grid-cols-1 gap-20">
          <input
            id="username"
            name="username"
            placeholder="Username"
            className="w-full lg:h-fit rounded-img px-20 py-12"
            defaultValue={data.username || ""}
            disabled
          />
  
          <input
            id="email"
            name="email"
            placeholder="Email"
            className="w-full lg:h-fit rounded-img px-20 py-12"
            defaultValue={data.email || ""}
            disabled
          />
         
        </div>

        <div className="grid grid-cols-1 gap-20">
          <input
            id="firstName"
            name="firstName"
            placeholder="First Name"
            className="w-full lg:h-fit rounded-img px-20 py-12"
            defaultValue={data.firstName || ""}
          />
          <input
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            className="w-full lg:h-fit rounded-img px-20 py-12"
            defaultValue={data.lastName || ""}
          />
        </div>
        <textarea
          id="bio"
          name="bio"
          placeholder="Write your bio here..."
          className="resize-y border rounded-md w-full py-12 px-20"
          defaultValue={data.bio || ""}
          required
        />
      </div>
      <div className="flex justify-end">
        <button type="submit" text="Update Profile" loadingText="Saving Profile" className="w-full bg-action rounded-img py-12 font-semibold text-base lg:w-fit lg:px-105 lg:h-fit" >Update profile</button>
      </div>
      <StrapiErrors error={formState?.strapiErrors} />
    </form>
  );
}