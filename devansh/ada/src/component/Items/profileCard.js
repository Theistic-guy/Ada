import React from "react"

const ProfileCard=({name,jd,image})=>{
    return(
        <span className="profileCard">
            <div className="profile-card">
                <div className="image">
                    <img src={image} alt="" className="profile-img" />
                </div>
                <div className="text-data">
                    <span className="name">{name}</span>
                    <span className="job">{jd}</span>
                </div>
                <div className="media-buttons">
                    <a href="#" className="link">
                    <i className="bx bxl-facebook"></i>
                    </a>
                    <a href="#"  className="link">
                    <i className="bx bxl-twitter"></i>
                    </a>
                    <a href="#" className="link">
                    <i className="bx bxl-instagram"></i>
                    </a>
                    <a href="#" className="link">
                    <i className="bx bxl-linkedin"></i>
                    </a>
                </div>
                <div className="buttons">
                    <button className="button">About Person</button>
                </div>
                <div className="analytics">
                    <div className="data">
                    <i className="bx bx-heart"></i>
                    <span className="number">60k</span>
                    </div>
                    <div className="data">
                    <i className="bx bx-message-rounded"></i>
                    <span className="number">20k</span>
                    </div>
                    <div className="data">
                    <i className="bx bx-share"></i>
                    <span className="number">12k</span>
                    </div>
                </div>
            </div>
        </span>
    )
}

export default ProfileCard