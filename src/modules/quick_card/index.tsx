import Link from "next/link";

const QuickCard = ({children, link}: {children: React.ReactNode, link:string}) => {
    return (

        <Link href={link} className={ ' transition-all duration-200 ease-in-out hover:scale-105 my-12 mx-2 grid  w-72 h-[24rem] text-center cursor-pointer quick-card  active:scale-90'} >
                {children}
        </Link>

    )
}
export default QuickCard;