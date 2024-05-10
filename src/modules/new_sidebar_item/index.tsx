import { Card } from "flowbite-react"

const NewSidebarItem = ({text}: {text: string}) => {
    return(
            <Card className="h-16" style={{ border: "1px solid [#D2D2D2]" }}>
                <div className="flex flex-row">
                    <div className="m-2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="50" viewBox="0 0 24 24" width="50">
                                <path d="M0 0h24v24H0z" fill="none"/>
                                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 14h-2v2h-2v-2H7v-2h2v-2h2v2h2v2zm-2-6h2V7h-2v3z" fill="#7A7A7A"/>
                        </svg>
                    </div>
                    <div className="place-content-center w-full">
                        <p style={{ color: '#7A7A7A', fontSize: '20px'}}>{text}</p>
                    </div>
                </div>
            </Card>
    )
}

export default NewSidebarItem;