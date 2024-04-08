import SidebarItem from "../sidebar_item";
const Sidebar = ()=> {
    return (
        <aside className="sidebar max-md:invisible  max-md:h-0 max-md:w-0">
            <ul className="sidebar--items sticky">
                <SidebarItem label={"Home"} src={"/homeicon.svg"} link={"/home"} alt={"Home Icon"}/>
                <SidebarItem label={"Add"} src={"/addicon.svg"} link={"/add"} alt={"Add Icon"}/>
                <SidebarItem label={"Analytics"} src={"/anaylticsicon.svg"} link={"/analytics"} alt={"Analytics Icon"}/>
                <SidebarItem label={"DataHub"} src={"/datahubicon.svg"} link={"/datahub"} alt={"DataHub Icon"}/>
                <SidebarItem label={"Settings"} src={"/settingsicon.svg"} link={"/settings"} alt={"Settings Icon"}/>
                <SidebarItem label={"Log Off"} src={""} link={"/"} alt={"Log Off Icon"}/>
            </ul>
        </aside>
    )
}
export default Sidebar;