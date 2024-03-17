import { useParams } from "react-router-dom";
import productdetailscss from "./ProductDetails.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "../LoadingPage/LoadingPage";
import { useContext, useState } from "react";
import { authintication } from "../../Context/Context";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { cart } from "../../Context/CartContext";

function ProductDetails() {
  const { id } = useParams();

    //************************************************************************************************** */

  async function getSpecificProduct() {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }

  const { data, isLoading } = useQuery(
    "getSpecificProduct",
    getSpecificProduct
  );


    //************************************************************************************************** */

  console.log(data);

  const product = data?.data.data;

  const { Id, setId } = useContext(authintication);

  setId(id);

  const [isFavorited, setIsFavorited] = useState(false);

  //************************************************************************************************** */

  function addToWishList()
  {
    axios.post("https://ecommerce.routemisr.com/api/v1/wishlist" , {productId: id} , {headers: {token : localStorage.getItem("Token")}} )
    
    .then(function(res){ 

        if(res.statusText == "OK")
        {
            // const Fav = document.getElementById("Fav");
            // Fav.classList.add(productdetailscss.favRedColor)
            setIsFavorited(true);   
            toast.success('Added To Your Wish List')

        }
})

    .catch( function(err){ toast.error("Can't Add To Wish List")   } )
  }

  //************************************************************************************************** */

  useEffect(() => {
    

    return function()
    {

        setIsFavorited(false)

    }

  }, []);

  //************************************************************************************************** */



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



  //************************************************************************************************** */

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container pb-5 ">
          <div className="row d-flex mt-5 ">
            <div className="col-md-5 d-flex  justify-content-center ">
              <img className="w-75" src={product.imageCover} alt="" />
            </div>

            <div className="col-md-7 ">
              <div className="d-flex  justify-content-between align-items-center">
                <img
                  className={productdetailscss.brandImage}
                  src={product.brand.image}
                  alt="brand image"
                />

                <p className={productdetailscss.productquantity}>
                  {product.quantity + " Item Left"}
                </p>
              </div>

              <h3 className={"text-center mt-5 " + productdetailscss.myh3}>
                {product.category.name}
              </h3>

              <p className={productdetailscss.productDetails}>
                {product.title}
              </p>

              <div className="d-flex justify-content-between  align-items-center ">
                <h3 className={productdetailscss.price}>
                  {"$" + product.price}
                </h3>

                <i class={"fa-solid fa-star pe-5  " + productdetailscss.rating}>
                  {" "}
                  {product.ratingsAverage}
                </i>
              </div>

              {product.priceAfterDiscount ? (
                <p className={productdetailscss.productPriceDiscount}>
                  {" "}
                  {"$" + product.priceAfterDiscount}
                </p>
              ) : (
                " "
              )}

              {/* <h3 className={productdetailscss.price}>{'$' + product.priceAfterDiscount}</h3> */}

              <div className="d-flex mt-5 justify-content-between  ">
                <button  onClick={() => addProductToCart(id)} className="btn btn-dark w-75">Add To Cart</button>

                <button id="Fav" onClick={addToWishList} className={"btn  "  + isFavorited ? productdetailscss.favRedColor :  productdetailscss.fav}>
                <i class="fa-regular fa-heart"></i>
                </button>
              </div>

              {/* priceAfterDiscount */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
