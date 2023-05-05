import React,{useState} from "react";
import "../.././index.css";
import "./navbarStyle.css";
const Navbar = () => {
  const [mode, setMode] = useState(() => {
    return "light";
  }); 
  const toggleMode = () => {

    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#1F2C35";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "#F0F0F0";
    }
  };
  
  return (
    <>
      <div className="nav-main">
        <div className="nav-cont">
          <div className="nav-item-1">Where in the world?</div>
          <div className="nav-item-2 " onClick={toggleMode}>
            <i className="fa fa-moon-o p-1" style={{ fontsize: "16px",fontWeight:"800" }}></i>
            <b>Light Mode</b>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
