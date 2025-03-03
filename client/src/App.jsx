import { Routes, Route } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import UserSignup from "./pages/UserSignup";
import UserLogin from "./pages/UserLogin";
import CaptainSignup from "./pages/CaptainSignup";
import CaptainLogin from "./pages/CaptainLogin";
import Home from "./pages/Home";
import UserProtectedRoute from "./components/UserProtectedRoute";
import CaptainProtectedRoute from "./components/CaptainProtectedRoute";
import CaptainHome from "./pages/CaptainHome";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route element={<UserProtectedRoute />}>
        <Route path="/home" element={<Home />} />
      </Route>
      <Route path="/signup" element={<UserSignup />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/captain-signup" element={<CaptainSignup />} />
      <Route path="/captain-login" element={<CaptainLogin />} />
      <Route element={<CaptainProtectedRoute />}>
        <Route path="/captain-home" element={<CaptainHome />} />
      </Route>
    </Routes>
  );
}

export default App;
