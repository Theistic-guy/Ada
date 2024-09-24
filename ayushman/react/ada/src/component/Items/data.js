import axios from "axios"
import { useState, useEffect } from "react"
import Card from "./card"

const Data=()=>{

    const [items,setItems]=useState([]);

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
            }
            catch(error){
                alert('Error')
            }
         }
         fetchItem()},[])

         return(
            <div>
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
            </div>
        )
}

    

export default Data