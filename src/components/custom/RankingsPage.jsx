'use client'
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { UserCard } from "./UserCard";


export  function RankingsPage({ users}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentTab = searchParams.get("tab") || "1d";
    const router = useRouter();
  
    const handleTabChange = (tab) => {
      const params = new URLSearchParams(searchParams);
      params.set("tab", tab);
      router.push(`?${params.toString()}`);
    };
    
    return (
    <div className=" grid justify-items-center pt-30 md:pt-40  bg-bg px-30 max-w-[37.5rem] md:max-w-[83.5rem] lg:max-w-[105rem]">
        <div className="grid gap-30 md:gap-30 justify-items-start w-full">
            <div className="grid gap-20">
                <h4 className="md:text-xl md:leading-small lg:text-4xl lg:leading-tight">Top Creators</h4>
                <p className="text-base lg:text-md lg:leading-loose">Check out top ranking NFT artists on the NFT Marketplace.</p>
            </div>
            <div className='grid grid-cols-4 w-full justify-items-start'>
                <button onClick={() => handleTabChange("1d")} className={`${currentTab === "1d"?  "border-b-2 text-white" : 'text-captionText'} p-20 border-captionText w-full`} >1d</button >
                <button onClick={() => handleTabChange("7d")} className={`${currentTab === "7d"?  "border-b-2" : 'text-captionText'} p-20 border-captionText w-full`} >7d</button >
                <button onClick={() => handleTabChange("30d")} className={`${currentTab === "30d"?  "border-b-2 text-white" : 'text-captionText'} p-20 border-captionText w-full`} >30d</button >
                <button onClick={() => handleTabChange("all")} className={`${currentTab === "all"?  "border-b-2" : 'text-captionText'} md:p-20  border-captionText w-full`} >All Time</button >
            </div>
        </div>
       <div className="grid gap-20 py-40 w-full">
            <div className="grid grid-cols-3  py-13 px-10 items-center border border-bgSecondary rounded-img lg:px-20 lg:grid-cols-5">
                <div className="flex gap-10 lg:gap-20  items-center col-span-2 lg:col-span-2 lg:w-fit">
                    <p className=" font-secondary font-normal leading-relaxed text-base text-captionText">#</p>
                    <p className=" font-secondary font-normal leading-tight text-xs text-captionText md:text-base md:leading-relaxed ">Artist</p>
                </div>
                <div className="grid md:grid-cols-2 items-center justify-self-center w-fit md:w-full lg:grid-cols-3 lg:col-span-3">
                    <p className="hidden md:flex font-secondary font-normal leading-tight text-xs text-captionText md:text-base md:leading-relaxed  ">Change</p>
                    <p className="hidden lg:flex font-secondary font-normal leading-tight text-xs text-captionText md:text-base md:leading-relaxed ">NFTs Sold</p>
                    <p className="font-secondary font-normal leading-tight text-xs text-captionText md:text-base md:leading-relaxed ">Volume</p>
                </div>
            </div>
            {users.map((user,index) => (
            <div key={user.id}>
                <UserCard user={user} index={index} />
            </div>
            ))}
       </div>
            
        
    </div>
  );
}

