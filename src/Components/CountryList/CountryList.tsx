import React from 'react';
import './CountryList.css';

interface Props {
  name: string;
  onClick: React.MouseEventHandler;
}

const CountryList: React.FC<Props> = ({name, onClick}) => {
  return <p className="country" onClick={onClick}>{name}</p>;
};

export default CountryList;