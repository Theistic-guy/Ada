import axios from "axios";
import Header from "../Header";
import SearchData from "../Items/SearchData";
import { useEffect,useState } from "react";
import { useLocation } from "react-router-dom";
import Subheader from "../Items/subheader";

const Search=()=>{
    const location = useLocation();
    const [searchResults, setSearchResults] = useState([]);
    const [quote,getQuote]=useState("");
    // const [length,setLength]=useState(0);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get("query");

        if (query) {
            fetchSearchResults(query);
        }
    }, [location.search]);

    const fetchSearchResults = async (query) => {
        try {
            const response = await axios.post("http://localhost:8000/search", { query });
            setSearchResults(response.data.asins);
            getQuote(response.data.explanation);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    return(
        <>
            <Header></Header>
            <Subheader text={quote}></Subheader>
            <SearchData identity={searchResults}></SearchData>
        </>
    );
}

export default Search