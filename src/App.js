import React, { useState, useEffect } from 'react';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent
} from "@material-ui/core";
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map';


function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');

  //useeffect is a react hook
  //which runs a code based on a certain condition
  useEffect(() => {
    //this empty array specifies the condition, which is left
    //empty which means that this code will run once
    //when the component loads and not again.
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2,
            }
          ));

          setCountries(countries);

        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    // console.log(countryCode);
    setCountry(countryCode);
  }

  return (
    <div className="app"> {/* bemn naming convention */}
      <div className="app__left">

        <div className="app__header">

          <h1> Covid-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
              {/* 
            <MenuItem value="">option 1</MenuItem>
            <MenuItem value="">option 2</MenuItem>
            <MenuItem value="">option 3</MenuItem>
            <MenuItem value="">option 4</MenuItem>
          */}
            </Select>
          </FormControl>
        </div>


        <div className="app__stats">

          <InfoBox title="CoronaVirus Cases" total={2000} cases={123} />

          <InfoBox title="Recovered" total={3000} cases={124} />

          <InfoBox title="Deaths" total={4000} cases={12345} />

        </div>

        {/* Map */}
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* Table */}
          <h3>Worldwide new cases</h3>
          {/* Graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
