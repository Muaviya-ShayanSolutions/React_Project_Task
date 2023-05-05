import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'

const CustomButton = (props) => {
  
  const navigate = useNavigate();
  return (
    <>
      <button className="button-back" onClick={() => navigate("/")}>
      <FontAwesomeIcon icon={faArrowLeftLong}  />
        <span className="mx-2"></span>
        {props.title}
      </button>
    </>
  );
};
export default CustomButton;
