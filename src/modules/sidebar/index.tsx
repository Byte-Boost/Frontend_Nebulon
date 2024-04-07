import SidebarItem from "../sidebar_item";
const Sidebar = ()=> {
    return (
        <nav className="sidebar h-[87vh]"> {/* Ignore the crime that is that h-[87vh] it's just temporary duct tape*/}
            <ul className="sidebar--items">
                <SidebarItem label={"Home"} src={"/homeicon.svg"} link={"/"} alt={"Home Icon"}/>
                <SidebarItem label={"Add"} src={"/addicon.svg"} link={"/add"} alt={"Add Icon"}/>
                <SidebarItem label={"Analytics"} src={"/anaylticsicon.svg"} link={"/analytics"} alt={"Analytics Icon"}/>
                <SidebarItem label={"DataHub"} src={"/datahubicon.svg"} link={"/datahub"} alt={"DataHub Icon"}/>
                <SidebarItem label={"Settings"} src={"/settingsicon.svg"} link={"/settings"} alt={"Settings Icon"}/>
            </ul>
        </nav>
    )
}
export default Sidebar;