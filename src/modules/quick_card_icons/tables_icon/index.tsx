import { twMerge } from "tailwind-merge";


interface TableIconProps {
    className?: string;
  }

const TableIcon = ({className}: TableIconProps) => {
    return(
      <svg 
      width="190" 
      height="190" 
      viewBox="0 0 28 28" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge('w-35 h-35 fill-white stroke-white',className)}
      >
      <path clip-rule="evenodd" d="M1 20C1 18.8954 1.89543 18 3 18H6C7.10457 18 8 18.8954 8 20V25C8 26.1046 7.10457 27 6 27H3C1.89543 27 1 26.1046 1 25V20ZM6 20.4C6 20.1791 5.82091 20 5.6 20H3.4C3.17909 20 3 20.1791 3 20.4V24.6C3 24.8209 3.17909 25 3.4 25H5.6C5.82091 25 6 24.8209 6 24.6V20.4Z"  fill-rule="evenodd"/>
      <path clip-rule="evenodd" d="M10 3C10 1.89543 10.8954 1 12 1H15C16.1046 1 17 1.89543 17 3V25C17 26.1046 16.1046 27 15 27H12C10.8954 27 10 26.1046 10 25V3ZM15 3.4C15 3.17909 14.8209 3 14.6 3L12.4 3C12.1791 3 12 3.17909 12 3.4V24.6C12 24.8209 12.1791 25 12.4 25H14.6C14.8209 25 15 24.8209 15 24.6V3.4Z"  fill-rule="evenodd"/>
      <path clip-rule="evenodd" d="M19 11C19 9.89543 19.8954 9 21 9H24C25.1046 9 26 9.89543 26 11V25C26 26.1046 25.1046 27 24 27H21C19.8954 27 19 26.1046 19 25V11ZM24 11.4C24 11.1791 23.8209 11 23.6 11H21.4C21.1791 11 21 11.1791 21 11.4V24.6C21 24.8209 21.1791 25 21.4 25H23.6C23.8209 25 24 24.8209 24 24.6V11.4Z"  fill-rule="evenodd"/>
      </svg>
    );
}
export default TableIcon;