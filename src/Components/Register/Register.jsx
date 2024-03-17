import { useFormik } from "formik";
import RegisterCss from "./Register.module.css";
import * as yup from "yup";
import React, { useState } from "react";
import { Bars } from "react-loader-spinner";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function Register() {
  // intial values for formik object
  let intialObject = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  // the function that call when i submit and sending APIs here
 async function onSubmit(values) {

    try{

        setIsloading(true);

        const res = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup" , values );

        setisValidUser(true);

        setTimeout( function() { 
            setisValidUser(false)
        } , 2000 );

        setIsloading(false);

        navigation("/login")

    }

    catch{

        setIsloading(true);


        setisUserFound(true);

        setTimeout( function() { 
            setisUserFound(false)
        } , 2000 );


        setIsloading(false);

    }




  }

  // for validation
  const mySchema = yup.object({
    name: yup
      .string()
      .required("this filed is required")
      .min(3, " name can't be less than 3 characters ")
      .max(14, "name can't be more than 14 characters"),

    email: yup
      .string()
      .email("enter valid email format")
      .required("this filed is required"),

    password: yup
      .string()
      .required("this filed is required")
      .min(8, "password can't be less than 8 characters")
      .max(10, "password can't be more than 10 characters"),

    rePassword: yup
      .string()
      .required("this filed is required")
      .min(8, "password can't be less than 8 characters")
      .max(10, "password can't be more than 10 characters")
      .oneOf([yup.ref("password")], "the repassword must matches the password"),

    phone: yup
      .string()
      .required("this filed is required")
      .matches(/^01[0125][0-9]{8}$/ , "enter valid egyption mobile number"),
  });

  // formik object
  const myFormik = useFormik({
    initialValues: intialObject,

    onSubmit: onSubmit,

    validationSchema: mySchema,
  });

  //if the user isn't exists and the registiration succes
  const [isValidUser, setisValidUser] = useState(false); 

  // if the user is already exists 
  const [isUserFound, setisUserFound] = useState(false);

  // loading till the response comes from the APIs
  const [Isloading, setIsloading] = useState(false);

  const navigation = useNavigate();

  return (
    <>
      <div className={RegisterCss.mybg}>
        <div className=" container ">
          <div className=" row ">
            {/* ****************************************************************************** */}

            <div className={"col-md-6  " + RegisterCss.solgan}>
              <h1 className={RegisterCss.myh1}>
                <i class="fa-solid fa-cart-shopping"></i> FreshCart
              </h1>

              <p className={RegisterCss.myp}>All You Need In One Click.....</p>
            </div>

            {/* ****************************************************************************** */}

            <div className="col-md-6">
              {/* <span className={RegisterCss.myspan}></span> */}

              <form onSubmit={myFormik.handleSubmit}>
                <div className=" d-flex  align-items-center  justify-content-center ">
                  <div className={RegisterCss.myForm}>
                    <h3 className={RegisterCss.myh3}>LET'S GET YOU STARTED</h3>
                    <h2 className={RegisterCss.myh2}>Create an Account</h2>

                    {isValidUser ? <div className=" alert  alert-success "><i class="fa-solid fa-circle-check"></i> Registiration Success </div>
                    : ""  }

                    {isUserFound ? <div className=" alert  alert-danger "> <i class="fa-solid fa-circle-exclamation"></i> User Already Exists </div>
                    : ""  }

                    <label className=" mt-2 " htmlFor="name">
                      Name{" "}
                      {myFormik.errors.name && myFormik.touched.name ? (
                        <span className={" ps-1 " + RegisterCss.myspan}>
                          {" "}
                          *{myFormik.errors.name}*{" "}
                        </span>
                      ) : (
                        ""
                      )}
                    </label>
                    <input
                      className={" form-control  " + RegisterCss.myInput}
                      type="text"
                      id="name"
                      value={myFormik.values.name}
                      onChange={myFormik.handleChange}
                      onBlur={myFormik.handleBlur}
                    />

                    <label className=" mt-2 " htmlFor="email">
                      Email{" "}
                      {myFormik.errors.email && myFormik.touched.email ? (
                        <span className={" ps-1 " + RegisterCss.myspan}>
                          {" "}
                          *{myFormik.errors.email}*{" "}
                        </span>
                      ) : (
                        ""
                      )}
                    </label>
                    <input
                      className={" form-control  " + RegisterCss.myInput}
                      type="email"
                      id="email"
                      value={myFormik.values.email}
                      onChange={myFormik.handleChange}
                      onBlur={myFormik.handleBlur}
                    />

                    <label className=" mt-2 " htmlFor="password">
                      password{" "}
                      {myFormik.errors.password && myFormik.touched.password ? (
                        <span className={" ps-1 " + RegisterCss.myspan}>
                          {" "}
                          *{myFormik.errors.password}*{" "}
                        </span>
                      ) : (
                        ""
                      )}
                    </label>
                    <input
                      className={" form-control  " + RegisterCss.myInput}
                      type="password"
                      id="password"
                      value={myFormik.values.password}
                      onChange={myFormik.handleChange}
                      onBlur={myFormik.handleBlur}
                    />

                    <label className=" mt-2 " htmlFor="repassword">
                      Repassword{" "}
                      {myFormik.errors.rePassword &&
                      myFormik.touched.rePassword ? (
                        <span className={" ps-1 " + RegisterCss.myspan}>
                          {" "}
                          *{myFormik.errors.rePassword}*{" "}
                        </span>
                      ) : (
                        ""
                      )}
                    </label>
                    <input
                      className={" form-control  " + RegisterCss.myInput}
                      type="password"
                      id="rePassword"
                      value={myFormik.values.rePassword}
                      onChange={myFormik.handleChange}
                      onBlur={myFormik.handleBlur}
                    />

                    <label className=" mt-2 " htmlFor="phone">
                      Phone{" "}
                      {myFormik.errors.phone && myFormik.touched.phone ? (
                        <span className={" ps-1 " + RegisterCss.myspan}>
                          {" "}
                          *{myFormik.errors.phone}*{" "}
                        </span>
                      ) : (
                        ""
                      )}
                    </label>
                    <input
                      className={" form-control  " + RegisterCss.myInput}
                      type="phone"
                      id="phone"
                      value={myFormik.values.phone}
                      onChange={myFormik.handleChange}
                      onBlur={myFormik.handleBlur}
                    />

                    <button type="submit" className={" btn d-flex  justify-content-center   " + RegisterCss.myBtn}>
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
                        "CONTINUE"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* ****************************************************************************** */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
