
// components/BurgerMenu.js
'use client'
import { useState } from 'react';
import Link from 'next/link';

const BurgerMenu = ({ navlinks, signUp }) => {
    const [open, setOpen] = useState(false);

    const handleLinkClick = () => {
        setOpen(false);
    };

    return (
        <>
            <div className="fixed top-20 right-30 cursor-pointer z-20 lg:hidden" onClick={() => setOpen(!open)}>
                <svg
                    className="w-24 h-24 text-white"
                    width="2.4rem"
                    height="2.4rem"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path fillRule="evenodd" clipRule="evenodd" d="M3 12C3 11.5858 3.33579 11.25 3.75 11.25H20.25C20.6642 11.25 21 11.5858 21 12C21 12.4142 20.6642 12.75 20.25 12.75H3.75C3.33579 12.75 3 12.4142 3 12Z" fill="white"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M3 6C3 5.58579 3.33579 5.25 3.75 5.25H15C15.4142 5.25 15.75 5.58579 15.75 6C15.75 6.41421 15.4142 6.75 15 6.75H3.75C3.33579 6.75 3 6.41421 3 6Z" fill="white"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M3 18C3 17.5858 3.33579 17.25 3.75 17.25H15C15.4142 17.25 15.75 17.5858 15.75 18C15.75 18.4142 15.4142 18.75 15 18.75H3.75C3.33579 18.75 3 18.4142 3 18Z" fill="white"/>
                </svg>
            </div>
            <nav className={`fixed top-0 right-0 w-full h-full z-10 bg-bgSecondary text-white flex flex-col items-center justify-center transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}>
                {navlinks.map((link) => (
                    <Link onClick={handleLinkClick}  key={link.id} href={link.url}>
                       {link.text}
                    </Link>
                ))}
                <Link onClick={handleLinkClick} key={signUp.id} href={signUp.url}>
                   {signUp.text}
                </Link>
            </nav>
        </>
    );
};

export default BurgerMenu;
