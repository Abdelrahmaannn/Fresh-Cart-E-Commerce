import loginCss from "./Login.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import React, { useContext, useState } from "react";
import { Bars } from "react-loader-spinner";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { authintication } from "../../Context/Context";

// function component starts here
function Login() {


  // intial values for formik object
  let intialObject = {
    email: "",
    password: "",
  };


  // to use the shared data from the context
  const {Token, setToken} = useContext(authintication)

  // the function onsubmit that call when i submit and sending APIs here
  async function onSubmit(values) {
    try {
      setIsloading(true);

      const res = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values);

      setToken(res.data.token);
      localStorage.setItem("Token", res.data.token )

      // const x = localStorage.getItem("Token")
      // console.log(Token);

      setisValidUser(true);

      setTimeout(function () {
        setisValidUser(false);
      }, 2000);

      setIsloading(false);

      navigation("/home")


    } catch {
      setIsloading(true);

      setisUserFound(true);

      setTimeout(function () {
        setisUserFound(false);
      }, 2000);

      setIsloading(false);
    }
  }

  // for validation
  const mySchema = yup.object({

    email: yup
      .string()
      .email("enter valid email format")
      .required("this filed is required"),

    password: yup
      .string()
      .required("this filed is required")
      .min(8, "password can't be less than 8 characters")
      .max(10, "password can't be more than 10 characters"),

  });

  // formik object
  const myFormik = useFormik({
    initialValues: intialObject,

    onSubmit: onSubmit,

    validationSchema: mySchema,
  });


  // for navigation
  const navigation = useNavigate()

  //if the user isn't exists and the registiration succes
  const [isValidUser, setisValidUser] = useState(false);

  // if the user is already exists
  const [isUserFound, setisUserFound] = useState(false);

  // loading till the response comes from the APIs
  const [Isloading, setIsloading] = useState(false);

  return <>
    <div className={loginCss.mybg}>
      <div className=" container ">
        <div className=" row ">
          {/* ****************************************************************************** */}

          <div className={"col-md-6  " + loginCss.solgan}>
            <h1 className={loginCss.myh1}>
              <i class="fa-solid fa-cart-shopping"></i> FreshCart
            </h1>

            <p className={loginCss.myp}>All You Need In One Click.....</p>
          </div>

          {/* ****************************************************************************** */}

          <div className="col-md-6">
            {/* <span className={RegisterCss.myspan}></span> */}

            <form onSubmit={myFormik.handleSubmit}>
              <div className=" d-flex  align-items-center  justify-content-center ">
                <div className={loginCss.myForm}>
                  <h3 className={loginCss.myh3}>WELCOME BACK</h3>
                  <h2 className={loginCss.myh2}>Log In to your Account</h2>

                  {isValidUser ? (
                    <div className=" alert  alert-success ">
                      <i class="fa-solid fa-circle-check"></i> Login
                      Success{" "}
                    </div>
                  ) : (
                    ""
                  )}

                  {isUserFound ? (
                    <div className=" alert  alert-danger ">
                      {" "}
                      <i class="fa-solid fa-circle-exclamation"></i> login Fail{" "}
                    </div>
                  ) : (
                    ""
                  )}

                  <label className=" mt-2 " htmlFor="email">
                    Email{" "}
                    {myFormik.errors.email && myFormik.touched.email ? (
                      <span className={" ps-1 " + loginCss.myspan}>
                        {" "}
                        *{myFormik.errors.email}*{" "}
                      </span>
                    ) : (
                      ""
                    )}
                  </label>
                  <input
                    className={" form-control  " + loginCss.myInput}
                    type="email"
                    id="email"
                    value={myFormik.values.email}
                    onChange={myFormik.handleChange}
                    onBlur={myFormik.handleBlur}
                  />

                  <label className=" mt-2 " htmlFor="password">
                    password{" "}
                    {myFormik.errors.password && myFormik.touched.password ? (
                      <span className={" ps-1 " + loginCss.myspan}>
                        {" "}
                        *{myFormik.errors.password}*{" "}
                      </span>
                    ) : (
                      ""
                    )}
                  </label>
                  <input
                    className={" form-control  " + loginCss.myInput}
                    type="password"
                    id="password"
                    value={myFormik.values.password}
                    onChange={myFormik.handleChange}
                    onBlur={myFormik.handleBlur}
                  />

                  <button type="submit"
                    className={
                      " btn d-flex  justify-content-center   " + loginCss.myBtn
                    }
                  >
                    {Isloading ? (
                      <Bars
                        height="30"
                        width="80"
                        color="#fff"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                      />
                    ) : (
                      "Login"
                    )}
                  </button>

                  <Link className="mt-2 text-decoration-none  " to={"/forgetpassword"}> Forget Password </Link>
                </div>
              </div>
            </form>
          </div>

          {/* ****************************************************************************** */}
        </div>
      </div>
    </div>
  </>;
}

export default Login;
