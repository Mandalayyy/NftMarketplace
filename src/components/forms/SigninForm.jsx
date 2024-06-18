"use client";
import Link from "next/link";
import { useFormState } from "react-dom";
import { loginUserAction } from "@/data/actions/auth-actions";
import { ZodErrors } from "@/components/custom/ZodErrors";
import { StrapiImage } from "../custom/StrapiImage";
import { StrapiErrors } from "../custom/StrapiErrors";
const INITIAL_STATE = {
    zodErrors: null,
    strapiErrors: null,
    data: null,
    message: null,
  };


export function SignInForm(data) {
    const [formState, formAction] = useFormState(loginUserAction, INITIAL_STATE);

      
    return(
        <div className="grid md:grid-cols-2 gap-40">
            <StrapiImage className='h-full' src={data.data.img.url} alt='placeholder' width='1200' height='1200' />
            <form className="px-30 grid gap-20 py-30 md:px-0 md:pr-72 md:py-80" action={formAction}>
                <div className="grid gap-20">
                    <h3 className="md:text-xl lg:text-4xl lg:leading-tight">{data.data.title}</h3>
                    <p className=" leading-relaxed lg:leading-loose lg:text-md">{data.data.description}</p>
                </div>
                <div className="grid gap-15 text-bg text-base font-normal leading-relaxed lg:w-325"> 
                    <input className="w-full lg:h-fit rounded-img px-20 py-12" id="identifier" name="identifier" type="email" placeholder="Email" />
                    <ZodErrors error={formState?.zodErrors?.identifier} />
                    <input className="w-full lg:h-fit rounded-img px-20 py-12"
                id="password"
                name="password"
                type="password"
                placeholder="Password"
              />
                   <ZodErrors error={formState.zodErrors?.password} />
                </div>
                <button className="w-full bg-action rounded-img py-12 font-semibold text-base lg:w-fit lg:px-105 lg:h-fit" type="submit">Sign In</button>
                <StrapiErrors error={formState?.strapiErrors} />
                <p className=" leading-relaxed lg:leading-loose lg:text-md">Don`t have an account? <Link href="/signup" className="underline">Sign Up</Link></p>
            </form>
            
        </div>
    )
}