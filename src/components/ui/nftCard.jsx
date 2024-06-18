import React, { useState } from "react";
import Link from "next/link";
import { StrapiImage } from "@/components/custom/StrapiImage";
import { deleteNftAction, updateNftAction } from "@/data/actions/nfts-actions";
import { useFormState } from "react-dom";
import { StrapiErrors } from "@/components/custom/StrapiErrors";
import { ImageForm } from "../forms/ImageForm";

const INITIAL_STATE = {
  strapiErrors: null,
  data: null,
  message: null,
};

export function NftCard({ nft, data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState({
    nftName: nft.nftName,
    nftPrice: nft.nftPrice,
    nftImg: nft.nftImg,
  });

  const deleteSummaryById = deleteNftAction.bind(null, nft.id);

  const [deleteState, deleteAction] = useFormState(deleteSummaryById, INITIAL_STATE);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedNft = { ...nft, ...formState };
    await updateNftAction(updatedNft); // Предполагается, что у вас есть эта функция
    setIsModalOpen(false);
  };

  return (
    <div>
      <div href={`/nft/${nft.id}`} key={nft.id}>
        <div className={`bg-bg rounded-img`}>
          <StrapiImage className="rounded-t-img" src={nft.nftImg.url} width={800} height={800} alt="avatar" />
          <div className="flex gap-25 flex-col px-20 pt-20 pb-25">
            <div>
              <h5 className="font-semibold text-md leading-relaxed">{nft.nftName}</h5>
              <Link href={`/user/${data.id}`} className="flex gap-12">
                <StrapiImage src={data.avatar.url} className="w-24 h-24" alt="avatar" height="48" width="48" />
                <p className="font-secondary text-base font-normal leading-relaxed">{data.username}</p>
              </Link>
            </div>
            <div>
              <div>
                <p className="font-secondary text-xs leading-tight text-captionText">Price</p>
                <p className="text-xs lg:text-base font-secodary font-normal leading-relaxed">{nft.nftPrice} ETH</p>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <button onClick={() => setIsModalOpen(true)}>Update NFT</button>
      <form action={deleteAction}>
        <button className="bg-red-700 hover:bg-red-600">Delete</button>
        <StrapiErrors error={deleteState?.strapiErrors} />
      </form>

      {isModalOpen && (
        <div className="modal">
          <div className="fixed top-0 text-bg  left-0 bg-bgSecondary">
            <span className="close" onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            <div className="grid grid-cols-2">
                <form onSubmit={handleSubmit}>
                <div>
                    <label>
                    Name:
                    <input className="w-full lg:h-fit rounded-img px-20 py-12" type="text" name="nftName" value={formState.nftName} onChange={handleInputChange} />
                    </label>
                </div>
                <div>
                    <label>
                    Price:
                    <input className="w-full lg:h-fit rounded-img px-20 py-12" type="text" name="nftPrice" value={formState.nftPrice} onChange={handleInputChange} />
                    </label>
                </div>
                <button type="submit">Save</button>
                </form>
                <ImageForm fieldName='nftImg' data={nft.nftImg} />
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
