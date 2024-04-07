
const NBSearchbar = () =>{
    return(
        <search className=" invisible max-sm:w-0 max-sm:h-0"> {/* This is a searchbar component that is hidden for now */ }
            <div className="container--searchbar max-sm:p-0 max-sm align-middle ">
                <input 
                type="search" 
                placeholder="Search"
                id="search" 
                className="nb-searchbar "
                name="q"
                />
            </div>
        </search>
    )
}   

export default NBSearchbar;