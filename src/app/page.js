import Image from "next/image";

import { getHomePageData } from "@/data/loaders";
import { HeroSection } from "@/components/custom/HeroSection";
import { TrendingSection } from "@/components/custom/TrendingSection";
import { TopCreatorsSection } from "@/components/custom/TopCreators";
import { DiscoverNFTSection } from "@/components/custom/DiscoverNFTSection";

function blockRenderer(block) {
  switch (block.__component) {
    case "layout.hero-section":
      return <HeroSection key={block.id} data={block} />;
    case "layout.trending-collections":
      return <TrendingSection key={block.id} data={block} />;
    case "layout.top-creators":
      return <TopCreatorsSection key={block.id} data={block} />;
    case "layout.discover-nft":
      return <DiscoverNFTSection key={block.id} data={block} />;
    default:
      return null;
  }
}
export default async function Home() {
  const strapiData = await getHomePageData();
  const { blocks } = strapiData;


  if (!blocks) return <div>No blocks found</div>;
  return (
    <main className="bg-bg justify-self-center  px-30 md:px-72 lg:px-115  max-w-[37.5rem] md:max-w-[83.5rem] lg:max-w-[105rem]">
    {blocks.map((block) => 
      <div key={block.id} className="">
        {blockRenderer(block)}
      </div>
      )}
  </main>
  );
}
