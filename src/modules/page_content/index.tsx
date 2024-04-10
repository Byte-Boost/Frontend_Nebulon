import { ReactElement, ReactPortal } from "react";
import Sidebar from "../sidebar";


const  PageContent = ({children}: Readonly<{children: React.ReactNode;}>)=> {
    return (
        <div className="flex flex-row">
        <Sidebar/>
                {children}
        </div>
    )
}
export default PageContent;