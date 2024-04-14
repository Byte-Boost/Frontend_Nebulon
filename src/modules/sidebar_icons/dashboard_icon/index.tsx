import { twMerge } from "tailwind-merge";

interface DashboardIconProps {
    className?: string;
}

const  DashboardIcon = ({className}:  DashboardIconProps) => {
    return (
        <svg 
        width="35" 
        height="35" 
        viewBox="0 0 32 32" 
        id="svg5"   
        version="1.1" 
        xmlns="http://www.w3.org/2000/svg" 
        className={twMerge("w-35 h-35 fill-white ", className)}
        >
        <title>DashboardIcon</title>
        <defs id="defs2"/>
        <g id="layer1" transform="translate(-348,-436)">
            <path d="m 355,458.01367 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 4 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z" id="path453689" />
            <path d="m 371,455.01367 a 1,1 0 0 0 -1,1 v 3.58594 l -0.29297,-0.29297 A 1,1 0 0 0 369,459.01367 a 1,1 0 0 0 -0.70703,0.29297 1,1 0 0 0 0,1.41406 l 2,2 a 1.0001,1.0001 0 0 0 0.0469,0.0371 1,1 0 0 0 0.0859,0.0684 1.0001,1.0001 0 0 0 0.0898,0.0566 1,1 0 0 0 0.10547,0.0508 1.0001,1.0001 0 0 0 0.10352,0.0352 1,1 0 0 0 0.10547,0.0254 1.0001,1.0001 0 0 0 0.11914,0.0137 1,1 0 0 0 0.0508,0.006 1,1 0 0 0 0.0508,-0.006 1.0001,1.0001 0 0 0 0.11914,-0.0137 1,1 0 0 0 0.10547,-0.0254 1.0001,1.0001 0 0 0 0.10352,-0.0352 1,1 0 0 0 0.10547,-0.0508 1.0001,1.0001 0 0 0 0.0898,-0.0566 1,1 0 0 0 0.0859,-0.0684 1.0001,1.0001 0 0 0 0.0469,-0.0371 l 2,-2 a 1,1 0 0 0 0,-1.41406 1,1 0 0 0 -1.41406,0 L 372,459.59961 v -3.58594 a 1,1 0 0 0 -1,-1 z" id="path453665" />
            <path d="m 355,450.01367 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 4 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z" id="path453651"/>
            <path d="m 355,442.01367 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 4 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z" id="path453627" />
            <path d="m 353,438.01367 c -1.6447,0 -3,1.3553 -3,3 v 4 c 0,0.76628 0.29675,1.46716 0.77734,2 -0.48059,0.53284 -0.77734,1.23372 -0.77734,2 v 4 c 0,0.76628 0.29675,1.46716 0.77734,2 -0.48059,0.53284 -0.77734,1.23372 -0.77734,2 v 4 c 0,1.6447 1.3553,3 3,3 h 13.11133 c 1.26351,1.23579 2.98973,2 4.88867,2 3.85414,0 7,-3.14585 7,-7 0,-2.78161 -1.63913,-5.19487 -4,-6.32226 v -3.67774 c 0,-0.76628 -0.29675,-1.46716 -0.77734,-2 0.48059,-0.53284 0.77734,-1.23372 0.77734,-2 v -4 c 0,-1.6447 -1.3553,-3 -3,-3 z m 0,2 h 18 c 0.5713,0 1,0.42871 1,1 v 4 c 0,0.5713 -0.4287,1 -1,1 h -18 c -0.5713,0 -1,-0.4287 -1,-1 v -4 c 0,-0.57129 0.4287,-1 1,-1 z m 0,8 h 18 c 0.5713,0 1,0.42871 1,1 v 3.07227 c -0.32711,-0.0472 -0.66021,-0.0723 -1,-0.0723 -1.89894,0 -3.62516,0.76421 -4.88867,2 H 353 c -0.5713,0 -1,-0.4287 -1,-1 v -4 c 0,-0.57129 0.4287,-1 1,-1 z m 18,6 c 2.77327,0 5,2.22674 5,5 0,2.77327 -2.22673,5 -5,5 -1.44074,0 -2.73243,-0.602 -3.64258,-1.56836 a 1,1 0 0 0 -0.16797,-0.18554 C 366.44728,461.38795 366,460.25556 366,459.01367 c 0,-1.25636 0.45901,-2.39958 1.2168,-3.27539 a 1,1 0 0 0 0.0645,-0.0762 c 0.91337,-1.01394 2.23794,-1.64844 3.71875,-1.64844 z m -18,2 h 11.67773 c -0.43469,0.9103 -0.67773,1.92747 -0.67773,3 0,1.07253 0.24304,2.0897 0.67773,3 H 353 c -0.5713,0 -1,-0.4287 -1,-1 v -4 c 0,-0.57129 0.4287,-1 1,-1 z" id="path453609" />
        </g>
        </svg>
    );
}
export default DashboardIcon;