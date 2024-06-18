

import MarketplaceTabs from "@/components/custom/MarketplaceTabs";
import { Search } from "@/components/custom/Search";
import { getCollections, getNfts} from "@/data/loaders";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";


export default async function MarketplaceRoute({searchParams}) {
 const query = searchParams?.query ?? "";
 const tab = searchParams?.tab || 'nfts';
 const params = new URLSearchParams(searchParams);
 const currentPage = Number(params.get(`${tab}Page`)) || 1;
 const nfts = await getNfts(query, currentPage);
 const collections = await getCollections(query, currentPage);
 const user = await getUserMeLoader()
  return (
   <div className="grid w-full">
        <div className="py-40 grid justify-self-center gap-30  px-30 md:px-72 lg:px-115 w-full max-w-[37.5rem] md:max-w-[83.5rem] lg:max-w-[105rem]">
            <div className="grid gap-20">
                <h4 className="md:text-xl md:leading-small lg:text-4xl lg:leading-tight">Browse Marketplace</h4>
                <p className="text-base lg:text-md lg:leading-loose">Browse through more than 50k NFTs on the NFT Marketplace.</p>
            </div>
            <div className="w-full">
                <Search />
            </div>
        </div>
        <div>
            <MarketplaceTabs user={user} nfts={nfts} collections={collections}  />
        </div>
   </div>
  );
}
