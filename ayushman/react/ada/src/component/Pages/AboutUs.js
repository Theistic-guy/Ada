import Header from "../Header"
import ProfileCard from "../Items/profileCard"

const ProfilePage=()=>{
    return(
        <>
            <Header></Header>
            <div>
                <ProfileCard name={"Ayushmaan Agnihotri"} jd={"Full Stack Developer"} image={"ProfilePic.png"}></ProfileCard>
                <ProfileCard name={"Aryaman Verma"} jd={"ML Developer"}></ProfileCard>
            </div>
        </>
    )
}

export default ProfilePage