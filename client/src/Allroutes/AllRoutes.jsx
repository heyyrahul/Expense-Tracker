import { Routes, Route } from "react-router-dom";
import SignInSide from "../component/Login";
import SignUp from "../component/SignUp";
import Dashboard from "../component/Dashboard";

function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignInSide />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<SignInSide />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default AllRoutes;
