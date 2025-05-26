import axios from "axios"
import { useState, useEffect } from "react"
import Card from "./card"
import Loader from "../UI/loader"

const Rec=()=>{
    const [loader,setLoader]=useState(true);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        try {
            const res=await axios.post("http://localhost:8000/start_recommendation", { user_id:userId });

            const response=res.data;
            let n=0;

            const transferData=response.filter((eventData)=>{
                if(n<5){
                    n++;
                    return eventData;
                }
                else{
                    return;
                }
            })
            setRecommendations(transferData);
            setLoader(false);
        }catch(err){
            setLoader(true);
            console.error("Error fetching recommendations:", err);
        }
        finally{
            setLoader(false)
        }
        };
        fetchRecommendations();
    }, []);

         return(
            <>
                <>
                    <div className={"product-list"}>
                        <div className={"product-list--wrapper"}>
                            {
                                recommendations.map(item =>{
                                    return(
                                        <Card key={item.ASIN} data={item}></Card>
                                    )
                                })
                            }
                        </div>
                    </div>
                </>
            {loader && <Loader></Loader>}
            </>
        )
}

    

export default Rec