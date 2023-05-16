import React from "react";
import CountryDetail from "./pages/countryDetailPage/CountryDetail";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/country-detail" element={<CountryDetail />} />
    </Routes>
  );
};

export default App;
