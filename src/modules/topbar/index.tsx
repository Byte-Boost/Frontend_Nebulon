import { usePathname } from 'next/navigation';
import React from 'react';

const TopBar = () => {
const pathname = usePathname();
  return (
    <div className="bg-[#1F1F1F] p-4 max-md:hidden fixed w-screen ">
      <div className="flex items-center justify-between flex-wrap h-5">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="pl-20 font-semibold text-xl tracking-tight">{'NEBULON' + pathname?.toUpperCase()}</span>
        </div>
        {/* Add search bar here if we ever need */}
        {/* this is the icon that appers when the screen is small */}
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v15z"/></svg>
          </button>
        </div>
        
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow"> 
          {/* Add menu items here if we ever need */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;