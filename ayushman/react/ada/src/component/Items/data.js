import axios from "axios"
import { useState, useEffect } from "react"
import Card from "./card"
import Loader from "../UI/loader"

const Data=({catag})=>{

    const [items,setItems]=useState([]);
    const [loader,setLoader]=useState(true);

    useEffect(()=>{
         async function fetchItem(){
            try{
                const dataItem= await axios.get("http://localhost:5000/products");
                const data=dataItem.data
                let n=0;
                const transferData=data.filter((eventData)=>{
                    if(eventData.Tag===catag && n<5){
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

    

export default Data