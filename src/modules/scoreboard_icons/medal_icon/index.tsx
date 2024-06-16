import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

interface MedalIconProps {
    className?: string;
    type: number;
  }

const MedalIcon = ({className, type}: MedalIconProps) => {
    let fill1 = [
        "#EFC75E",
        "#E4E7E7",
        "#ED9D5D",
        "#444444"
    ];
    let fill2 = [
        "#D7B354",
        "#CDCFCF",
        "#D58D54",
        "#666666"
    ];
    return(
        <svg 
	    viewBox="0 0 300.439 300.439"
        xmlns="http://www.w3.org/2000/svg" 
        
        className={twMerge('w-35 h-35 fill-none stroke-white ',className)}
        >
            <title>medal</title>

            <path style={{fill:"#BF392C"}} d="M276.967,0h-84.498L70.415,178.385h84.498L276.967,0z"/>
            <path style={{fill:"#E2574C"}} d="M23.472,0h84.498l122.053,178.385h-84.498L23.472,0z"/>
            <path style={{fill:![1,2,3].includes(type)?fill1[3]:fill1[type-1]}} d="M154.914,93.887c57.271,0,103.276,46.005,103.276,103.276s-46.005,103.276-103.276,103.276
                S51.638,254.434,51.638,197.163S97.643,93.887,154.914,93.887z"/>
            <path style={{fill:![1,2,3].includes(type)?fill2[3]:fill2[type-1]}} d="M154.914,122.053c-41.31,0-75.11,33.799-75.11,75.11s33.799,75.11,75.11,75.11
                s75.11-33.799,75.11-75.11S196.224,122.053,154.914,122.053z M154.914,253.495c-30.983,0-56.332-25.35-56.332-56.332
                s25.35-56.332,56.332-56.332s56.332,25.35,56.332,56.332S185.896,253.495,154.914,253.495z"/>
        </svg>
    );
}
export default MedalIcon;