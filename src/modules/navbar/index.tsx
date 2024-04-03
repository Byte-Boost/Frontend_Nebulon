import Image from "next/image";

const Navbar = () => {
    return(
        <nav className="navbar navbar--fixed-top">
            <div className="navbar__inner">
                <div className="navbar__items">
                    <a className="navbar__brand">
                        <Image
                        className="navbar__logo"
                        src={'/Nebulon_icon.png'}
                        
                        // default size of the logo 
                        // CSS overrides this
                        width={526} 
                        height={526}
                        
                        alt="NebulonIcon"
                        />
                        <strong className='navbar__title'>by Byte-Boost</strong>
                    </a>
                </div>
                    <p className="font-bold text-center">This is just a test, final layout will be different.<br/> This text also breaks responsivity :P</p>
                <div className="navbar__items navbar__items--right">
                    <a href="https://github.com/Byte-Boost/Nebulon" target="_blank" rel="noopener noreferrer" className="navbar__item navbar__link">GitHub</a>
                    <a href="https://github.com/Byte-Boost" target="_blank" rel="noopener noreferrer" className="navbar__item navbar__link">Team</a>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;