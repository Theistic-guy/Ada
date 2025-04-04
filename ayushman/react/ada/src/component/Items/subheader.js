const Subheader = ({ text }) => {
    return (
        <div className="subheader-container">
            <div className="subheader-logo">
                <img src="infoLogo.png" alt="Logo" />
            </div>
            <h2 className="subheader-text">{text}</h2>
        </div>
    );
};

export default Subheader;