// import logo from './logo.svg';
// import './App.css';
import HomePage from "./component/HomePage";
import { BrowserRouter,Route,Router,Routes } from "react-router-dom";
import ProfilePage from "./component/Pages/AboutUs";
import LoginSignUp from "./component/LoginSignUp";
import SignUp from "./component/LoginPages/SignUp";
import Login from "./component/LoginPages/Login";
import Search from "./component/Pages/SearchPage";

function App() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/Home" element={<HomePage></HomePage>}></Route>
                <Route path="/About" element={<ProfilePage></ProfilePage>}></Route>
                {/* <Route path="/Profile"></Route> */}
                <Route path="/" element={<Login></Login>}></Route>
                <Route path="/Signup" element={<SignUp></SignUp>}></Route>
                <Route path="/search" element={<Search></Search>}></Route>
            </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
