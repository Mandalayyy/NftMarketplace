import { SignInForm } from "@/components/forms/SigninForm";
import { getSignInPageData} from "@/data/loaders";

export default async function SignInRoute(){
  const strapiData = await getSignInPageData();
  return <SignInForm data={strapiData} />
}