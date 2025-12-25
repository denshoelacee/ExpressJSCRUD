import { Link } from "react-router-dom";
import "./Home.css";
import logo from "../assets/images/Frame.png";
import Login from "../auth/Login.jsx";
import AuthLayout from "../layouts/AuthLayout.jsx";
function Home() {
  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );
}

export default Home;
