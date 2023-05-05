import React from "react";
import Navbar from "../components/navbar/Navbar";
import DropdownMenu from "../components/dropdown/DropDown";
import SearchBarComp from "../components/searchbar/SearchBar";
import Card from "../components/card/Card.js";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="base spc-btw">
        <SearchBarComp />
        <DropdownMenu />
      </div>
      <div className="margin-l-r">
        <Card />
      </div>
    </>
  );
};
export default Home;
