import Image from "next/image";
import NBSearchbar from "../nb-searchbox";

const Navbar = () => {
    return(
        <nav className="navbar navbar--fixed-top max-sm:grid-cols-1 max-sm:grid  ">
            <div className="navbar__inner">
                <div className="navbar__items navbar__items--left max-sm:justify-center">
                  <p className="font-thin text-white text-opacity-75 select-none ">Nebulon-v0.0.0a</p>
                </div>
                <div className=" navbar__items navbar__items--right max-sm:justify-center ">
                    <div className=" bar-search max-sm:invisible max-sm:w-0 max-sm:h-0 max-sm:absolute"/>
                    <NBSearchbar/>
                </div>  
            </div>
        </nav>
    );
}
export default Navbar;