import { useContext, useEffect } from "react";
import CartCss from "./Cart.module.css";
import { cart } from "../../Context/CartContext";
import { useQuery } from "react-query";
import Loading from "./../LoadingPage/LoadingPage";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

function Cart() {
  const { displayCart, CarCount, setCarCount, updateCart, deleteProduct, setTotalCartPrice, setCartId,  } =
    useContext(cart);

    let location = useLocation();

    console.log(location.pathname);

  const navigation = useNavigate();

  // Fetch cart data
  const { data, isLoading } = useQuery("displayMyCart", displayCart);

  // console.log(data);
  useEffect(() => {
    // Update cart count from fetched data
    setCarCount(data?.data.numOfCartItems);
  }, [data, setCarCount]);


  async function updateCartCount(productId, count) {
    const response = await updateCart(productId, count);
  }

  async function DeleteProduct(productId) {
    try {
      await deleteProduct(productId);
      toast.success("Product deleted");
      displayCart(); // Fetch updated cart data
    } catch {
      toast.error("Product cannot be deleted");
    }
  }

  return (
    <>
      <div className="container mt-5 py-5">

        {isLoading ? (
          <Loading />
        ) : data?.data.data.products.length > 0 ? (

          // Render cart items if cart is not empty
          <>
            {
            data?.data.data.products.map(function (product, idx) {
              return (
                <div
                  key={idx}
                  className="row bg-body-secondary border rounded rounded-2 justify-content-between mt-5 py-5"
                >
                  <div className=" col-md-5 d-flex align-items-center ">
                    <img
                      className="w-25"
                      src={product.product.imageCover}
                      alt="no image"
                    />

                    <div className="ps-4">
                      <p>{product.product.title}</p>
                      <p>{"$ " + product.price}</p>
                      <button
                        onClick={() => DeleteProduct(product.product._id)}
                        className={CartCss.button}
                      >
                        <svg viewBox="0 0 448 512" className={CartCss.svgIcon}>
                          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                        </svg>{" "}
                      </button>
                    </div>
                  </div>

                  <div className="col-md-5 d-flex justify-content-center align-items-center  ">
                    <button
                      onClick={() =>
                        updateCartCount(product.product._id, product.count + 1)
                      }
                      className="btn btn-dark "
                    >
                      {" "}
                      +{" "}
                    </button>
                    <h5 className="px-4"> {product.count} </h5>
                    <button
                      onClick={() =>
                        updateCartCount(product.product._id, product.count - 1)
                      }
                      className="btn btn-dark "
                    >
                      {" "}
                      -{" "}
                    </button>
                  </div>

                  {setCartId(data?.data.data._id)}
                </div>
              );
            })}

            {/* Total Cart Price and Confirm Order section */}
            <div className={"d-flex justify-content-between mt-5 pb-4  " + CartCss.confirmationSection }>
              <div>
                <h2 className={CartCss.h2}>Total Cart Price</h2>
                <h4 className={CartCss.h4} >${data?.data.data.totalCartPrice}</h4>
                {setTotalCartPrice(data?.data.data.totalCartPrice)}
              </div>
              <button
                onClick={() => navigation("/confirmpayment")}
                className="btn btn-dark py-1 px-3"
              >
                Confirm Order <i className="fa-solid fa-arrow-right ps-2"></i>
              </button>
            </div>
          </>
        ) : (
          // Render empty cart message if cart is empty
          <div
          className={"text-center position-relative mt-5  " + CartCss.maindiv}
        >
          <h1 className={CartCss.main}>Your Cart Is Empty</h1>
          <h3 className={CartCss.secondary}>Go explore some categories</h3>

          <div className="text-center position-relative  mt-sm-5  ">
            <img
              className={"mt-3  " + CartCss.back}
              src={require("../../assets/finalProject assets/finalProject assets/images/Shopaholics Wavy Spot.png")}
              alt=""
            />
            <img
              className={"position-absolute mt-3   " + CartCss.hero}
              src={require("../../assets/finalProject assets/finalProject assets/images/Open Doodles Messy.png")}
              alt=""
            />
          </div>
        </div>
        )}
      </div>
    </>
  );
}

export default Cart;
