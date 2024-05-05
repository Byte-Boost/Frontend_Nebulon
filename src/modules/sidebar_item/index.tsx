import HomeIcon from "../sidebar_icons/home_icon";
import AddIcon from "../sidebar_icons/add_icon";
import OptionsIcon from "../sidebar_icons/options_icon";
import LogOutIcon from "../sidebar_icons/logout_icon";
import DashboardIcon from "../sidebar_icons/dashboard_icon";
import { useState } from "react";
import AdminIcon from "../sidebar_icons/admin_icon";
import ProductIcon from "../sidebar_icons/products_icon";
import ClientIcon from "../sidebar_icons/client_icon";
import CommissionIcon from "../sidebar_icons/commission_icon";


const SidebarItem = 
({ 
  title, 
  icon,
  isHovered,
  hasDropdown = false,
  link,
  children
}: {
  title: string, 
  icon: string, 
  isHovered: boolean,
  hasDropdown?: boolean,
  link?: string,
  children?: React.ReactNode
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);  
  return (
        <li className="my-2 cursor-pointer " onClick={() => setDropdownOpen(!dropdownOpen)}>
        
        {hasDropdown == false 
        && 
        <a href={link} className="flex items-center  transition-all duration-200  ease-in-out hover:scale-105 active:scale-90">
          {icon == 'home' && <HomeIcon/>}
          {icon == 'dashboard' && <DashboardIcon/>}
          {icon == 'add' && <AddIcon/>}
          {icon == 'options' && <OptionsIcon/>}
          {icon == 'logout' && <LogOutIcon/>}
          {icon == 'admin' && <AdminIcon/>}
          {icon == 'product' && <ProductIcon/>}
          {icon == 'client' && <ClientIcon/>}
          {icon == 'commission' && <CommissionIcon/>}
          <span className={`transition-all duration-200 ease-in-out ${isHovered ? 'ml-2' : 'ml-0'} ${isHovered ? 'block' : 'hidden'} font-semibold`}>{title.toUpperCase()}</span>
        </a>
        }
        {hasDropdown
        &&
        <a className="flex items-center  transition-all duration-200  ease-in-out hover:scale-105 active:scale-90">
          {icon == 'home' && <HomeIcon/>}
          {icon == 'dashboard' && <DashboardIcon/>}
          {icon == 'add' && <AddIcon/>}
          {icon == 'options' && <OptionsIcon/>}
          {icon == 'logout' && <LogOutIcon/>}
          {icon == 'admin' && <AdminIcon/>}
          {icon == 'product' && <ProductIcon/>}
          {icon == 'client' && <ClientIcon/>}
          {icon == 'commission' && <CommissionIcon/>}
          <span className={`transition-all duration-200 ease-in-out select-none ${isHovered ? 'ml-2' : 'ml-0'} ${isHovered ? 'block' : 'hidden'} font-semibold`}>{title.toUpperCase()}</span>
        </a>
        }
        {hasDropdown 
        && dropdownOpen && (
        <ul className={` ${isHovered ? 'ml-2' : 'ml-0'} ${isHovered ? 'block' : 'hidden'}`}>
          {children}
        </ul>
      )}
      
      </li>
    )
}
export default SidebarItem;