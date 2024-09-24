// import logo from './logo.svg';
// import './App.css';
import Header from './component/Header';
import Data from './component/Items/data';
import Banner from './component/Items/banner';
import Ad from './component/Items/advert';
import SamsungAdv from './component/Items/samsungAdv';
import "aos/dist/aos.css";

function App() {
  return (
    <div>
        <Header></Header>
        <Ad></Ad>
        {/* <SamsungAdv></SamsungAdv> */}
        <Data></Data>
        <Banner></Banner>
    </div>
  );
}

export default App;
