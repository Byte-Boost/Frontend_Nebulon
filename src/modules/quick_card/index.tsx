
const QuickCard = ({children}: {children: React.ReactNode}) => {
    return (
        <div className={ ' transition-all duration-200 ease-in-out hover:scale-105 m-20 grid  w-72 h-[24rem] text-center cursor-pointer quick-card '} >
                {children}
        </div>
    )
}
export default QuickCard;