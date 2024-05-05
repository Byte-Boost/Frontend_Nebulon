import React, { useState } from 'react';
import SidebarItem from '../sidebar_item';

const Sidebar = ({isAdmin = true}:{isAdmin?:boolean}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`transition-all duration-200 ease-in-out ${isHovered ? 'w-48' : 'w-10'} bg-gradient-to-b from-purple-500 to-[#805C90] h-screen fixed`} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="text-white px-2 py-4">
        <ul>
          {/* Add more menu items as needed */}
          <SidebarItem title={'HOME'} isHovered={isHovered} icon={'home'} link={'/home'}/>
          
          <SidebarItem title={'DASHBOARD'} isHovered={isHovered} icon={'dashboard'}  hasDropdown={true}>
            <SidebarItem title={'COMISSÃO'} isHovered={isHovered} icon={'commission'} link={'/dashboard/comissao'}/>
            <SidebarItem title={'PRODUTOS'} isHovered={isHovered} icon={'product'} link={'/dashboard/produto'}/>
            <SidebarItem title={'CLIENTES'} isHovered={isHovered} icon={'client'} link={'/dashboard/cliente'}/>
          </SidebarItem>
          
          <SidebarItem title={'ADICIONAR'} isHovered={isHovered} icon={'add'} hasDropdown={true}>
            <SidebarItem title={'COMISSÃO'} isHovered={isHovered} icon={'commission'} link={'/adicionar/comissao'}/>
            <SidebarItem title={'PRODUTOS'} isHovered={isHovered} icon={'product'} link={'/adicionar/produto'}/>
            <SidebarItem title={'CLIENTES'} isHovered={isHovered} icon={'client'} link={'/adicionar/cliente'}/>
          </SidebarItem>
          
          {
          isAdmin
          && 
          <SidebarItem title={'ADMINISTRAÇÃO'} isHovered={isHovered} icon={'admin'} hasDropdown={true}>
            <SidebarItem title={'USUÁRIOS'} isHovered={isHovered} icon={'client'} link={'/adm/usuarios'}/>
            {/* <SidebarItem title={'OPÇÕES'} isHovered={isHovered} icon={'options'} link={'/adm/opcoes'}/> */}
          </SidebarItem>
          }

          {/* <SidebarItem title={'OPÇÕES'} isHovered={isHovered} icon={'options'} link={'/opcoes'}/> */}
          <SidebarItem title={'SAIR'} isHovered={isHovered} icon={'logout'} link={'/'} />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;