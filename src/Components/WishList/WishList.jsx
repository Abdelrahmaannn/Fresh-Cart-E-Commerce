import { useContext } from "react";
import ProductCard from "../ProductCard/ProductCard";

import wishlistcss from "./wishlist.module.css";
import { authintication } from "../../Context/Context";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "../LoadingPage/LoadingPage";
import toast from "react-hot-toast";
import { cart } from "../../Context/CartContext";
// import { useLocation } from 'react-router-dom';

function WishList() {


  const { Id, setId } = useContext(authintication);

  // console.log(Id);

  // let location = useLocation();

  // console.log(location.pathname);

//*********************************************************************************** */

  function getWishList()
  {
    return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist" , {headers:{token : localStorage.getItem("Token")}})
  }

  const { data , isLoading} = useQuery("getWishList" , getWishList);


console.log(data);

//*********************************************************************************** */

  function deleteFromWishList(Id)
  {
    axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${Id}`, {headers:{token: localStorage.getItem("Token")}})
    .then(
      function(res)
      {
        if(res.status == "success")
        {
          toast.success("Item removed From Wish List ")
          console.log(res);
        }
      }

    )
    .catch(
      function(err)
      {
        toast.error("Item cannot removed From Wish List ")
        console.log(err);
      }
    )
  }


//*********************************************************************************** */

  const {addToCart} = useContext(cart)

  async function addProductToCart(id)
   {
 
     try{
 
       const res = await addToCart(id)
       toast.success("Item Added To Your Cart");
 
     }
 
     catch{
 
       toast.error("Item Cannot Added To Your Cart");
 
     }}

//*********************************************************************************** */



  return (
    <>
      <div className=" container pb-5">
        <div className="row mt-5 pb-5 ">

          { isLoading ? (<Loading/>) : data?.data.data.length > 0 ? (data?.data.data.map(function( favProduct, idx ){

            return <div key={idx} className={"col-md-3 "}>
            <div className={wishlistcss.mainCard}>
              <img className="w-100" src={favProduct.imageCover} alt="" />
            
              <i class={"fa-solid fa-star " + wishlistcss.rating}> {favProduct.ratingsAverage} </i>

              <p className={wishlistcss.categoryType}> {favProduct.category.name} </p>
              <p className={wishlistcss.productName}> {favProduct.title.split(" ").slice(0, 3).join(" ")} </p>
              <p className={wishlistcss.productPrice}> { "$" + favProduct.price}</p>
            
              <button onClick={() => addProductToCart(favProduct._id)} className="btn btn-dark mb-3 ">Add To Cart</button><br />
              <button onClick={() => deleteFromWishList(favProduct._id)} className={wishlistcss.button }> <svg viewBox="0 0 448 512" className={wishlistcss.svgIcon}><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>  </button>
            </div>
            </div> 

          } )) : ( <div className={"text-center position-relative mt-5  " + wishlistcss.maindiv}>
          <h1 className={wishlistcss.main}>Your Wish List Is Empty</h1>
          <div className="text-center position-relative  mt-sm-5  ">
            <img
              className={"mt-3  " + wishlistcss.back}
              src={require("../../assets/finalProject assets/finalProject assets/images/Shopaholics Wavy Spot.png")}
              alt=""
            />
            <img
              className={"position-absolute mt-3   " + wishlistcss.hero}
              src={require("../../assets/finalProject assets/finalProject assets/images/Open Doodles Messy.png")}
              alt=""
            />
          </div>
        </div>)
          
          
          }

        </div>
      </div>
    </>
  );
}






  {/* priceAfterDiscount */}

  {/* {product.title.split(" ").slice(0, 3).join(" ")} */}

  {/* <p>{product._id}</p> */}

export default WishList;
