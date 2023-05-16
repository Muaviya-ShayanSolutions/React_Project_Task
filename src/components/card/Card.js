import React from "react";
import * as CONSTANT from "../../utils/constants.js";
import "./cardStyle.css";
import { useSelector } from "react-redux";
const Card = (props) => {
  const mode = useSelector((state) => state?.variable);
  const countryCard = (
    <>
      <div
        className="card"
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
        <img
          className="flag-image"
          src={props.country.flags.png}
          alt={props.country.name.official}
        />
        <div className="card-body">
          <h5 className="card-title">
            <b>{props.country.name.common}</b>
          </h5>
          <div className="card-desc">
            <div className="popoulation-mob">
              <p>
                <b>Population: </b>{" "}
                <span style={{ paddingTop: "10px" }}>
                  {props.country.population.toLocaleString()}
                </span>
              </p>
            </div>

            <p>
              <b>Region: </b> {props.country.region}
            </p>
            <div className="popoulation-mob">
            <p className="padding-null">
              <b>Capital: </b> {props.country.capital[0]}
            </p></div>
          </div>
        </div>
      </div>
    </>
  );

  return countryCard;
};
export default Card;
