import { twMerge } from "tailwind-merge";


interface ClientIconProps {
    className?: string;
  }

const ClientIcon = ({className}: ClientIconProps) => {
    return(
        <svg 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
  
        width="35" 
        height="35"
        className={twMerge('w-35 h-35 fill-none stroke-white ',className)}
        >
        <title>ClientIcon</title>
        <circle cx="12" cy="7" r="5" strokeWidth="2"/>
        <path d="M17 14H17.3517C18.8646 14 20.1408 15.1266 20.3285 16.6279L20.719 19.7519C20.8682 20.9456 19.9374 22 18.7344 22H5.26556C4.06257 22 3.1318 20.9456 3.28101 19.7519L3.67151 16.6279C3.85917 15.1266 5.13538 14 6.64835 14H7"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}
export default ClientIcon;