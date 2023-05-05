import React from "react";
import "./searchStyle.css";

const SearchBarComp = () => {
  return (
    <>
      <div className="main">
        <div className="form-group has-search">
          <span className="fa fa-search form-control-feedback"></span>
          <input type="text" className="form-control" placeholder="Search" />
        </div>
      </div>
    </>
  );
};
export default SearchBarComp;
