import { RankingsPage } from "@/components/custom/RankingsPage";
import { getUsers } from "@/data/loaders";

export default async function RankingsRoute({searchParams}) {
    const users = await getUsers();
    
  return (
   <div className="w-full grid justify-items-center ">
        <RankingsPage users={users} />
   </div>
  );
}
