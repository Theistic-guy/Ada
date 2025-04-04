import { Link } from "react-router-dom";

const DropdownItem=(img,text,link)=>{
    return(
        <li className = 'dropdownItem'>
            <img src={img}></img>
                    <a> {text} </a>
        </li>
    );
}

export default DropdownItem