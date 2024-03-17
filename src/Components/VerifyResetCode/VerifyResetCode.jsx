
import { useFormik } from "formik";
import VerifyResetCss from "./VerifyReset.module.css";
import * as yup from "yup";

import React, { useState } from "react";
import { Bars } from "react-loader-spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function VerifyResetCode() {

    const IntialValues = {
        resetCode: ""
    }

    // async function OnSubmit(values) {
       
       
    //     try {
    //       setIsloading(true);
    
    //       const res = await axios.post(
    //         "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
    //         values
    //       );
    
    //       setIsEmailFound(true);
    
    //       setTimeout(() => {
    //         setIsEmailFound(false);
    //       }, 2500);
    
    //       navigation("/home");

    //       setIsloading(false);
    //     } 
        
    //     catch{
    //       setIsloading(true);
    
    //       setIsEmailWrong(true);
    
    //       setTimeout(function () {
    //         setIsEmailWrong(false);
    //       }, 3000);
    
    //       setIsloading(false);

    //     }
    //   }



    async function OnSubmit(values) {
        try {
          setIsloading(true);
      
          const res = await axios.post(
            "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
            values
          );
      
          setIsEmailFound(true);
      
          setTimeout(() => {
            setIsEmailFound(false);
          }, 2500);

          setIsloading(false);

          navigation("/home");

        } 
        
        catch (error) {
          setIsloading(false);
      
          setIsEmailWrong(true);
      
          setTimeout(function () {
            setIsEmailWrong(false);
          }, 3000);
      
          console.error("Error during API call:", error); // Log the error for debugging
      
          // Handle other error-related logic here
        }
      }
      





    const ValidationSchema = yup.object({

        resetCode: yup.string().required("this is required"),
    })

    const myFormik = useFormik({
        initialValues: IntialValues,
        onSubmit:OnSubmit,
        validationSchema: ValidationSchema,

    })

    const navigation = useNavigate()


      // loading till the response comes from the APIs
        const [Isloading, setIsloading] = useState(false);

          // if the response is correct and the code sent to email for varification
        const [IsVerified, setIsEmailFound] = useState(false);

         // if the email is not found
           const [IsNotVerified, setIsEmailWrong] = useState(false);


    return ( 

        <>
        <form onSubmit={myFormik.handleSubmit}>
          <div className={VerifyResetCss.mybg}>
            <div className=" d-flex  align-items-center  justify-content-center ">
              <div className={VerifyResetCss.myForm}>
                <h2 className={VerifyResetCss.myh2 + " text-center"}>
                  {" "}
                  <i class="fa-regular fa-paper-plane"></i> Code Sent
                </h2>
                <h3 className={VerifyResetCss.myh3 + " ps-4"}>
                  Check Your Email :)
                </h3>
  
                {IsVerified ? (
                  <div className=" alert  alert-success ">
                    <i class="fa-solid fa-circle-check"></i> Varification Success
                  </div>
                ) : (
                  ""
                )}
  
                {IsNotVerified ? (
                  <div className=" alert  alert-danger ">
                    {" "}
                    <i class="fa-solid fa-circle-exclamation"></i> Reset code is invalid or has expired
                  </div>
                ) : (
                  ""
                )}
  
                <label className=" mt-2 " htmlFor="OTP">
                  OTP
                  {myFormik.errors.resetCode && myFormik.touched.resetCode ? (
                    <span className={" ps-1 " + VerifyResetCss.myspan}>
                      {" "}
                      *{myFormik.errors.resetCode}*{" "}
                    </span>
                  ) : (
                    ""
                  )}
                </label>
                <input
                  className={" form-control  " + VerifyResetCss.myInput}
                  type="number"
                  id="OTP"
                  name="resetCode"
                  value={myFormik.values.resetCode}
                  onChange={myFormik.handleChange}
                  onBlur={myFormik.handleBlur}
                />
  
                <button
                  type="submit"
                  className={
                    " btn d-flex  justify-content-center   " +
                    VerifyResetCss.myBtn
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
                    "Verify Account"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </>

     );
}

export default VerifyResetCode;