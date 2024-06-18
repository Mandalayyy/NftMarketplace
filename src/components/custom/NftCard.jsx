import React, { useState, useEffect } from "react";
import Link from "next/link";
import { StrapiImage } from "@/components/custom/StrapiImage";
import { deleteNftAction, updateNftAction } from "@/data/actions/nfts-actions";
import { useFormState } from "react-dom";
import { StrapiErrors } from "@/components/custom/StrapiErrors";
import ImagePicker from "./ImagePicker";
import { usePathname } from "next/navigation";
import { ZodErrors } from "./ZodErrors";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

const INITIAL_STATE = {
  strapiErrors: null,
  data: null,
  message: null,
};

export function NftCard({ nft, user}) {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUser, setIsUser] = useState(false)

  const userData = nft.nft_creator;

  useEffect(() => {
    if (pathname === `/user/${user?.data?.id}`) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }, [pathname]);


  const deleteNftById = deleteNftAction.bind(null, nft.id);

  const [deleteState, deleteAction] = useFormState(deleteNftById, INITIAL_STATE);
  const [updateState, updateAction] = useFormState(updateNftAction, INITIAL_STATE);





  const handleButtonClick = (e) => {
    e.preventDefault(); // Prevents the default link behavior
    e.stopPropagation(); // Prevents the click from propagating to the parent link
    setIsModalOpen(true); // Opens the modal
  };

  const handleCloseModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(false);
  };





  return (
    <div className="h-full  ">
       
      <div className={`bg-bg rounded-img grid h-full transition-all ease-in duration-300 hover:scale-95`}>
        <Link href={`/nft/${nft.id}`} passHref className="">
        <StrapiImage className="rounded-t-img w-full" src={nft.nftImg?.url} width={800} height={800} alt="avatar" />
        </Link>
        <div className="grid grid-cols-4 px-20">
          <div className="grid col-span-3 gap-25 pt-20 pb-25">
            <div>
              <Link href={`/nft/${nft.id}`} passHref className="">
              <h5 className="font-semibold text-md leading-relaxed">{nft.nftName}</h5>
              </Link>
              <Link href={`/user/${userData?.id}`} passHref>
                <div className="flex gap-12 items-center">
                  <StrapiImage src={userData?.avatar?.url} className="w-24 h-24 rounded-full" alt="avatar" height="48" width="48" />
                  <p className="font-secondary text-base font-normal leading-relaxed">{userData.username}</p>
                </div>
              </Link>
            </div>
            <div>
              <div>
                <p className="font-secondary text-xs leading-tight text-captionText">Price</p>
                <p className="text-xs lg:text-base font-secodary font-normal leading-relaxed">{nft.nftPrice} ETH</p>
              </div>
            </div>
          </div>
          {isUser && (
            <div className="grid grid-cols-2 justify-self-end gap-5 pt-20 h-fit w-fit">
              <div className="h-fit">
                <IconButton color="primary" aria-label="Update NFT" onClick={handleButtonClick}>
                  <EditIcon />
                </IconButton>
              </div>
              <form action={deleteAction} className="h-fit">
                <IconButton color="error" aria-label="Update NFT">
                  <button type="submit"><DeleteIcon /></button>
                </IconButton>
                <StrapiErrors error={deleteState?.strapiErrors} />
              </form>
            </div>
          )}
        </div>
      </div>
 
      

      {isModalOpen && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 p-15 bg-bg bg-opacity-80  flex items-center justify-center justify-self-center max-w-[37.5rem] md:max-w-[83.5rem] lg:max-w-[105rem]"  >
          <div className=" ">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <div className="grid  ">
                <form className="grid gap-20 p-20 md:grid-cols-2 " action={updateAction}  > 
                  <div className="">
                    <div>
                      <label>
                          Price:
                          <input className="w-full lg:h-fit rounded-img px-20 py-12 text-black" type="text" name="nftName" placeholder="nftName" defaultValue={nft?.nftName}  />
                        </label>
                    </div>
                    <div>
                        <label>
                          Price:
                          <input className="w-full lg:h-fit rounded-img px-20 py-12 text-black" type="text" name="nftPrice" defaultValue={nft?.nftPrice}   />
                        </label>
                    </div>
                    <div>
                        <label>
                          Description:
                          <input className="w-full lg:h-fit rounded-img px-20 py-12 text-black" type="text" name="nftDescription" defaultValue={nft?.nftDescription}  />
                        </label>
                    </div>
                    <input type="hidden" name="id" value={nft.id} />
                  </div>
               
                <div className="flex items-center">
                  <ImagePicker
                    id="image"
                    name="image"
                    label="nft Image"
                    defaultValue={nft.nftImg.url}
                  />
                  <input type="hidden" name="fieldName" value='nftImg' />
                  <ZodErrors error={updateState.zodErrors?.image} />
                  <StrapiErrors error={updateState.strapiErrors} />
                </div>
                  <button type="submit" className="w-full col-span-2 justify-self-center bg-action rounded-img py-12 font-semibold text-base lg:w-fit lg:px-105 lg:h-fit">Save</button>
                  <StrapiErrors error={updateState?.strapiErrors} />
                </form>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
