import { NftPage } from "@/components/custom/nftPage";
import { getNftById, getNftsCreatedByUser } from "@/data/loaders"

export default async function NftRoute(context){
  const {params, searchParams} = context;
  const nftData = await getNftById(params.nftId)
  const tab = searchParams?.tab || 'nfts';
  const urlParams = new URLSearchParams(searchParams);
  const currentPage = Number(urlParams.get(`${tab}Page`)) || 1;
  const nftsCreated = await getNftsCreatedByUser(nftData.nft_creator.id,currentPage)
  
  return <NftPage data={nftData} nftsCreated={nftsCreated}/>
}