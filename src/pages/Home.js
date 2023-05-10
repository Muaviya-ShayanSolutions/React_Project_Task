/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-self-assign */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import DropdownMenu from "../components/dropdown/DropDown";
import SearchBarComp from "../components/searchbar/SearchBar";
import Card from "../components/card/Card.js";
import * as CONSTANT from "../utils/constants.js";
import "../components/card/cardStyle.css";
import Loader from "../components/Loader/Loader";
import { useSelector } from "react-redux";
const Home = () => {
  useEffect(() => {
    fetchCountryData();
  }, []);
  const navigate = useNavigate();
  const [countriesData, setCountriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  let [selectedRegion, setSelectedRegion] = useState("");
  const mode = useSelector((state) => state?.variable);
  const fetchCountryData = () => {
    setIsLoading(true);
    console.log("1isLoading-->", isLoading);
    fetch(
      `${CONSTANT.getAllCountries}?fields=name,population,region,capital,flags`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCountriesData(data);
      });
    setIsLoading(false);
    console.log("2isLoading-->", isLoading);
  };

  if (selectedRegion === "All") {
    selectedRegion = "";
  }

  const filteredCountriesData = countriesData.filter(
    (country) =>
      country.name.common.toLowerCase().includes(searchText.toLowerCase()) &&
      (selectedRegion === "" || country.region === selectedRegion)
  );

  return (
    <>
      <div
        style={
          mode.type === CONSTANT.LIGHT_MODE.type
            ? {
                backgroundColor: CONSTANT.LIGHT_MODE.cardBackground,
                color: CONSTANT.LIGHT_MODE.textColor,
              }
            : {
                backgroundColor: CONSTANT.DARK_MODE.backgroundColor,
                color: CONSTANT.DARK_MODE.textColor,
              }
        }
      >
        <Navbar />

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="margin-l-r base spc-btw">
              {/* <div style={{ color: "red" }}>{isLoading}</div> */}
              <SearchBarComp
                searchText={searchText}
                setSearchText={setSearchText}
              />
              <DropdownMenu
                selectedRegion={selectedRegion}
                setSelectedRegion={setSelectedRegion}
              />
            </div>
            <div className="card-main margin-l-r">
              {filteredCountriesData.map((countyData) => {
                return (
                  <div
                    key={countyData.name.official}
                    onClick={() =>
                      navigate(`/country-detail/${countyData.name.common}`, {
                        state: {
                          countryName: countyData.capital[0],
                          mode: mode,
                        },
                      })
                    }
                  >
                    <Card country={countyData} />
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
