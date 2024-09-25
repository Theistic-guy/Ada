import ReactDom from "react-dom"
// import { Spinner } from "react-bootstrap"
// import "bootstrap/dist/css/bootstrap.min.css"
import { GridLoader } from "react-spinners"

const Loader = () => {
    return (
        ReactDom.createPortal(
            <>
            <div className="loading-dots">
                <GridLoader></GridLoader>
            </div>
            </>,
            document.getElementById("loader-root")
        )
    )
}

export default Loader