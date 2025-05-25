import ReactDom from "react-dom"
import { GridLoader } from "react-spinners"


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