import Header from "../Header"
import ProfileCard from "./profileCard"

const ProfilePage=()=>{
    return(
        <>
            <Header></Header>
            <div>
                <ProfileCard name={"Ayushmaan Agnihotri"} jd= {"Full Stack Developer"} image={"ProfilePic.png"}></ProfileCard>
                <ProfileCard name={"Aryaman Verma"} jd= {"ML Developer"}></ProfileCard>
                <ProfileCard name={"Devansh Bajaj"} jd= {"Front End Developer"}></ProfileCard>
            </div>
        </>
    )
}

export default ProfilePage