import { twMerge } from "tailwind-merge";

interface DashboardIconProps {
    className?: string;
}

const  DashboardIcon = ({className}:  DashboardIconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <title>DashboardIcon</title>
            <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
        </svg>
    );
}
export default DashboardIcon;