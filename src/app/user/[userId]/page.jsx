

import { UserPage } from "@/components/custom/UserPage";
import { getNftsCreatedByUser, getNftsOwnedByUser, getUserById, getCollectionsByUser } from "@/data/loaders"


export default async function UserRoute(context){
    const {params, searchParams} = context;
    const tab = searchParams?.tab || 'nfts';
    const urlParams = new URLSearchParams(searchParams);
    const currentPage = Number(urlParams.get(`${tab}Page`)) || 1;
    const data = await getUserById(params.userId)
    const nftsCreated = await getNftsCreatedByUser(params.userId, currentPage)
    
    const nftsOwned = await getNftsOwnedByUser(params.userId,currentPage)
    const collections = await getCollectionsByUser(params.userId,currentPage)

  return <UserPage data={data} nftsCreated={nftsCreated} nftsOwned={nftsOwned} collections={collections} />
}