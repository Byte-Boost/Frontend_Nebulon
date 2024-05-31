import React, { useEffect, useState } from 'react';
import SidebarItem from '../sidebar_item';
import cookie from '@boiseitguru/cookie-cutter';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from 'jwt-decode'; 
import { useRouter } from 'next/router';
interface MyJwtPayload extends JwtPayload {
  admin: boolean; 
}
interface SidebarProps {
  isAdminProp?: boolean
}

const Sidebar = ({isAdminProp}:SidebarProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdmin, setIsAdmin] = useState(isAdminProp);

  useEffect(() => {
    const token = cookie.get('token');
    if (token) {
      const decoded = jwtDecode<MyJwtPayload>(token);
      setIsAdmin(decoded.admin);
    }
  },[]);
  const router = useRouter();
  const currentPath = router.pathname;
  return (
    <div 
      className={`transition-all duration-200 ease-in-out ${isHovered ? 'w-48' : 'w-[3.4rem]'} bg-[#1c1c1e] h-screen fixed flex flex-col justify-between border-r-[1px] border-[#424042]`} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="text-white px-2 py-4">
        <ul>
          {/* Add more menu items as needed */}
          <SidebarItem title={'DASHBOARD'} isHovered={isHovered} icon={'dashboard'} link={'/home'} isActive={ currentPath === '/home'}/>
          
          <SidebarItem title={'TABELAS'} isHovered={isHovered} icon={'tables'}  hasDropdown={true} isActive={currentPath === '/tabela/comissao' || currentPath === '/tabela/produto' ||  currentPath === '/tabela/cliente'}>
            <SidebarItem title={'COMISSÃO'} isHovered={isHovered} icon={'commission'} link={'/tabela/comissao'} isActive={ currentPath === '/tabela/comissao'} />
            <SidebarItem title={'PRODUTOS'} isHovered={isHovered} icon={'product'} link={'/tabela/produto'}  isActive={ currentPath === '/tabela/produto'}/>
            <SidebarItem title={'CLIENTES'} isHovered={isHovered} icon={'client'} link={'/tabela/cliente'} isActive={ currentPath === '/tabela/cliente'} />
          </SidebarItem>
          
          <SidebarItem title={'ADICIONAR'} isHovered={isHovered} icon={'add'} hasDropdown={true} isActive={  currentPath === '/adicionar/comissao' || currentPath === '/adicionar/produto' || currentPath === '/adicionar/cliente'}>
            <SidebarItem title={'COMISSÃO'} isHovered={isHovered} icon={'commission'} link={'/adicionar/comissao'}  isActive={ currentPath === '/adicionar/comissao'}/>
            <SidebarItem title={'PRODUTOS'} isHovered={isHovered} icon={'product'} link={'/adicionar/produto'} isActive={ currentPath === '/adicionar/produto'}/>
            <SidebarItem title={'CLIENTES'} isHovered={isHovered} icon={'client'} link={'/adicionar/cliente'} isActive={ currentPath === '/adicionar/cliente'}/>
          </SidebarItem>
          
          {
          isAdmin
          && 
          <SidebarItem title={'GERENCIA'} isHovered={isHovered} icon={'admin'} hasDropdown={true} isActive={ currentPath === '/adm/usuarios'}>
            <SidebarItem title={'USUÁRIOS'} isHovered={isHovered} icon={'client'} link={'/adm/usuarios'} isActive={ currentPath === '/adm/usuarios'}/>
            {/* <SidebarItem title={'OPÇÕES'} isHovered={isHovered} icon={'options'} link={'/adm/opcoes'}/> */}
          </SidebarItem>
          }
        </ul>
      </div>
          <div className="text-white px-2 py-4">
            <ul>
              <SidebarItem title={'SAIR'} isHovered={isHovered} icon={'logout'} link={'/'}  />
            </ul>
          </div>
    </div>
  );
};

export default Sidebar;