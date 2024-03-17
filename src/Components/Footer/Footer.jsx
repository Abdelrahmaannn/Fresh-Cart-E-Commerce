
import MyFooter from "./Footer.module.css"

function Footer() {
   
   
    return ( 
        <>

        <footer>

            <div className=" container ">

                <div className= {"row d-flex  align-items-center  justify-content-around   " + MyFooter.footerdiv }>

                    <div className="col-md-4 pb-3 ">
                        <span className={MyFooter.brandLogo}><i class="fa-solid fa-cart-shopping"></i> FreshCart</span>
                        <span className= {MyFooter.brandSolgan}>Gift & Decoration Store</span>
                    </div>

                    <div className="col-md-7 pb-3 ">
                    <ul className=" d-flex  list-unstyled  justify-content-end  ">

                        <li className = {MyFooter.myLinks + "  pe-3"} > <a >Unique</a></li>
                        <li className={MyFooter.myLinks + "  pe-3"}>  <a >Laxurious</a></li>
                        <li className={MyFooter.myLinks + "  pe-3"}><a >Premium</a></li>
                        <li className= {MyFooter.myLinks + "  pe-3"}><a >High Quality</a></li>


                    </ul>
                    </div>
                </div>

                <h6 className= {" text-center " + MyFooter.foot }>Copyright © 2023 3legant. All rights reserved</h6>

            </div>


        </footer>
        
        

        
        
        </>
     );
}

export default Footer;