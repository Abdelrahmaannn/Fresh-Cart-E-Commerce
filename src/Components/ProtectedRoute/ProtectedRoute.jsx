import { Navigate } from "react-router-dom";





function ProtectedRoute({ children }) {
  if (localStorage.getItem("Token") == null) {
    return <Navigate to={"/login"} />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
