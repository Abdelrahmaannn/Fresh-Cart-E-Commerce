import { Link, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./NavBar.module.css";
import { useContext } from "react";
import { authintication } from "../../Context/Context";
import { useCountdown } from "react-countdown-circle-timer";
import { cart } from './../../Context/CartContext';
import { useLocation } from 'react-router-dom';

function NavBar() {
  const { Token, setToken } = useContext(authintication);

  let {pathname} = useLocation();

  const navigate = useNavigate();

  const {CarCount} = useContext(cart)

  function logOut()
  {
    setToken(null)
    localStorage.removeItem("Token");  
    navigate('/login')  
  }

  return (



    
    <>
      <nav className="navbar navbar-expand-lg bg-body d-flex ">
        <div className="container mt-2 ">
          <a className={Navbar.mybrand} href="#">
            {" "}
            <i class="fa-solid fa-cart-shopping"></i> FreshCart
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {Token ? (
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className={" nav-link " + Navbar.myItem} to={"home"}>
                    {pathname == "/home" ? <span className={Navbar.ActiveLink}>Home</span> : "Home"}
                  </Link>
                </li>
                <li className="nav-item position-relative ">
                  <Link to={"cart"} className={" nav-link " + Navbar.myItem}>
                    
                  {pathname == "/cart" ? <span className={Navbar.ActiveLink}>Cart <span class="position-absolute top-0 start-75 translate-middle badge rounded-pill bg-danger">{CarCount? CarCount : ""  }</span>  </span> : <span> Cart <span class="position-absolute top-0 start-75 translate-middle badge rounded-pill bg-danger">{CarCount? CarCount : ""  }</span> </span> }

                    {/* <span class="position-absolute top-0 start-75 translate-middle badge rounded-pill bg-danger">{CarCount? CarCount : ""  }</span> */}

                    {/* /cart */}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={"wishList"}
                    className={" nav-link " + Navbar.myItem}
                  >
                  {pathname == "/wishList" ? <span className={Navbar.ActiveLink}>Wish List</span> : "Wish List"}

                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"Profile"} className={" nav-link " + Navbar.myItem}>
                  {pathname == "/Profile" ? <span className={Navbar.ActiveLink}>Profile</span> : "Profile"}
                  </Link>
                </li>
              </ul>
            ) : (
              <div className=" w-75 "></div>
            )}

            <ul className=" d-flex list-unstyled ">
              <li className=" pe-3 ">
                {" "}
                <i class="fa-brands fa-instagram"></i>
              </li>
              <li className=" pe-3 ">
                <i class="fa-brands fa-facebook-f"></i>
              </li>
              <li className=" pe-3 ">
                <i class="fa-brands fa-x-twitter"></i>
              </li>
              <li className=" pe-3 ">
                <i class="fa-brands fa-linkedin"></i>
              </li>

              {Token ? 
              <li className=" ps-3 ">
                {" "}
                <sapn role="button"  onClick = {function(){
                  logOut()
                }} className={" nav-link " + Navbar.myItem}>
                  {" "}
                  Logout{" "}
                </sapn>
              </li>: 
              
              <span className="d-flex "> <li className=" ps-4 ">
                <Link to={"register"} className={" nav-link " + Navbar.myItem}>
                  {" "}
                  Register{" "}
                </Link>
              </li>
              <li className=" ps-3 ">
                {" "}
                <Link to={"login"} className={" nav-link " + Navbar.myItem}>
                  {" "}
                  Login{" "}
                </Link>
              </li></span> }


            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
