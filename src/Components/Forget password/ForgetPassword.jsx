import { useFormik } from "formik";
import ForgetPassordCss from "./ForgetPassword.module.css";
import * as yup from "yup";

import React, { useState } from "react";
import { Bars } from "react-loader-spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgetPassord() {
  const mySchema = yup.object({
    email: yup
      .string()
      .required("this is required to get your password")
      .email("Enter Valid Email Format"),
  });

  const IntialValues = {
    email: "",
  };

  async function onSubmit(values) {
    try {
      setIsloading(true);

      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );

      setIsEmailFound(true);

      setTimeout(() => {
        setIsEmailFound(false);
      }, 2500);

      setIsloading(false);

      navigation("/verifyresetcode")

    } 
    
    catch {
      setIsloading(true);

      setIsEmailWrong(true);

      setTimeout(function () {
        setIsEmailWrong(false);
      }, 2000);

      setIsloading(false);
    }
  }

  const navigation = useNavigate()

  const myFormik = useFormik({
    initialValues: IntialValues,

    onSubmit: onSubmit,

    validationSchema: mySchema,
  });

  // loading till the response comes from the APIs
  const [Isloading, setIsloading] = useState(false);

  // if the response is correct and the code sent to email for varification
  const [IsEmailFound, setIsEmailFound] = useState(false);

  // if the email is not found
  const [IsEmailWrong, setIsEmailWrong] = useState(false);

  return (
    <>
      <form onSubmit={myFormik.handleSubmit}>
        <div className={ForgetPassordCss.mybg}>
          <div className=" d-flex  align-items-center  justify-content-center ">
            <div className={ForgetPassordCss.myForm}>
              <h2 className={ForgetPassordCss.myh2 + " text-center"}>
                {" "}
                <i class="fa-solid fa-key"></i> Account Recovery
              </h2>
              <h3 className={ForgetPassordCss.myh3 + " ps-4"}>
                Check Your Email
              </h3>

              {IsEmailFound ? (
                <div className=" alert  alert-success ">
                  <i class="fa-solid fa-circle-check"></i> Email sent check your
                  inbox
                </div>
              ) : (
                ""
              )}

              {IsEmailWrong ? (
                <div className=" alert  alert-danger ">
                  {" "}
                  <i class="fa-solid fa-circle-exclamation"></i> Email not found{" "}
                </div>
              ) : (
                ""
              )}

              <label className=" mt-2 " htmlFor="email">
                Email{" "}
                {myFormik.errors.email && myFormik.touched.email ? (
                  <span className={" ps-1 " + ForgetPassordCss.myspan}>
                    {" "}
                    *{myFormik.errors.email}*{" "}
                  </span>
                ) : (
                  ""
                )}
              </label>
              <input
                className={" form-control  " + ForgetPassordCss.myInput}
                type="email"
                id="email"
                value={myFormik.values.email}
                onChange={myFormik.handleChange}
                onBlur={myFormik.handleBlur}
              />

              <button
                type="submit"
                className={
                  " btn d-flex  justify-content-center   " +
                  ForgetPassordCss.myBtn
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
                  "Send Email"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default ForgetPassord;
