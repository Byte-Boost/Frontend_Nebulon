import { twMerge } from "tailwind-merge";


interface CommissionIconProps {
    className?: string;
  }

const CommissionIcon = ({className}: CommissionIconProps) => {
    return(
        <svg 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
  
        width="35" 
        height="35"
        className={twMerge('w-35 h-35 fill-none stroke-white ',className)}
        >
        <title>CommissionIcon</title>
        <path d="M7 14L9.29289 11.7071C9.68342 11.3166 10.3166 11.3166 10.7071 11.7071L12.2929 13.2929C12.6834 13.6834 13.3166 13.6834 13.7071 13.2929L17 10M17 10V12.5M17 10H14.5"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"  strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
    );
}
export default CommissionIcon;