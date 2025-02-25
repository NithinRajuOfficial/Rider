import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserSignup from "./pages/UserSignup";
import UserLogin from "./pages/UserLogin";
import CaptainSignup from "./pages/CaptainSignup";
import CaptainLogin from "./pages/CaptainLogin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<UserSignup />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/captain-signup" element={<CaptainSignup />} />
      <Route path="/captain-login" element={<CaptainLogin />} />
    </Routes>
  );
}

export default App;
