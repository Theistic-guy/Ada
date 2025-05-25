import { Fragment } from "react"
import ReactDOM from "react-dom"
import Backdrop from "../Items/backdrop"

const Modal = ({ onClose, children }) => {
    return (
        <Fragment>
            <Backdrop onClick={onClose} />
            {
                ReactDOM.createPortal(
                    <Fragment>
                        <div className="modal">
                            <button type="close" onClick={onClose}>X</button>
                            <div className="content">{children}</div>
                        </div>
                    </Fragment>
                    ,
                    document.getElementById("modal-root")
                )
            }
        </Fragment>
    )
}

export default Modal