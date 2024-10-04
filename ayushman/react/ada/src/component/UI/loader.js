import ReactDom from "react-dom"
// import { Spinner } from "react-bootstrap"
// import "bootstrap/dist/css/bootstrap.min.css"
import { GridLoader } from "react-spinners"

// export const Backdrop = props => {
//     const handleClick = () => {
//         if(props.onClose) {
//             props.onClose();
//         }
//     }

//     return (
//         <div onClick={handleClick} className="loader-overlay"></div>
//     )
// }


const Loader = () => {
    return (
        ReactDom.createPortal(
            <>
            {/* <Backdrop/> */}
            <div className="loading-dots">
                <GridLoader></GridLoader>
            </div>
            </>,
            document.getElementById("loader-root")
        )
    )
}

export default Loader