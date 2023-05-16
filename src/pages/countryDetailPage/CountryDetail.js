/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./countryDetailPageStyle.css";
import CustomButton from "../../components/customButton";
import { useLocation } from "react-router-dom";
import * as CONSTANT from "../../utils/constants.js";
import Loader from "../../components/Loader/Loader";
import { useSelector } from "react-redux";

const CountryDetail = () => {
  const location = useLocation();
  const countryName = location.state.countryName;
  useEffect(() => {
    fetchCountryDetail();
  }, []);

  const mode = useSelector((state) => state?.variable);
  const [countryDetail, setCountryDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [borderCountries, setBorderCountries] = useState([]);

  const fetchCountryDetail = () => {
    setIsLoading(true);
    let tempArray = [];
    fetch(
      `${CONSTANT.getCountryDetail}${countryName}?fields=name,population,region,capital,flags,subregion,tld,currencies,languages,borders`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data[0]?.borders?.map((country) => {
          fetch(`${CONSTANT.getCountryByCode}${country}?fields=name,capital`)
            .then((response) => {
              return response.json();
            })
            .then((borderData) => {
              tempArray.push({
                common: borderData.name.common,
                capital: borderData.capital[0],
              });
              setBorderCountries(tempArray);
            });
          return true;
        });
        setCountryDetail(data);
        setIsLoading(false);
      });
  };

  const navigate = useNavigate();
  const countryData = countryDetail.map((data) => {
    return (
      <div key={data?.name.official}>
        <Navbar />
        <div className="base margin-l-r mt-0 mb-0 pt-5 pb-5">
          {isLoading === true ? (
            <Loader />
          ) : (
            <>
              <CustomButton title={"Back"} />
              <div className="my-5"></div>
              <div className="row mob-view">
                <div className="col-6 pe-5">
                  <img
                    className="w-100 shadow-lg img-flag"
                    src={data?.flags.png}
                    alt={data?.name.official}
                  />
                </div>
                <div className="col-6 m">
                  <h3 className="countryName">{data?.name.official}</h3>
                  <div
                    className="row flag-detail"
                    style={
                      mode.type === CONSTANT.LIGHT_MODE.type
                        ? {
                            color: CONSTANT.LIGHT_MODE.textColor,
                          }
                        : {
                            color: CONSTANT.DARK_MODE.textColor,
                          }
                    }
                  >
                    <div className="col-6 flag-detail-text">
                      <p>
                        <b style={{ fontSize: "16px", fontWeight: "600px" }}>
                          Native Name:{" "}
                        </b>
                        {data &&
                          Object.entries(data?.name.nativeName).map(
                            ([key, val], index) => {
                              const name = `${val.common}`;
                              const Nativename =
                                index === 0 ? name : `, ${name}`;
                              return (
                                <span
                                  style={{
                                    fontSize: "16px",
                                    fontWeight: "300px",
                                  }}
                                  key={Nativename}
                                >
                                  {" "}
                                  {Nativename}{" "}
                                </span>
                              );
                            }
                          )}
                      </p>
                      <p>
                        <b>Population: </b>{" "}
                        <span style={{ fontSize: "16px", fontWeight: "300px" }}>
                          {data?.population.toLocaleString()}
                        </span>
                      </p>
                      <p>
                        <b>Region: </b>{" "}
                        <span style={{ fontSize: "16px", fontWeight: "300px" }}>
                          {data?.region.toString()}
                        </span>
                      </p>
                      <p>
                        <b>Sub Region: </b>{" "}
                        <span style={{ fontSize: "16px", fontWeight: "300px" }}>
                          {data?.subregion.toString()}
                        </span>
                      </p>
                      <p>
                        <b>Capital: </b>{" "}
                        <span style={{ fontSize: "16px", fontWeight: "300px" }}>
                          {data?.capital.toString()}
                        </span>
                      </p>
                    </div>
                    <div className="col-6">
                      <p>
                        <b>Top Level Domain: </b>{" "}
                        <span style={{ fontSize: "16px", fontWeight: "300px" }}>
                          {data?.tld.toString()}
                        </span>
                      </p>
                      <p>
                        <b>Currencies: </b>
                        {data &&
                          Object.keys(data?.currencies).map((currency) => {
                            return (
                              <span
                                style={{
                                  fontSize: "16px",
                                  fontWeight: "300px",
                                }}
                                key={Object.keys(currency)}
                              >
                                {currency}
                              </span>
                            );
                          })}
                      </p>
                      <p>
                        <b>Languages: </b>
                        {data &&
                          Object.values(data?.languages).map((lang) => {
                            return (
                              <span
                                style={{
                                  fontSize: "16px",
                                  fontWeight: "300px",
                                }}
                                key={lang}
                              >
                                {" "}
                                {lang}{" "}
                              </span>
                            );
                          })}
                      </p>
                    </div>
                    <div className="row">
                      <span className="d-flex border-detail">
                        <b className="mt-1 text-nowrap">Border Countries: </b>
                        <div className="border-buttons">
                          {data?.borders.length > 0 ? (
                            borderCountries.map((country) => {
                              if (country) {
                                return (
                                  <button
                                    style={
                                      mode.type === CONSTANT.LIGHT_MODE.type
                                        ? {
                                            color:
                                              CONSTANT.LIGHT_MODE.textColor,
                                            backgroundColor:
                                              CONSTANT.LIGHT_MODE
                                                .cardBackground,
                                          }
                                        : {
                                            color: CONSTANT.DARK_MODE.textColor,
                                            backgroundColor:
                                              CONSTANT.DARK_MODE.cardBackground,
                                          }
                                    }
                                    key={country.common}
                                    onClick={() => {
                                      navigate(
                                        `/country-detail/${country.common}`,
                                        {
                                          state: {
                                            countryName: country.capital,
                                          },
                                        },
                                        { replace: true }
                                      );
                                      window.location.reload();
                                    }}
                                    className="button-country"
                                  >
                                    <i
                                      aria-hidden="true"
                                      style={{ fontsize: "16px" }}
                                    ></i>
                                    {country.common}
                                  </button>
                                );
                              } else {
                                return null;
                              }
                            })
                          ) : (
                            <p className="no-border-text">
                              No countries to display.
                            </p>
                          )}
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-5"></div>
            </>
          )}
        </div>
      </div>
    );
  });
  return (
    <div
      style={
        mode.type === CONSTANT.LIGHT_MODE.type
          ? {
              backgroundColor: CONSTANT.LIGHT_MODE.backgroundColor,
              color: CONSTANT.LIGHT_MODE.textColor,
            }
          : {
              backgroundColor: CONSTANT.DARK_MODE.backgroundColor,
              color: CONSTANT.DARK_MODE.textColor,
            }
      }
    >
      {countryData}
    </div>
  );
};
export default CountryDetail;
