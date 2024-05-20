import React, { useEffect, useState } from 'react';
import SidebarItem from '../sidebar_item';
import cookie from '@boiseitguru/cookie-cutter';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from 'jwt-decode'; 
interface MyJwtPayload extends JwtPayload {
  admin: boolean; 
}
const Sidebar = ({isAdmin: isAdminProp = false }:{isAdmin?:boolean}) => {
  const [decodedToken, setDecodedToken] = useState<MyJwtPayload | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isAdmin, setIsAdmin] = useState(isAdminProp);

  useEffect(() => {
    const token = cookie.get('token');
    if (token) {
      const decoded = jwtDecode<MyJwtPayload>(token);
      setDecodedToken(decoded);
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
          <SidebarItem title={'HOME'} isHovered={isHovered} icon={'home'} link={'/home'}/>
          
          <SidebarItem title={'DASHBOARD'} isHovered={isHovered} icon={'dashboard'}  hasDropdown={true}>
            <SidebarItem title={'COMISSÃO'} isHovered={isHovered} icon={'commission'} link={'/dashboard/comissao'}/>
            <SidebarItem title={'PRODUTOS'} isHovered={isHovered} icon={'product'} link={'/dashboard/produto'}/>
            <SidebarItem title={'CLIENTES'} isHovered={isHovered} icon={'client'} link={'/dashboard/cliente'}/>
          </SidebarItem>
          
          <SidebarItem title={'ADICIONAR'} isHovered={isHovered} icon={'add'} hasDropdown={true}>
            <SidebarItem title={'COMISSÃO'} isHovered={isHovered} icon={'commission'} link={'/adicionar/comissao/formulario'}/>
            <SidebarItem title={'PRODUTOS'} isHovered={isHovered} icon={'product'} link={'/adicionar/produto/formulario'}/>
            <SidebarItem title={'CLIENTES'} isHovered={isHovered} icon={'client'} link={'/adicionar/cliente/formulario'}/>
          </SidebarItem>
          
          {
          isAdmin
          && 
          <SidebarItem title={'ADMINISTRAÇÃO'} isHovered={isHovered} icon={'admin'} hasDropdown={true}>
            <SidebarItem title={'USUÁRIOS'} isHovered={isHovered} icon={'client'} link={'/adm/usuarios/formulario'}/>
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