
// components/BurgerMenu.js
'use client'

import { NftsTab } from './NftsTab';
import { CollectionTab } from './collectionTab';
import { usePathname, useSearchParams, useRouter } from "next/navigation";


function blockRenderer(currentTab,  nfts, collections, user ) {
    switch (currentTab) {
      case "nfts":
        return <NftsTab nftsData={nfts} tab={currentTab} user={user}/>;
      case "collections":
        return <CollectionTab collectionsData={collections} tab={currentTab} user={user}/>;
      default:
        return null;
    }
  }

const MarketplaceTabs = ({ nfts, collections, user }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentTab = searchParams.get("tab") || "nfts";
    const router = useRouter();
  
    const handleTabChange = (tab) => {
      const params = new URLSearchParams(searchParams);
      params.set("tab", tab);
      router.push(`?${params.toString()}`);
    };
    
    return (
        <div className='border-b-2 border-bg grid justify-items-center'>
            <div className='grid grid-cols-2 w-full  max-w-[37.5rem] md:max-w-[83.5rem] lg:max-w-[105rem]'>
                <button onClick={() => handleTabChange("nfts")} className={`${currentTab === "nfts"?  "border-b-2 text-white" : 'text-captionText'} p-20 border-captionText `} >NFTs <span className={`${currentTab === "nfts"?  " bg-captionText" : ' bg-bgSecondary'} px-10 py-5 rounded-img h-fit w-fit ` } >{nfts?.data?.length}</span></button >
                <button onClick={() => handleTabChange("collections")} className={`${currentTab === "collections"?  "border-b-2" : 'text-captionText'} p-20 border-captionText`} >Collections <span className={`${currentTab === "collections"?  " bg-captionText" : ' bg-bgSecondary'} px-10 py-5 rounded-img h-fit w-fit ` } >{collections?.data?.length}</span></button >
            </div>
            <div className='py-80 bg-bgSecondary grid w-full'>
              <div>
                <div className='grid '>
                      {blockRenderer(currentTab, nfts, collections, user)}
                  </div>
              </div> 
            </div>
        </div>
       
    );
};

export default MarketplaceTabs;
