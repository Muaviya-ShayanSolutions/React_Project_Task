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
  const mode = useSelector((state) => state?.variable);
  useEffect(() => {
    fetchCountryData();
  }, []);
  const navigate = useNavigate();
  const [countriesData, setCountriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  let [selectedRegion, setSelectedRegion] = useState("");
  const fetchCountryData = () => {
    setIsLoading(true);
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
                      navigate(`/country-detail/${countyData?.name.common}`, {
                        state: {
                          countryName: countyData.capital[0],
                        },
                      })
                    }
                  >
                    <Card country={countyData} />
                  </div>
                );
              })}
            </div>
            <div className="py-3"></div>
            <div
              className={filteredCountriesData.length === 1 ? "last-div-home" : ""}
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
            ></div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;