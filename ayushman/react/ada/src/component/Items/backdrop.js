import React from "react";
import ReactDOM from "react-dom";


const Backdrop = ({ onClick }) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={onClick}></div>,
    document.getElementById("loader-root")
  );
};

export default Backdrop;
