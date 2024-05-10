import { Card } from "flowbite-react"
import NewSidebarItem from "../new_sidebar_item";
import DashboardIcon from "../sidebar_icons/dashboard_icon";

const NewSidebar = () => {
    return(
        <Card className="flex flex-col justify-between h-[calc(100vh)] w-full max-w-[20rem] drop-shadow-2xl">
            <div className="flex flex-col p-4 gap-4 max-w-[20rem]">
                <NewSidebarItem text="Dashboard"/>
                <NewSidebarItem text="Registar"/>
                <NewSidebarItem text="Tabelas"/>
                <NewSidebarItem text="Adiministração"/>
            </div>
            <div className="new-sidebar p-4 max-w-[20rem] h-full">
                <div className="absolute inset-x-4 bottom-4">
                    <NewSidebarItem text="Exit"/>
                </div>
            </div>
        </Card>
    )
}

export default NewSidebar;