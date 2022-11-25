import React, {useCallback, useEffect, useState} from 'react';
import {CountryApiType} from "../../types";
import './CountryList.css';
import axios from "axios";

const COUNTRIES = 'https://restcountries.com/v2/all?fields=alpha3Code,name';

const CountryList = () => {
  const [countries, setCountries] = useState<CountryApiType[]>([]);

  const fetchData = useCallback(async () => {
    const countriesResponse = await axios.get<CountryApiType[]>(COUNTRIES);
    setCountries(countriesResponse.data)
  }, []);

  useEffect(() =>{
    fetchData().catch(console.error);
  }, [fetchData]);

  const countryChoose = countries.map(item => (
    <p
      key={item.alpha3Code}
    >{item.name}</p>
  ))

  return (
    <div className="country-list-block">
      {countryChoose}
    </div>
  );
};

export default CountryList;