import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";
import CountryInfo from "../Components/CountryInfo/CountryInfo";
import CountryList from "../Components/CountryList/CountryList";
import {CountryApiType, CountryInfoType} from "../types";
import './App.css';

const BASE_URL = 'https://restcountries.com/v2/all?fields=alpha3Code,name';
const COUNTRY_URL = 'https://restcountries.com/v2/alpha/';
let aboutCountry;
let findBorder;

const App = () => {
  const [countries, setCountries] = useState<CountryApiType[]>([]);
  const [borders, setBorders] = useState<string[]>([]);
  const [countryInfo, setCountryInfo] = useState<CountryInfoType>({
    name: '',
    population: 0,
    capital: '',
    flag: '',
    borders: []
  });

  const axiosData = useCallback(async () => {
    const response = await axios.get<CountryApiType[]>(BASE_URL);

    response.data.map((elem) => {
      return setCountries(prev => [...prev, elem]);
    })
  }, []);

  useEffect(() => {
    axiosData().catch(console.error);
  }, [axiosData]);

  const getCountry = useCallback(async (code: string) => {
    const copyBorders = [...borders];
    copyBorders.splice(0, copyBorders.length);
    setBorders(copyBorders);

    const response = await axios.get<CountryInfoType>(COUNTRY_URL + code);
    const border = response.data.borders;

    setCountryInfo((prev) => ({
      ...prev,
      name: response.data.name,
      population: response.data.population,
      capital: response.data.capital,
      flag: response.data.flag,
      borders: border,
    }));

    if (border !== undefined) {
      const promises = border.map(async item => (
        await axios.get<CountryInfoType>(COUNTRY_URL + item)
      ));

      const bordersName  = await Promise.all(promises);

      bordersName.forEach((border) => {
        setBorders(prev => [...prev, border.data.name]);
      });
    }
  }, [borders]);

  const getCountryList = countries.map((item) => {
    return (
      <CountryList
        name={item.name}
        key={Math.random()}
        onClick={() => getCountry(item.alpha3Code)}
      />
    )
  });

  if (borders.length) {
    findBorder = borders.map(item => (
      <li key={Math.random()}>{item}</li>
    ));
  } else {
    findBorder = 'No borders';
  }

  if (countryInfo.name !== '') {
    aboutCountry =
      <CountryInfo key={Math.random()} countryInfo={countryInfo}>
        {findBorder}
      </CountryInfo>;
  } else {
    aboutCountry = <div>Choose the country</div>;
  }

  return (
    <div className="App">
      <div className="country-list-block">
        {getCountryList}
      </div>
      <div className="country-info-block">
        {aboutCountry}
      </div>
    </div>
  );
};

export default App;
