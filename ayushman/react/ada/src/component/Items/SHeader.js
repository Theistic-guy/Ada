const SHeader = ({ text }) => {
    return (
        <div className="subheader-container">
            <div className="subheader-logo">
                <img src="infoLogo.png" alt="Logo" />
            </div>
            <h2 className="subheader-text">Hello {text.FullName}!! We are here to provide you best user experiece with personalised recomendation system<br></br></h2>
        </div>
    );
};

export default SHeader;