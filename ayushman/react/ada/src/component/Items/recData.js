import axios from "axios"
import { useState, useEffect } from "react"
import Card from "./card"
import Loader from "../UI/loader"

const Rec=()=>{

    const [items,setItems]=useState([]);
    const [loader,setLoader]=useState(true);

    useEffect(()=>{
         async function fetchItem(){
            try{
                const dataItem= await axios.get("http://localhost:8000/recData");
                const data=dataItem.data;
                let n=0;
                const transferData=data.filter((eventData)=>{
                    if(n<5){
                        n++;
                        return eventData;
                    }
                    else{
                        return;
                    }
                })
                setItems(transferData)
                setLoader(false)
            }
            catch(error){
                setLoader(true)
                alert('Error')
            }
            finally{
                setLoader(false)
            }
         }
         fetchItem()},[])

         return(
            <>
                <>
                    <div className={"product-list"}>
                        <div className={"product-list--wrapper"}>
                            {
                                items.map(item =>{
                                    return(
                                        <Card key={item.id} data={item}></Card>
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