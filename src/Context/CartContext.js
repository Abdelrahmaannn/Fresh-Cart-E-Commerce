import axios from "axios";
import { createContext, useState } from "react";


export const cart = createContext();

function CartContextProvideer(props) {
   
 ///****************************************************************************************************************************** */  
   function addToCart(id)
   {
        axios.post(`https://ecommerce.routemisr.com/api/v1/cart` , { productId: id} , {headers:{token: localStorage.getItem("Token")}} )
        .then( function(res)
        {
                console.log(res);
        })  
        
        .catch(function(err)
        {
            console.log(err);
        })
   }

///******************************************************************************************************************************

async function displayCart() {
    try {
      const response = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token: localStorage.getItem("Token") }
      });
  
  
      return response; // Return the response to the caller
    } catch (error) {
      console.error(error);
      throw error; // Propagate the error
    }
  }

  ///******************************************************************************************************************************

 async function updateCart( productId , productCount)
  {

    try
    {
      const res =  await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {count: productCount} ,{
        headers: { token: localStorage.getItem("Token") }
      } )

      return res;
    }

    catch
    {

        console.log("error");

    }
  }
  
///******************************************************************************************************************************

  async function deleteProduct( productId )
  {

    try{
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {
        headers: { token: localStorage.getItem("Token") }
      } )
    }

    catch{
      console.log("error");
    }

    

  }

///******************************************************************************************************************************
 // to know how many items in the cart to display in many components
const [CarCount, setCarCount] = useState(0);

const [TotalCartPrice, setTotalCartPrice] = useState(0);
const [CartId, setCartId] = useState(null);

// const [DispalyCart, setDispalyCart] = useState(null);
   
   
   
    return <cart.Provider value={{addToCart , displayCart , updateCart , CarCount , setCarCount , deleteProduct , TotalCartPrice ,setTotalCartPrice , setCartId ,CartId }}>

            {props.children}

        </cart.Provider>;
}

export default CartContextProvideer;