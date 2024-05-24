import React, { useEffect, useState } from 'react';
import SidebarItem from '../sidebar_item';
import cookie from '@boiseitguru/cookie-cutter';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from 'jwt-decode'; 
interface MyJwtPayload extends JwtPayload {
  admin: boolean; 
}
const Sidebar = ({isAdmin: isAdminProp = false }:{isAdmin?:boolean}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdmin, setIsAdmin] = useState(isAdminProp);

  useEffect(() => {
    const token = cookie.get('token');
    if (token) {
      const decoded = jwtDecode<MyJwtPayload>(token);
      setIsAdmin(decoded.admin);
    }
  },[]);
  return (
    <div 
      className={`transition-all duration-200 ease-in-out ${isHovered ? 'w-48' : 'w-10'} bg-gradient-to-b from-purple-500 to-[#805C90] h-screen fixed`} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="text-white px-2 py-4">
        <ul>
          {/* Add more menu items as needed */}
          <SidebarItem title={'DASHBOARD'} isHovered={isHovered} icon={'dashboard'} link={'/home'}/>
          
          <SidebarItem title={'TABELAS'} isHovered={isHovered} icon={'tables'}  hasDropdown={true}>
            <SidebarItem title={'COMISSÃO'} isHovered={isHovered} icon={'commission'} link={'/tabela/comissao'} className='stroke-[#58ff60]' classNameText='text-[#58ff60]'/>
            <SidebarItem title={'PRODUTOS'} isHovered={isHovered} icon={'product'} link={'/tabela/produto'} className='fill-[#ff6600]' classNameText='text-[#ff6600]'/>
            <SidebarItem title={'CLIENTES'} isHovered={isHovered} icon={'client'} link={'/tabela/cliente'} className='stroke-[#6fc3fc]' classNameText='text-[#6fc3fc]'/>
          </SidebarItem>
          
          <SidebarItem title={'ADICIONAR'} isHovered={isHovered} icon={'add'} hasDropdown={true}>
            <SidebarItem title={'COMISSÃO'} isHovered={isHovered} icon={'commission'} link={'/adicionar/comissao'} className='stroke-[#58ff60]' classNameText='text-[#58ff60]'/>
            <SidebarItem title={'PRODUTOS'} isHovered={isHovered} icon={'product'} link={'/adicionar/produto'} className='fill-[#ff6600]' classNameText='text-[#ff6600]'/>
            <SidebarItem title={'CLIENTES'} isHovered={isHovered} icon={'client'} link={'/adicionar/cliente'} className='stroke-[#6fc3fc]' classNameText='text-[#6fc3fc]'/>
          </SidebarItem>
          
          {
          isAdmin
          && 
          <SidebarItem title={'ADMINISTRAÇÃO'} isHovered={isHovered} icon={'admin'} hasDropdown={true}>
            <SidebarItem title={'USUÁRIOS'} isHovered={isHovered} icon={'client'} link={'/adm/usuarios'} className='stroke-[#52355b]' classNameText='text-[#52355b]'/>
            {/* <SidebarItem title={'OPÇÕES'} isHovered={isHovered} icon={'options'} link={'/adm/opcoes'}/> */}
          </SidebarItem>
          }

          {/* <SidebarItem title={'OPÇÕES'} isHovered={isHovered} icon={'options'} link={'/opcoes'}/> */}
          <SidebarItem title={'SAIR'} isHovered={isHovered} icon={'logout'} link={'/'}  />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;