import React from 'react';
import './CountryInfo.css';
import {CountryInfoType} from "../../types";

interface Props extends React.PropsWithChildren {
  countryInfo: CountryInfoType;
}

const CountryInfo: React.FC<Props> = ({countryInfo, children}) => {
  return (
    <>
      <div className="country-info">
        <div>
          <h1 className="info-title">{countryInfo.name}</h1>
          <p><b>Capital</b> {countryInfo.capital}</p>
          <p><b>Population:</b> {countryInfo.population} peoples</p>
        </div>
        <img src={countryInfo.flag} alt="#"/>
      </div>
      <p><b>Borders with:</b></p>
      {children}
    </>
  );
};

export default CountryInfo;