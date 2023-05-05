import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cardStyle.css";
import * as CONSTANT from "../../utils/constants.js";
const Card = () => {
  const [countriesData, setCountriesData] = useState([]);
  const fetchCountryData = () => {
    fetch(
      `${CONSTANT.getAllCountries}?fields=name,population,region,capital,flags`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCountriesData(data);
      });
  };
  useEffect(() => {
    fetchCountryData();
  }, []);

  const navigate = useNavigate();

  const countryCard = countriesData.map((country, index) => {
    return (
      <>
        <div
          key={index}
          className="card"
          onClick={() =>
            navigate("/country-detail", {
              state: { countryName: country.name.official },
            })
          }
        >
          <img
            className="flag-image"
            src={country.flags.png}
            alt={country.name.official}
          />
          <div className="card-body">
            <h5 className="card-title">
              <b>{country.name.official}</b>
            </h5>
            <div className="card-desc">
              <p>
                <b>Population: </b> {country.population}
              </p>
              <p>
                <b>Region: </b> {country.region}
              </p>
              <p>
                <b>Capital: </b> {country.capital[0]}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  });
  return <div className="card-container">{countryCard}</div>;
};
export default Card;
