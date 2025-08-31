import React from "react";
import Link from "next/link";

const NavBar = () => {
  return (
    <header className="px-5 py-3 bg-white fonts-sans dark-mode">
        <nav className='flex justify-between items-center font-bold text-3xl'>
            <Link href="/">NavBar</Link>
        
            <div className="flex items-center font-normal text-xl">
                Home
            </div>
        </nav>
    </header>
  )
};

export default NavBar;
