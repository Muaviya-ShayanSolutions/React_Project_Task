/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./countryDetailPageStyle.css";
import CustomButton from "../../components/customButton";
import { useLocation } from "react-router-dom";
import * as CONSTANT from "../../utils/constants.js";
const CountryDetail = () => {
  const location = useLocation();
  const countryName = location.state.countryName;
  useEffect(() => {
    fetchCountryDetail();
  }, []);
  const [countryDetail, setCountryDetail] = useState([]);
  const fetchCountryDetail = () => {
    console.log(countryName);
    fetch(
      `${CONSTANT.getCountryDetail}${countryName}?fields=name,population,region,capital,flags,subregion,tld,currencies,languages,borders`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCountryDetail(data);
      });
  };
  const countryData = countryDetail.map((data) => {
    return (
      <div className="main-cont">
        <Navbar />
        <div className="base">
          <CustomButton title={"Back"} />
          <div className="my-5"></div>
          <div className="row ">
            <div className="col-6">
              <img src={data?.flags.png} alt={data?.name.official} />
            </div>
            <div className="col-6">
              <h1 className="countryName">{data?.name.official}</h1>
              <div className="row">
                <div className="col-6">
                  <p>
                    <b>Native Name: </b>{" "}
                    {data &&
                      Object.entries(data?.name.nativeName).map(
                        ([key, val], index) => {
                          const name = `${val.common}`;

                          const Nativename = index === 0 ? name : `, ${name}`;
                          return Nativename;
                        }
                      )}
                  </p>
                  <p>
                    <b>Population: </b> {data?.population}
                  </p>
                  <p>
                    <b>Region: </b> {data?.region.toString()}
                  </p>
                  <p>
                    <b>Sub Region: </b> {data?.subregion.toString()}
                  </p>
                  <p>
                    <b>Capital: </b> {data?.capital.toString()}
                  </p>
                </div>
                <div className="col-6">
                  <p>
                    <b>Top Level Domain: </b> {data?.tld.toString()}
                  </p>
                  <p>
                    <b>Currencies: </b>
                    {data &&
                      Object.keys(data?.currencies).map((currency) => {
                        return `${currency} `;
                      })}
                  </p>
                  <p>
                    <b>Languages: </b>
                    {data &&
                      Object.values(data?.languages).map((lang) => {
                        return `${lang} `;
                      })}
                  </p>
                </div>
                <div className="row">
                  <p>
                    
                    <div className="border-buttons">
                    <b>Border Countries: </b>
                      {data?.borders.map((country) => {
                        return (
                          <button className="button-country">
                            <i
                              aria-hidden="true"
                              style={{ fontsize: "16px" }}
                            ></i>
                            {country.toString()}
                          </button>
                        );
                      })}
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return <>{countryData}</>;
};
export default CountryDetail;
