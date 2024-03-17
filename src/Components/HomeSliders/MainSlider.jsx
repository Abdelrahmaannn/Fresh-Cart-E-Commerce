import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import mainSlidercss from "./MainSlider.module.css";

// MainSlider

import React from "react";
import Slider from "react-slick";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <div className=" d-flex justify-content-center ">
        <img
          className={mainSlidercss.coustomWidth + mainSlidercss.coustomHeight}
          src={require("../../assets/finalProject assets/finalProject assets/images/Paste2 image.png")}
          alt=""
        />
      </div>

      <div className=" d-flex justify-content-center position-relative  ">
        <img
          className={mainSlidercss.coustomWidth + mainSlidercss.coustomHeight}
          src={require("../../assets/finalProject assets/finalProject assets/images/slider-image-1 1.png")}
          alt=""
        />
      </div>

      <div  className=" d-flex justify-content-center ">
      <img
          className={mainSlidercss.coustomWidth + mainSlidercss.coustomHeight}
          src={require("../../assets/finalProject assets/finalProject assets/images/slider-image-3 1.png")}
          alt=""
        />
      </div>

    </Slider>
  );
}
