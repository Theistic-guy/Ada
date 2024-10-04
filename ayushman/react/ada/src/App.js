// import logo from './logo.svg';
// import './App.css';
import HomePage from "./component/HomePage";
import { BrowserRouter,Route,Router,Routes } from "react-router-dom";
import ProfilePage from "./component/Pages/AboutUs";

function App() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage></HomePage>}></Route>
                <Route path="/About" element={<ProfilePage></ProfilePage>}></Route>
                <Route path="/Profile"></Route>
                <Route path="/Login"></Route>
                <Route path="/About"></Route>
            </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
