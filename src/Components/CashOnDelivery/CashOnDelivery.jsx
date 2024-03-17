import CashOnDeliverCss from "./CashOnDelivery.module.css";
import { useContext , useState } from "react";
import { cart } from "./../../Context/CartContext";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function CashOnDelivery() {



  const [IsOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const { TotalCartPrice , CartId , DispalyCart } = useContext(cart);

  const navigation = useNavigate()

  const intialValues = {
    shippingAddress: {
      details: "",
      phone: "",
      city: "",
    },
  };

 async function MySubmit(values) {

    await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${CartId}` ,values , {headers : { token : localStorage.getItem("Token")}} )
    .then(function(res)
    {
        console.log(res)
        setIsOrderConfirmed(true);

        setTimeout(() => {
            
            setIsOrderConfirmed(false);
        }, 3000);

        setTimeout(() => {
            
            navigation("/home")
            
        }, 4000);

    } )
    .catch(function(err)
    {
        console.log(err);
    })
  }

  const MySchema = yup.object({
    shippingAddress: yup.object({
      details: yup.string().required("Location field is required"),
      phone: yup
        .string()
        .required("Phone number is required")
        .matches(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian mobile number"),
      city: yup.string().required("The city field is required"),
    }),
  });
  

  const MyFormik = useFormik({
    initialValues: intialValues,

    onSubmit: MySubmit,

    validationSchema: MySchema,
  });



  return (
    <>

{  IsOrderConfirmed ? <div className= {CashOnDeliverCss.confirmation} > <h3>  <i class="fa-solid fa-circle-check"></i>  Your Order Have Been Confirmed!! </h3></div>  : ""  }

      <div className={CashOnDeliverCss.main}>
        <h2 className={CashOnDeliverCss.h2 + " text-center "}>
          <i class="fa-regular fa-circle-check pe-2 "></i>Order Confirmation
        </h2>

        <h4 className={CashOnDeliverCss.h4 + " text-center "}>
          {"your order costs : " + "$" + TotalCartPrice}
        </h4>

        <div className={CashOnDeliverCss.forForm}>
          <form onSubmit={MyFormik.handleSubmit}>
            <label
              className={"pb-1 " + CashOnDeliverCss.label}
              htmlFor="details"
            >
            
              <i class="fa-solid fa-house pe-1 "></i> location Details {MyFormik.errors?.shippingAddress?.details && MyFormik.touched?.shippingAddress?.details ?  (<span className=" text-danger ps-2  " > *{MyFormik.errors.shippingAddress.details}* </span>) : "" }
            </label>
            <input
              id="details"
              type="text"
              name="shippingAddress.details"
              value={MyFormik.values.shippingAddress.details}
              onChange={MyFormik.handleChange}
              onBlur={MyFormik.handleBlur}
              className={" form-control mb-3  " + CashOnDeliverCss.myForm}
            />

            <label className={"pb-1 " + CashOnDeliverCss.label} htmlFor="phone">
              {" "}
              <i class="fa-solid fa-phone pe-1"></i> Phone Number {MyFormik.errors?.shippingAddress?.phone && MyFormik.touched?.shippingAddress?.phone ?  (<span className=" text-danger ps-2  " > *{MyFormik.errors.shippingAddress.phone}* </span>) : "" }
            </label>
            <input
              id="phone"
              type="tel"
              name="shippingAddress.phone"
              value={MyFormik.values.shippingAddress.phone}
              onChange={MyFormik.handleChange}
              onBlur={MyFormik.handleBlur}
              className={" form-control mb-3  " + CashOnDeliverCss.myForm}
            />

            <label className={"pb-1 " + CashOnDeliverCss.label} htmlFor="city">
              {" "}
              <i class="fa-solid fa-city pe-1"></i> City {MyFormik.errors?.shippingAddress?.city && MyFormik.touched?.shippingAddress?.city ?  (<span className=" text-danger ps-2  " > *{MyFormik.errors.shippingAddress.city}* </span>) : "" }
            </label>
            <input
              id="city"
              type="text"
              name="shippingAddress.city"
              value={MyFormik.values.shippingAddress.city}
              onChange={MyFormik.handleChange}
              onBlur={MyFormik.handleBlur}
              className={" form-control mb-3  " + CashOnDeliverCss.myForm}
            />

            <button type="submit" className="btn btn-dark ">
              Confirm Order <i class="fa-solid fa-check ps-1 "></i>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CashOnDelivery;
