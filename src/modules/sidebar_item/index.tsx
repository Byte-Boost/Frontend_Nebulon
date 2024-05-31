import HomeIcon from "../sidebar_icons/home_icon";
import AddIcon from "../sidebar_icons/add_icon";
import OptionsIcon from "../sidebar_icons/options_icon";
import LogOutIcon from "../sidebar_icons/logout_icon";
import DashboardIcon from "../sidebar_icons/dashboard_icon";
import React, { useState } from "react";
import AdminIcon from "../sidebar_icons/admin_icon";
import ProductIcon from "../sidebar_icons/products_icon";
import ClientIcon from "../sidebar_icons/client_icon";
import CommissionIcon from "../sidebar_icons/commission_icon";
import TablesIcon from "../sidebar_icons/tables_icon";
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

const getIcon = (iconName: keyof typeof iconMapping | string, className?: string) => {
  const iconMapping = {
    'home': <HomeIcon className={className}/>,
    'dashboard': <DashboardIcon className={className}/>,
    'add': <AddIcon className={className}/>,
    'options': <OptionsIcon className={className}/>,
    'logout': <LogOutIcon className={className}/>,
    'admin': <AdminIcon className={className}/>,
    'product': <ProductIcon className={className}/>,
    'client': <ClientIcon className={className}/>,
    'commission': <CommissionIcon className={className}/>,
    'tables': <TablesIcon className={className}/>
  };
  return iconMapping[iconName];
};


const SidebarItem = ({
  title,
  icon,
  isActive,
  isHovered,
  hasDropdown,
  link,
  children,
  className,
  classNameText
}: {
  title: string, 
  icon: string,
  isActive?: boolean, 
  isHovered: boolean,
  hasDropdown?: boolean,
  link?: string,
  children?: React.ReactNode,
  className?: string,
  classNameText?: string
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);  
  return (
      <li className={`my-2 cursor-pointer font-JetBrainsMono ${isActive? isHovered?'bg-[#c14379]':null :null} rounded-md ${dropdownOpen?  isHovered?'bg-[#2e302e]':null: null}`} onClick={() => setDropdownOpen(!dropdownOpen)}>
        <a href={link} 
        className={`flex items-center justify-between transition-all duration-200  ease-in-out rounded-md hover:bg-[#e45693] ${dropdownOpen?  isHovered?'bg-[#1c1c1e]':null: null}`}>
          <div className={`flex items-center ${isActive? isHovered? null:'bg-[#c14379]':null} rounded-md `}>
            {getIcon(icon,className)}
            <span className={`transition-all duration-200 ease-in-out ${isHovered ? 'ml-2' : 'ml-0'} ${isHovered ? 'block' : 'hidden'} font-semibold ${classNameText}`}>{title.toUpperCase()}</span>
          </div>
          {hasDropdown && <span className={` pr-2  transition-all duration-200 ease-in-out ${isHovered ? 'ml-2' : 'ml-0'} ${isHovered ? 'block' : 'hidden'}`}>{dropdownOpen ?<FaAngleUp /> : <FaAngleDown />}</span>}
        </a>
        {hasDropdown 
        && dropdownOpen && (
        <ul className={` ${isHovered ? 'block' : 'hidden ml-0'} `}>
          {React.Children.map(children, child => (
            <li className={``}>{child}</li>
          ))}
        </ul>
      )}
      </li>
    )
}
export default SidebarItem;