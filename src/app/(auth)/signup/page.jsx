import { SignupForm } from "@/components/forms/SignupForm";
import { getSignUpPageData } from "@/data/loaders";

export default async function SignUpRoute(){
  const strapiData = await getSignUpPageData();
  return <SignupForm data={strapiData} />
}