import LoaderAnim from "../loader";

const DashboardNumberCard = ({title, number, percentage, isLoading}: {title: string, number: string, percentage: string, isLoading:boolean}) => {
      return (
        <div className="grow flex flex-col p-1 border-t-2  border-[#D2D2D2]">
            <div className="grow place-content-center"><p style={{ color: '#7A7A7A', fontSize: '2vh'}}>{title}</p></div>
            {isLoading? 
            <div className='  grid place-content-center '><LoaderAnim className="size-20 stroke-[#41D2A7] fill-[#41D2A7]"/> </div>:  
            <div className="grow text-center place-content-center"><p style={{ color: '#41D2A7', fontSize: '5vh', fontWeight: "bolder"}}>{number}</p></div>
            }
            <div className="grow text-center place-content-center"><p style={{ color: '#7A7A7A', fontSize: '2vh'}}>{percentage}</p></div>
        </div>
      );
    }
    export default DashboardNumberCard;