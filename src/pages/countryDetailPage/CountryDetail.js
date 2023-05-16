import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "./countryDetailPageStyle.css";
import CustomButton from "../../components/customButton";

const CountryDetail = () => {
  return (
    <div className="main-cont">
      <Navbar />

      <div className="base">
        <CustomButton title={"Back"} />
        <div className="my-5"></div>
        <div className="row ">
          <div className="col-6">
            <img
              src="https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png"
              alt="america"
            />
          </div>
          <div className="col-6">
            <h1 className="countryName">Belgium</h1>
            <div className="row">
              <div className="col-6">
                <p>
                  <b>Native Name: </b> Balgie
                </p>
                <p>
                  <b>Population: </b> 1231214
                </p>
                <p>
                  <b>Region: </b> Europe
                </p>
                <p>
                  <b>Sub Region: </b> West Europe
                </p>
                <p>
                  <b>Capital: </b> Brussels
                </p>
              </div>
              <div className="col-6">
                <p>
                  <b>Top Level Domain: </b> Be
                </p>
                <p>
                  <b>Currencies: </b> Euro
                </p>
                <p>
                  <b>Languages: </b> Dutch,French,German
                </p>
              </div>
              <div className="row">
                <p>
                  <b>Border Countries: </b>

                  <button className="button-country">
                    <i aria-hidden="true" style={{ fontsize: "16px" }}></i>
                    France
                  </button>
                  <button className="button-country">
                    <i aria-hidden="true" style={{ fontsize: "16px" }}></i>
                    Germany
                  </button>
                  <button className="button-country">
                    <i aria-hidden="true" style={{ fontsize: "16px" }}></i>
                    Natherlan
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CountryDetail;
