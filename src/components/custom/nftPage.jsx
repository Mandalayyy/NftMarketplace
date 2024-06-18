
import Link from "next/link";
import { StrapiImage } from "@/components/custom/StrapiImage";
import Timer from "./Timer";



export async function NftPage({ data }) {
  console.log(data)
    return (
    <div className=" grid">
      <StrapiImage src={data.nftImg?.url}  height={560} width={2600} alt='nft' className=" object-cover w-full h-320 lg:h-550"/> 
      <div className="w-full justify-self-center px-30 max-w-[37.5rem] md:max-w-[83.5rem] lg:max-w-[105rem]">
        <div className="grid pt-40">
           <div className="grid md:grid-cols-2">
            <div>
                <h4 className="md:text-xl lg:text-7xl leading-tight">{data.nftName}</h4>
                <p className=" lg:text-md leading-loose font-normal">{data.nftCreateDate}</p>
              </div>
              <div className=" justify-self-end">
                <Timer  endDate={data?.auctionEndDate} />
              </div>
           </div>
            <div>
              <p className=" lg:text-md leading-loose font-normal">Created By</p>
              <div className="flex gap-10">
                <StrapiImage src={data.nft_creator.avatar.url} className="w-24 h-24 rounded-full" alt='avatar' height="48" width='48' />
                <p className="font-secondary text-base font-normal leading-relaxed">{data.nft_creator.username}</p>
              </div>
            </div>
        </div>
        <div className="py-80 grid  gap-30 items-center md:grid-cols-2 md:grid-flow-row">
          <h4 className="lg:col-span-2 md:text-xl lg:text-7xl leading-tight">More from this artist</h4>
          <Link className="order-3 md:order-2 justify-self-end flex gap-12 justify-center py-20 w-full items-center md:w-fit md:px-50  rounded-img border-2  border-action  lg:col-span-1 lg:justify-self-end" href={`/user/${data.nft_creator?.id}`}>Go To Artist Page</Link>
          <div className="grid gap-30  md:order-3 md:col-span-2 md:grid-cols-2 lg:col-span-3 lg:grid-cols-3">
              {data.nft_creator.nftsCreated.data.map(( nft) => (
                <div key={nft.id}  className="transition-all ease-in duration-300 hover:scale-95">
                  <Link href={`/nft/${nft.id}`} key={nft.id}>
                    <div className=" bg-bgSecondary rounded-img">
                      <StrapiImage className="rounded-t-img" src={nft.nftImg.url} width={800} height={800} alt='avatar' />
                      <div className="flex gap-25 flex-col px-20 pt-20 pb-25">
                        <div>
                          <h5 className="font-semibold text-md leading-relaxed">{nft.nftName}</h5>
                          <Link href={`/user/${data.nft_creator.id}`}>
                            <div className="flex gap-12">
                              <StrapiImage src={data.nft_creator.avatar.url} className="w-24 h-24 rounded-full" alt='avatar' height="48" width='48' />
                              <p className="font-secondary text-base font-normal leading-relaxed">{data.nft_creator.username}</p>
                            </div>
                          </Link>
                        </div>
                        <div>
                          <p className="font-secondary text-xs leading-tight text-captionText">Price</p>
                          <p className="text-xs lg:text-base font-secondary font-normal leading-relaxed">{nft.nftPrice} ETH</p>
                        </div>
                      </div>
                    </div>
                  
                </Link>
                </div>
                
              ))}
              
          </div>
        </div>
      </div>
        
    </div>
  );
}
