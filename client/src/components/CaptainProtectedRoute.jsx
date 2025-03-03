import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const CaptainProtectedRoute = () => {
  const { token, user } = useSelector((state) => state?.authCaptain);

  // Check if token or user data is missing
  if (!token || !user) {
    return <Navigate to="/captain-login" replace />;
  }

  try {
    // Decode the token
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    // Check if the token is expired
    if (decodedToken.exp < currentTime) {
      return <Navigate to="/captain-login" replace />;
    }

    // Verify that the token belongs to the logged-in user
    if (decodedToken._id !== user._id) {
      return <Navigate to="/captain-home" replace />;
    }

    // Token is valid and belongs to the logged-in user, allow access
    return <Outlet />;
  } catch (error) {
    // Token is invalid
    if (import.meta.env.MODE === "development") {
      console.error("Login Error: ", error);
    }
    return <Navigate to="/captain-login" replace />;
  }
};

export default CaptainProtectedRoute;
