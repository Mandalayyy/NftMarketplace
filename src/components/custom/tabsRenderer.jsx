
// components/BurgerMenu.js
'use client'
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { NftsTab } from './NftsTab';
import { CollectionTab } from './collectionTab';

function blockRenderer(tab, nftsCreated, nftsOwned, collections, user) {
    switch (tab) {
      case "created":
        return <NftsTab nftsData={nftsCreated}  tab={tab} user={user}/>;
      case "owned":
        return <NftsTab nftsData={nftsOwned} tab={tab} user={user}/>;
      case "collection":
        return <CollectionTab collectionsData={collections} tab={tab} user={user}/>;
      default:
        return null;
    }
  }

const TabRenderer = ({user,  nftsCreated, nftsOwned, collections }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "created";
  const router = useRouter();

  const handleTabChange = (tab) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", tab);
    router.push(`?${params.toString()}`);
  };
    
    return (
        <div className="grid">
            <div className='grid grid-cols-3 justify-self-center max-w-[37.5rem] md:max-w-[83.5rem] lg:max-w-[105rem] w-full'>
                <button onClick={() => handleTabChange("created")} className={`${currentTab === "created"?  "border-b-2 text-white" : 'text-captionText'} p-20 border-captionText `} >Created <span className={`${currentTab === "created"?  " bg-captionText" : ' bg-bgSecondary'} px-10 py-5 rounded-img h-fit w-fit ` } >{nftsCreated.data.length}</span></button >
                <button onClick={() => handleTabChange("owned")} className={`${currentTab === "owned"?  "border-b-2" : 'text-captionText'} p-20 border-captionText`} >Owned <span className={`${currentTab=== "owned"?  " bg-captionText" : ' bg-bgSecondary'} px-10 py-5 rounded-img h-fit w-fit ` } >{nftsOwned.data.length}</span></button >
                <button onClick={() => handleTabChange("collection")} className={`${currentTab=== "collection"?  "border-b-2" : 'text-captionText'} p-20 border-captionText`} >Collection <span className={`${currentTab=== "collection"?  " bg-captionText" : ' bg-bgSecondary'} px-10 py-5 rounded-img h-fit w-fit ` } >{collections.data.length}</span></button >
            </div>
            <div className='py-80 bg-bgSecondary'>
                <div className='grid px-30 '>
                    {blockRenderer(currentTab, nftsCreated, nftsOwned, collections ,user)}
                </div>
                
            </div>
        </div>
       
    );
};

export default TabRenderer;
