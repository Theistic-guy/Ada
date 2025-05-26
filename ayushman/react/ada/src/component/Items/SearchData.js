import axios from "axios"
import { useState, useEffect } from "react"
import Card from "./card"
import Loader from "../UI/loader"

const SearchData=({identity})=>{

    const [items,setItems]=useState([]);
    const [loader,setLoader]=useState(true);

    useEffect(()=>{
         async function fetchItem(){
            try{
                const dataItem= await axios.get("http://localhost:5000/products");
                const data=dataItem.data;
                const asinSet = new Set(identity);
                const transferData = data.filter(product => asinSet.has(product.ASIN));
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
         fetchItem()},[identity])

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

    

export default SearchData