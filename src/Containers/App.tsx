import React from 'react';
import './App.css';
import CountryInfo from "../Components/CountryInfo/CountryInfo";
import CountryList from "../Components/CountryList/CountryList";

function App() {
  return (
    <div className="App">
      <CountryList/>
      <CountryInfo/>
    </div>
  );
}

export default App;
