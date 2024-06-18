import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import { ProfileForm } from "@/components/forms/ProfileForm";
import { ImageForm } from "@/components/forms/ImageForm";

export default async function AccountRoute() {
  const user = await getUserMeLoader();
  const userData = user.data;
  const userImage = userData?.avatar;

  return (
    <div className="grid  justify-items-center">
      <div><h4>Update Profile</h4></div>
      <div className="grid grid-cols-2 items-center">
        <ProfileForm data={userData} className="" />
        <ImageForm data={userImage} fieldName="avatar"  />
      </div>
      
    </div>
  );
}