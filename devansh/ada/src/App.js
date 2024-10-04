// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './component/Header';
import Data from './component/Items/data';
import Banner from './component/Items/banner';
import Ad from './component/Items/advert';
import Login from './component/Items/Login';
import Signup from './component/Items/Signup';
import "aos/dist/aos.css";
import './index.css'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={
            <>
              <Header />
              <Ad/>
              <Data />
              <Banner />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
