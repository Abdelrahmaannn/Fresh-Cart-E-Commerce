import { jwtDecode } from "jwt-decode";
import profilecss from "./profile.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "../LoadingPage/LoadingPage";
// import { useLocation } from 'react-router-dom';

function Profile() {
  const user = jwtDecode(localStorage.getItem("Token"));

  function getUserData() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${user.id}`
    );
  }

  const { data, isLoading } = useQuery("getUserData", getUserData);

  // console.log(data);

  // let location = useLocation();

  // console.log(location.pathname);


  return (
    <>
      <div className="container mt-5 pb-5 ">
        <div
          className={
            profilecss.profileSection + " mt-5  d-flex align-items-center  "
          }
        >
          <img
            className={profilecss.img}
            src={require("../../assets/finalProject assets/finalProject assets/images/Wavy Buddies Avatar.png")}
            alt=""
          />
          <h2 className={profilecss.h2}> {"Name: " + user.name} </h2>
        </div>

        {/* ************************************************************************************************************** */}

        <h4 className={profilecss.h4}>Your recent purchases:</h4>

        <div className="row mt-5 gy-1 ">
          {isLoading
            ? (<Loading/>) : data?.data.length > 0 ? (data?.data.map(function (product, idx) {
                return  <div className={"col-md-4 "} key={idx} >
                   {/* maping on the whole card to display all orders */}
                    <div className={profilecss.purchasesCard} >
                    {/* creating a card for every order to map again on the array inside the main one */}
                        <div className="row">


                            {product.cartItems.map(function(order , index)
                            {
                                return <div  key={index} className="col-md-3 pb-3 ">

                                <div className={" p-3 " + profilecss.productCard }>

                                    <img className={"w-100 " + profilecss.productimg } src={order.product.imageCover} alt="" />

                                    <h5 className={profilecss.h5}>{ "No. of items: " + order.count }</h5>

                                    <h5 className={profilecss.h5} >{ "Order Price: " + "$" +order.price }</h5>

                                </div>

                            </div>
                            }
                            
                            
                            )}


                        </div>

                        {/* ********************************************** */}
  
                      <h5 className={profilecss.mainpayments}>{" Payment Method : " + product.paymentMethodType }</h5>
                      <h5  className={profilecss.mainpayments} >{ " Total Price :  " + "$" +product.totalOrderPrice}</h5>
                      <h5  className={profilecss.mainpayments}>{ " Delivery Status:  " + (product.isDelivered ? "Deliverd" : "Delivering.. ") }</h5>
                      <h5 className={profilecss.mainpayments}>{ "Created At:  " + new Date(product.createdAt).toLocaleDateString() }</h5>


  
                    </div>

                  </div>;
                }) ) : (           <div
                  className={"text-center position-relative mt-5  " + profilecss.maindiv}
                >
                  <h1 className={profilecss.main}>Your Cart Is Empty</h1>
                  <h3 className={profilecss.secondary}>Go explore some categories</h3>
        
                  <div className="text-center position-relative  mt-sm-5  ">
                    <img
                      className={"mt-3  " + profilecss.back}
                      src={require("../../assets/finalProject assets/finalProject assets/images/Shopaholics Wavy Spot.png")}
                      alt=""
                    />
                    <img
                      className={"position-absolute mt-3   " + profilecss.hero}
                      src={require("../../assets/finalProject assets/finalProject assets/images/Open Doodles Messy.png")}
                      alt=""
                    />
                  </div>
                </div>) }
        </div>
      </div>
    </>
  );
}

export default Profile;
