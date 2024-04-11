import { twMerge } from "tailwind-merge";


interface AddIconProps {
    className?: string;
  }

const AddIcon = ({className}: AddIconProps) => {
    return(
        <svg 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
        x='0px'
        y='0px'
        width="35" 
        height="35"
        className={twMerge('w-35 h-35 fill-white stroke-white',className)}
        >
        <title>AddIcon</title>
            <g id="Complete">
                <g id="add-square">
                    <g>
                        <rect data-name="--Rectangle" fill="none" height="20" id="_--Rectangle" rx="2" ry="2"  stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="20" x="2" y="2"/>
                        <line  stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="15.5" x2="8.5" y1="12" y2="12"/>
                        <line  stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="15.5" y2="8.5"/>
                    </g>
                </g>
            </g>
        </svg>
    );
}
export default AddIcon;