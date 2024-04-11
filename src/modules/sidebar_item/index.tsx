import HomeIcon from "../sidebar_icons/home_icon";
import AddIcon from "../sidebar_icons/add_icon";
import OptionsIcon from "../sidebar_icons/options_icon";
import LogOutIcon from "../sidebar_icons/logout_icon";
import DashboardIcon from "../sidebar_icons/dashboard_icon";



const SidebarItem = ({ title, icon,isHovered,link}: {title:string, icon:string, isHovered:boolean, link:string}) => {
    return (
        <li className="my-2 ">
        <a href={link} className="flex items-center  transition-all duration-200  ease-in-out hover:scale-105 ">
          {icon == 'home' && <HomeIcon/>}
          {icon == 'dashboard' && <DashboardIcon/>}
          {icon == 'add' && <AddIcon/>}
          {icon == 'options' && <OptionsIcon/>}
          {icon == 'logout' && <LogOutIcon/>}
          <span className={`transition-all duration-200 ease-in-out ${isHovered ? 'ml-2' : 'ml-0'} ${isHovered ? 'block' : 'hidden'} font-semibold`}>{title.toUpperCase()}</span>
        </a>
      </li>
    )
}
export default SidebarItem;