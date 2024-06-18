import { StrapiImage } from "./StrapiImage";

export function UserCard({ index, user }) {

  return (
    <div className="grid grid-cols-3  py-13 px-10 items-center bg-bgSecondary rounded-img md:px-20 lg:grid-cols-5">
       <div className="flex gap-10 md:gap-20  items-center col-span-2 lg:col-span-2 lg:w-fit">
            <p className=" font-secondary text-xs font-normal leading-tight text-captionText md:text-base md:leading-relaxed lg:bg-bg lg:rounded-full lg:px-10 lg:py-4">{index+1}</p>
            <div className="flex gap-10 items-center lg:gap-20  transition-all ease-in duration-300 hover:scale-95">
                <StrapiImage src={user?.avatar?.url} width={120} height={120} className="w-24 h-24 rounded-full lg:w-60 lg:h-60" />
                <p className="text-base leading-relaxed font-normal md:font-semibold md:text-md">{user?.firstName} {user?.lastName}</p>
            </div>
       </div>
       <div className="grid md:grid-cols-2 items-center justify-self-center w-fit md:w-full lg:grid-cols-3 lg:col-span-3">
            <p className="hidden md:flex font-secondary leading-relaxed text-base font-normal text-green">+{user.change}%</p>
            <p className="hidden lg:flex font-secondary font-normal text-base leading-relaxed ">{user?.nftsSold}</p>
            <p className=" font-secondary font-normal text-xs leading-tight md:leading-relaxed md:text-base">{user?.volume} ETH</p>
       </div>
    </div>
  );
}
