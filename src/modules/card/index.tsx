
const Card = (props) => {
    return(
    <>
        <div className="card drop-shadow-md grid grid-cols-1">
                <div>
                    <p className="card--title">{props.title}</p>
                </div>

                <div className="">
                    {props.children}
                </div>
        </div>
    </>
    )
}
export default Card