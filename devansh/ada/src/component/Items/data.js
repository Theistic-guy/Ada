import axios from "axios"
import { useState, useEffect } from "react"
import Card from "./card"
import Loader from "./loader"

const Data=()=>{

    const [items,setItems]=useState([]);
    const [loader,setLoader]=useState(true);

    useEffect(()=>{
         async function fetchItem(){
            try{
                const dataItem= await axios.get("https://ada038-default-rtdb.firebaseio.com/items.json")
                const data=dataItem.data
                const transferData=data.map((item,index)=>{
                    return{
                        ...item,
                        id:index+1
                    }
                })
                setItems(transferData)
                setLoader(false);
            }
            catch(error){
                alert('Error')
                setLoader('true');
            }
            finally{
                setLoader('false');
            }
         }
         fetchItem()},[])

         return(
            <div>
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
            </div>
        )
}

    

export default Data