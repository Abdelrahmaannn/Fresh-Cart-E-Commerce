import axios from "axios";
import CatigoriesSlider from "../HomeSliders/CatigoriesSlider";
import MainSlider from "../HomeSliders/MainSlider";

import SimpleSlider from "../HomeSliders/MainSlider";
import ProductCard from "../ProductCard/ProductCard";

import homecss from "./home.module.css"
import { useQuery } from "react-query";
import Loading from './../LoadingPage/LoadingPage';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';



function Home( ) {

  let location = useLocation();

  console.log(location.pathname);


  async function getAllProducts()
  {

    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");

  }

  const { data , isLoading} = useQuery("AllProducts" , getAllProducts );

  // console.log(data?.data.data);






    return (

        <>

        
        <div className=" container mt-2 " >

        <SimpleSlider/>

        <CatigoriesSlider/>

        </div>

        <div className={"container pb-5  " + homecss.main}>

          <div className="row mt-5 pt-5 gy-1 ">


            <h2 className={homecss.myh2}>Shop All Products</h2>


            {isLoading ? <Loading/> :  data?.data.data.map(function( product , idx ){return <ProductCard key={idx} products={product} />

}) }


{/* <Link></Link> */}





          </div>

        </div>

        
        </>
      );
}

export default Home;