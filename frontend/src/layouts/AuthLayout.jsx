import { Link } from "react-router-dom";
import logo from "../assets/images/Frame.png";
import Login from "../auth/Login.jsx";
function AuthLayout({children}) {
  return (
    <div className="backGround p-10">
      <div className="flex justify-evenly border-2 border-gray-400 rounded-lg h-6/6 bg-black/10 backdrop-blur-lg">
          <div className="w-[50%] space-y-5 place-items-center flex flex-col justify-center">
            <img src={logo} alt="Logo" className="w-92 h-92 m-4" />
            <button className="w-62 bg-[#561C24] text-white px-4 py-2 rounded-md hover:bg-[#561C40] transition-colors  cursor-pointer">Learn More </button>
          </div>
          <div className="w-[50%] p-6 bg-black/70 backdrop-blur-lg rounded-lg h-full flex flex-col justify-center ">
            {children}
          </div> 
      </div>
    
    </div>
  );
}//LOGIN AND REGISTER LAYOUT
export default AuthLayout;
