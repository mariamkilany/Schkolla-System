import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, accessBy }) => {
  const login = localStorage.getItem("firstLogin");
  if (accessBy === "non-authenticated") {
    if (!login) {
      return children;
    }
  } else if (accessBy === "authenticated") {
    if (login) {
      return children;
    }
  }

  return <Navigate to="/"></Navigate>;
};
export default ProtectedRoute;
