import React from "react";
import { useNavigate } from "react-router-dom";

const CustomButton = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <button className="button-back" onClick={() => navigate("/")}>
        <i
          className="fa fa-arrow-left"
          aria-hidden="true"
          style={{ fontsize: "16px" }}
        ></i>
        <span className="mx-2"></span>
        {props.title}
      </button>
    </>
  );
};
export default CustomButton;
