"use client"
import Link from "next/link";
import { StrapiImage } from "@/components/custom/StrapiImage";
import { useEffect, useState } from "react";



  export  function TopCreatorsSection({ data }) {
    const { title,description, link, users} = data;
    const [filteredUsers, setFilteredUsers] = useState(users.data);

    const updateFilteredUsers = () => {
      const width = window.innerWidth;
      console.log(width)
      if (width >= 1024) {
        setFilteredUsers(users.data); // lg: всі елементи
      } else if (width >= 768) {
        setFilteredUsers(users.data.slice(0, 6)); // md: перші 6 елементів
      } else {
        setFilteredUsers(users.data.slice(0, 5)); // mobile: перші 5 елементів
      }
    };
  
    useEffect(() => {
      updateFilteredUsers();
      window.addEventListener("resize", updateFilteredUsers);
      return () => window.removeEventListener("resize", updateFilteredUsers);
    }, [users]);

    return (
      <div className="grid gap-y-40 py-40  md:grid-flow-row md:grid-cols-2  lg:grid-cols-4 lg:grid-flow-row">
        <div className="flex flex-col w-full gap-10 md:row-span-1 lg:col-span-3">
          <h4 className="lg:text-xl lg:leading-small font-semibold md:text-lg md:leading-relaxed">{title}</h4>
          <p className="lg:text-md lg:leading-loose font-normal md:text-base md:leading-relaxed">{description}</p>
        </div>
        <div className="flex order-3  gap-12 px-80 md:px-50 w-fit items-center justify-self-end self-end  py-20  rounded-img border-2  border-action md:row-span-1 lg:col-span-1  transition-all ease-in duration-300 hover:scale-95" >
          <div>
            <svg width="2rem" height="2rem" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6.17053 12.4494C6.28055 12.7766 6.10451 13.131 5.77734 13.241C4.71792 13.5973 4.15489 14.4866 3.85373 15.391C3.73414 15.7501 3.66189 16.0958 3.61848 16.3817C3.90434 16.3383 4.25006 16.266 4.60917 16.1464C5.51355 15.8453 6.4029 15.2823 6.75916 14.2228C6.86918 13.8957 7.2236 13.7196 7.55078 13.8296C7.87795 13.9397 8.05399 14.2941 7.94396 14.6213C7.4096 16.2103 6.08801 16.9715 5.00411 17.3324C4.45655 17.5148 3.94395 17.6048 3.5698 17.6497C3.38182 17.6722 3.22641 17.6836 3.116 17.6894C3.06074 17.6924 3.01658 17.6939 2.98505 17.6946C2.96928 17.695 2.95666 17.6952 2.94737 17.6954L2.93596 17.6955L2.93217 17.6955L2.93077 17.6955L2.93019 17.6955C2.92993 17.6955 2.92969 17.6955 2.92969 17.0705C2.30469 17.0705 2.30469 17.0702 2.30469 17.07L2.30469 17.0694L2.30469 17.068L2.30471 17.0642L2.30481 17.0528C2.30493 17.0435 2.30514 17.0309 2.30553 17.0151C2.30631 16.9836 2.30782 16.9394 2.31072 16.8842C2.31653 16.7738 2.32797 16.6184 2.35052 16.4304C2.3954 16.0562 2.48542 15.5436 2.66776 14.9961C3.0287 13.9122 3.78989 12.5906 5.37891 12.0562C5.70608 11.9462 6.0605 12.1222 6.17053 12.4494ZM2.92969 17.0705H2.30469C2.30469 17.4157 2.58451 17.6955 2.92969 17.6955V17.0705Z" fill="#A259FF"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5462 3.45406C15.8208 3.34943 14.0351 3.31002 12.2076 5.13753L7.34482 10.0003L10 12.6555L14.8627 7.79271C16.6903 5.9652 16.6508 4.17951 16.5462 3.45406ZM16.7275 2.21727C15.7298 2.07282 13.5058 2.07157 11.3237 4.25365L6.019 9.55834C5.90179 9.67555 5.83594 9.83452 5.83594 10.0003C5.83594 10.166 5.90179 10.325 6.019 10.4422L9.55806 13.9813C9.80214 14.2254 10.1979 14.2254 10.4419 13.9813L15.7466 8.67659C17.9287 6.49452 17.9275 4.27052 17.783 3.27282C17.7465 3.0058 17.6235 2.75803 17.4329 2.5674C17.2422 2.37678 16.9945 2.25382 16.7275 2.21727Z" fill="#A259FF"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M14.422 8.49219C14.7672 8.49219 15.047 8.77201 15.047 9.11719V14.1641L15.0469 14.173C15.0423 14.5013 14.9086 14.8145 14.675 15.045L12.1527 17.575C11.9926 17.7349 11.7921 17.8484 11.5725 17.9033C11.353 17.9582 11.1227 17.9524 10.9061 17.8867C10.6896 17.8209 10.495 17.6976 10.343 17.5299C10.1912 17.3623 10.0877 17.1567 10.0435 16.9349C10.0434 16.9347 10.0435 16.9351 10.0435 16.9349L9.38731 13.6619C9.31946 13.3235 9.53882 12.9941 9.87727 12.9263C10.2157 12.8584 10.5451 13.0778 10.6129 13.4162L11.2694 16.6906L13.797 14.1552V9.11719C13.797 8.77201 14.0768 8.49219 14.422 8.49219Z" fill="#A259FF"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5.82625 4.95319L5.83515 4.95312H10.882C11.2272 4.95312 11.507 5.23295 11.507 5.57812C11.507 5.9233 11.2272 6.20312 10.882 6.20312H5.84399L5.83894 6.20828L5.83891 6.20825L3.30859 8.73075L3.30956 8.73094L6.583 9.38719C6.92144 9.45504 7.1408 9.78441 7.07295 10.1229C7.0051 10.4613 6.67574 10.6807 6.33729 10.6128L3.06483 9.95675C3.06464 9.95671 3.06445 9.95668 3.06426 9.95664C2.84252 9.91244 2.6369 9.80892 2.46933 9.65711C2.30162 9.50516 2.1783 9.31054 2.11254 9.094C2.04677 8.87746 2.04103 8.64712 2.09592 8.42757C2.15081 8.20802 2.26427 8.00749 2.4242 7.84738L2.42514 7.84644L2.42514 7.84644L4.95424 5.32514C5.18475 5.09151 5.49796 4.95786 5.82625 4.95319Z" fill="#A259FF"/>
            </svg>
          </div>
          <Link className=" font-semibold text-base leading-relaxed " href={link.url}>{link.text}</Link>
        </div>
        <div className="grid md:order-3 gap-20 md:gap-30 md:col-span-2 md:grid-cols-2 lg:grid lg:grid-cols-4 lg:grid-flow-row lg:col-span-4 lg:gap-30 md:row-span-3 ">
            {filteredUsers.map((user,index)=> (
                <Link href={`/user/${user.id}`} key={user.id}  className=" transition-all ease-in duration-300 hover:scale-95">
                   <div className="relative z-0 bg-bgSecondary rounded-img flex gap-20 lg:flex-col items-center justify-items-center p-20">
                    <div className="absolute top-13 left-12 rounded-full text-base font-secondary leading-relaxed bg-bg px-10 py-4 text-captionText">
                        {index+1}
                      </div>
                      <StrapiImage className="lg:w-120 lg:h-120 w-60 h-60" src={user.avatar.url} width={150} height={150} alt='avatar'/>
                      <div className="grid lg:justify-items-start md:justify-items-start">
                        <h5 className="font-semibold text-md leading-relaxed">{user.username}</h5>
                        <div className="">
                          <p className=" text-captionText text-base font-normal leading-relaxed">Total Sales:</p>
                          <p className="text-base">{user.totalSales}</p>
                        </div>
                      </div>
                   </div>
                    
                </Link>
            ))}
        </div>
      </div>
    );
  }


  