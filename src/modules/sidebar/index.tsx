import React, { useState } from 'react';
import SidebarItem from '../sidebar_item';

const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`transition-all duration-200 ease-in-out ${isHovered ? 'w-44' : 'w-10'} bg-gradient-to-b from-purple-500 to-[#805C90] h-screen fixed`} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="text-white px-2 py-4">
        <ul>
          {/* Add more menu items as needed */}
          <SidebarItem title={'HOME'} isHovered={isHovered} icon={'home'} link={'/home'} />
          <SidebarItem title={'DASHBOARD'} isHovered={isHovered} icon={'dashboard'} link={'/dashboard'} />
          <SidebarItem title={'ADICIONAR'} isHovered={isHovered} icon={'add'} link={'/adicionar'} />
          {/*<SidebarItem title={'OPTIONS'} isHovered={isHovered} icon={'options'} link={'/options'} />*/}
          <SidebarItem title={'SAIR'} isHovered={isHovered} icon={'logout'} link={'/'} />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;