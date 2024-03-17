import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { Offline } from "react-detect-offline";

import layoutcss from "./layout.module.css"

function Layout () {
   
   
   
   
   
   return <>
    
    <NavBar/>

    <Offline >
    <div className={layoutcss.Offline}><i class="fa-solid fa-wifi pe-1 "></i> Your Are Offline Please Check Your Internet Connection</div>
    </Offline>

    <Outlet/>

    <Footer/>


    
    
    
    
    </>;
}

export default Layout ;