import React from "react";

const Content = ({header,children}: {header:string,children:React.ReactNode}) =>{
    return(
        <div className="content">
            <h1>{header}</h1>
            {children}
        </div>
    )
}
export default Content; 