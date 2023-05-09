import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as CONSTANT from "../../utils/constants.js";
import "../.././index.css";
import "./dropdownstyle.css";

function DropdownMenu(props) {
  const mode = useSelector((state) => state?.variable);
  const regions = [
    "All",
    "Africa",
    "Americas",
    "Antarctic",
    "Asia",
    "Europe",
    "Oceania",
  ];

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectRegion = (region) => {
    props.setSelectedRegion(region);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button
        onClick={toggleDropdown}
        className="dropdown-toggle"
        style={
          mode.type === CONSTANT.LIGHT_MODE.type
            ? {
                backgroundColor: CONSTANT.LIGHT_MODE.backgroundColor,
                color: CONSTANT.LIGHT_MODE.textColor,
              }
            : {
                backgroundColor: CONSTANT.DARK_MODE.cardBackground,
                color: CONSTANT.DARK_MODE.textColor,
              }
        }
      >
        <span
          style={{ paddingRight: "30px", fontSize: "14px", fontWeight: "600" }}
        >
          {props.selectedRegion || "Filter by Region"}
        </span>
      </button>
      {isOpen && (
        <ul
          className="dropdown-menu"
          style={
            mode.type === CONSTANT.LIGHT_MODE.type
              ? {
                  backgroundColor: CONSTANT.LIGHT_MODE.backgroundColor,
                }
              : {
                  backgroundColor: CONSTANT.DARK_MODE.cardBackground,
                }
          }
        >
          {regions.map((region) => {
            return (
              <li
                key={region}
                onClick={() => selectRegion(region)}
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
                {region}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default DropdownMenu;
