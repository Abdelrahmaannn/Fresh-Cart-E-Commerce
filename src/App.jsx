import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import ErrorPage from "./Components/Error/Error";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Loading from "./Components/LoadingPage/LoadingPage";
import ForgetPassord from "./Components/Forget password/ForgetPassword";
import VerifyResetCode from "./Components/VerifyResetCode/VerifyResetCode";
import AuthinticationProvider from "./Context/Context";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Profile from "./Components/Profile/Profile";
import WishList from "./Components/WishList/WishList";
import { Toaster } from "react-hot-toast";
import CartContextProvideer from "./Context/CartContext";
import CashOnDelivery from './Components/CashOnDelivery/CashOnDelivery';

const myRouter = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            {" "}
            <Home />
          </ProtectedRoute>
        ),
      },

      {
        path: "home",
        element: (
          <ProtectedRoute>
            {" "}
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishList",
        element: (
          <ProtectedRoute>
            <WishList/>
          </ProtectedRoute>
        ),
      },
      {
        path: "Profile",
        element: (
          <ProtectedRoute>
            {" "}
            <Profile />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <ProtectedRoute> <ErrorPage /> </ProtectedRoute> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "/forgetpassword", element: <ForgetPassord /> },
      ,
      { path: "/verifyresetcode", element: <VerifyResetCode /> },

      { path: "productdetails/:id" , element: <ProtectedRoute > <ProductDetails/> </ProtectedRoute> },
      { path: "confirmpayment" , element: <ProtectedRoute > <CashOnDelivery/> </ProtectedRoute> },

    ],
  },
]);

function App() {

  //intilization the queryClientProvider to handle caching and handle async functions
  // to use it use [ useQuery Hook  ]
  const myClient = new QueryClient();

  return (
    <>
  
      <QueryClientProvider client={myClient}>   {/* this wraping for react query  */}
         <CartContextProvideer>
        <AuthinticationProvider>                 {/* this wraping for context to share data in all application  */}
          <RouterProvider router={myRouter} />   {/* this is the router provider  */}
        </AuthinticationProvider>
        </CartContextProvideer>
      </QueryClientProvider>

      <Toaster />

      {/* <Loading/> */}
    </>
  );
}

export default App;
