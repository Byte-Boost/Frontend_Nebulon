import { twMerge } from "tailwind-merge";

interface TablesIconProps {
    className?: string;
}

const  TablesIcon = ({className}:  TablesIconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <title>TablesIcon</title>
            <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
        </svg>
    );
}
export default TablesIcon;