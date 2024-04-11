
const GraphCard = ({ title, children, width, height }: { title: string, children: React.ReactNode, width: number, height: number }) => {
    return(
    <>
        <div className="graph-card drop-shadow-md" style={{ width: width, height: height}}>

                <h2 className="graph-card--title m-2">{title}</h2>

                <div className="graph-card--content m-2 flex place-content-center">
                    {children}
                </div>
    
        </div>
    </>
    )
}
export default GraphCard;