import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cardStyle.css";
import URLs from"../../utils/constants.js";
const Card = () => {
  const [countriesData, getData] = useState([]);
  const fetchUserData = () => {
    fetch(URLs.getAllCountries)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        getData(data);
      });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const navigate = useNavigate();
  const navigateToContacts = () => {
    navigate("/country-detail");
  };
  
  const test = countriesData.map((country,index) => {
    
    console.log(country.name.common);
    console.log(country.capital[0]);
    console.log(country.region);
    console.log(country.flags.png);
    console.log(country.population);
    
    return (
          <>
            <div  className="card" onClick={navigateToContacts}>
              <img className="flag-image" src={country.flags.png} alt={country.name.common} />
              <div className="card-body">
                <h5 className="card-title">
                  <b>{country.name.common}</b>
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
  return <div className="card-container">{test}</div>;;
  //<div className="card-container">{countryCard}</div>;
};
export default Card;


