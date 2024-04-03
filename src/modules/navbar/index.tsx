import Image from "next/image";
import NBSearchbar from "../nb-searchbox";

const Navbar = () => {
    return(
        <nav className="navbar navbar--fixed-top max-sm:grid-cols-1 max-sm:grid">
            <div className="navbar__inner ">
                <div className="navbar__items navbar__items--left ">
                  <p className="font-thin text-white text-opacity-75 select-none ">Nebulon-v0.0.0a</p>
                </div>
                <div className="navbar__items navbar__items--right">
                    <div className="bar-search max-sm:invisible max-sm:w-0 max-sm:h-0"/>
                    <div>
                    <NBSearchbar/>
                    </div>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;