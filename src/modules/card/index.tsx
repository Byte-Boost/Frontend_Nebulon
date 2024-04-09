
const Card = ({ title, children, width, height }) => {
    return(
    <>
        <div className="card drop-shadow-md" style={{ width: width, height: height}}>

                <h2 className="card--title m-2">{title}</h2>

                <div className="card--content m-2 flex place-content-center">
                    {children}
                </div>
    
        </div>
    </>
    )
}
export default Card