import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import Slider from "react-slick";

import catigoriesCss from "./CatigoriesSlider.module.css";
import axios from "axios";
import { useQuery } from "react-query";

export default function CatigoriesSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  async function getCatigories() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, isLoading } = useQuery("GetCatigories", getCatigories);

//   console.log(data);

  //   {data, isLoading}

  {
    /* <div>
<img className="w-100" src= {require("../../assets/finalProject assets/finalProject assets/1680391434638-cover (1).jpeg")} alt="" />

</div> */
  }

  return (
    <>
      <div className={"mt-5 "}>
        <h3 className={catigoriesCss.myh3}>Shop Popular Catigories</h3>

        <Slider {...settings}>
          {data?.data.data.map(function (catigory, idx) { 
            return (
              <div key={idx}>
                <img
            className={"w-100 " + catigoriesCss.myimg }
                  src={catigory.image}
                  alt=""
                />

                <h5>{catigory.name}</h5>




              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
}
