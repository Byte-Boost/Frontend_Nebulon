const DashboardNumberCard = ({title, number, percentage}: {title: string, number: string, percentage: string}) => {
      return (
        <div className="grow flex flex-col p-1 border-t-2  border-[#D2D2D2]">
            <div className="grow place-content-center"><p style={{ color: '#7A7A7A', fontSize: '18px'}}>{title}</p></div>
            <div className="grow text-center place-content-center"><p style={{ color: '#41D2A7', fontSize: '35px', fontWeight: "bolder"}}>{number}</p></div>
            <div className="grow text-center place-content-center"><p style={{ color: '#7A7A7A', fontSize: '20px'}}>{percentage}</p></div>
        </div>
      );
    }
    export default DashboardNumberCard;