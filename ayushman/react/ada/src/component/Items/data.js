import axios from "axios"
import { useState, useEffect } from "react"
import Card from "./card"
import Loader from "../UI/loader"

const Data=()=>{

    const [items,setItems]=useState([]);
    const [loader,setLoader]=useState(true);

    useEffect(()=>{
         async function fetchItem(){
            try{
                const dataItem= await axios.get("https://major-project-ada-1-default-rtdb.firebaseio.com/items.json")
                const data=dataItem.data
                const transferData=data.map((item,index)=>{
                    return{
                        ...item,
                        id:index+1
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
            {loader && <Loader></Loader>}
            </>
        )
}

    

export default Data