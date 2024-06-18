import Link from "next/link";
import { StrapiImage } from "@/components/custom/StrapiImage";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";

export async function TrendingSection({ data }) {
  const { title, description, collections } = data;
  const user = await getUserMeLoader();

  return (
    <div className="flex flex-col gap-40 py-40">
      <div className="flex flex-col gap-10">
        <h4 className="lg:text-xl lg:leading-small font-semibold md:text-lg md:leading-relaxed">{title}</h4>
        <p className="lg:text-md lg:leading-loose font-normal md:text-base md:leading-relaxed">{description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-30">
        {collections.data.map((collection, index) => (
          <div
            key={collection.id}
            className={`flex flex-col gap-10 ${
              index > 0 ? "hidden" : ""
            } md:${index > 1 ? "hidden" : "flex"} lg:${index > 2 ? "hidden" : "flex"}`}
          >
            <div className="grid grid-cols-3 grid-rows-4 gap-15 h-full">

              {collection.nfts.data.slice(0, 3).map((img, imgIndex) => (
                
                <Link
                  href={`nft/${img.id}`}
                  key={imgIndex}
                  className={`${
                    imgIndex === 0 ? "col-span-3 row-span-3" : ""
                  } transition-all ease-in duration-300 hover:scale-95`}
                >
                  <StrapiImage
                    className="rounded-img w-full h-full"
                    src={img.nftImg.url}
                    alt="nft"
                    height={600}
                    width={600}
                  />
                </Link>
              ))}
              <div className="flex items-center text-base px-20 py-20  justify-center bg-action rounded-img font-secondary md:text-md  leading-loose font-bold transition-all ease-in duration-300 hover:scale-95">
                1025+
              </div>
            </div>
            <div className="">
              <Link href={`/`}><h5 className="text-md leading-relaxed font-semibold ">{collection.collectionName}</h5></Link>
              <Link href={`user/${collection.collectionOwner.id}`} >
                <div className="flex gap-12 items-center">
                <StrapiImage
                  src={collection.collectionOwner.avatar.url}
                  className="w-24 h-24"
                  alt="avatar"
                  height="48"
                  width="48"
                />
                <p className="text-base leading-relaxed font-normal">{collection.collectionOwner.username}</p>
                
                </div>
                
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
