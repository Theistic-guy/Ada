import axios from "axios";
import Header from "../Header";
import SearchData from "../Items/SearchData";
import { useEffect,useState } from "react";
import { useLocation } from "react-router-dom";

const Search=()=>{
    const location = useLocation();
    const [searchResults, setSearchResults] = useState([]);
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
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    return(
        <>
            <Header></Header>
            <SearchData identity={searchResults}></SearchData>
        </>
    );
}

export default Search