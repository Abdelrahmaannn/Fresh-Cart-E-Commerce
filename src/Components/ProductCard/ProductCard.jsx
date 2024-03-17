import { Link, useParams } from "react-router-dom";
import productCss from "./ProductCard.module.css";
import { useContext } from "react";
import { cart } from "../../Context/CartContext";
import toast from "react-hot-toast";

function ProductCard(props) {


  const product = props.products

  //  const {id}  = useParams()

  const {addToCart} = useContext(cart)

 async function addProductToCart(id)
  {

    try{

      const res = await addToCart(id)
      toast.success("Item Added To Your Cart");

    }

    catch{

      toast.error("Item Cannot Added To Your Cart");

    }

    
    // if (res.status == "success" )
    // {
    //   toast.success("Item Added To Your Cart");

    // }
  }


  return (
    <>
      <div className={"col-md-3 " + productCss.linkdecoration }  >
        <div className={productCss.mainCard}>
      <Link  className={ productCss.linkdecoration }   to={`/productdetails/${product._id}`}>

          <img className="w-100" src={ product.imageCover } alt="" />

        <i class={"fa-solid fa-star " + productCss.rating }> {product.ratingsAverage} </i>
        <p className={productCss.categoryType}>{product.category.name}</p>
        <p className={productCss.productName}>{product.title.split(" ").slice(0,3).join(" ")}</p>
        <p className={productCss.productPrice}  > ${product.price}</p>
        {/* priceAfterDiscount */}
        {product.priceAfterDiscount ?<p className={productCss.productPriceDiscount}  > {"$" + product.priceAfterDiscount }</p> : " "  }

        {/* <p>{product._id}</p> */}

      </Link>
      <div className="w-100">  <button onClick={()=> addProductToCart(product._id)}  className="btn btn-dark mb-3 ">Add To Cart</button> </div>
        </div>
      </div>




      
    </>
  );
}

export default ProductCard;
