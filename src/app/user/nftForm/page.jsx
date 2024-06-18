import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import { NftForm } from "@/components/forms/NftForm";
import { NftImageForm } from "@/components/forms/NftImageForm";

export default async function NftFormRoute({ data }) {
  

  return (
    <div className="grid  justify-items-center">
      <div><h4>Create NFT</h4></div>
      <div className="grid  items-center w-fit">
        <NftForm data={data}  className="" />
      </div>
      
    </div>
  );
}