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
import Table from './Table';
import { sortData } from './util';


function App() {

  const [countries, setCountries] = useState([]); //list of countries in dropdown
  const [country, setCountry] = useState('worldwide'); //selected country from dropdown
  const [countryInfo, setCountryInfo] = useState({}); //displaying cases of the selected country
  const [tableData, setTableData] = useState([]); //displaying table of all countries


  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      });
  }, []);

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

          const sortedData = sortData(data);

          setTableData(sortedData);
          setCountries(countries);

          // console.log(data);
        });

    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    // console.log(countryCode);

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all'
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url).then(response => response.json())
      .then(data => {
        setCountry(countryCode);
        setCountryInfo(data);
      });

  };

  // console.log(countryInfo);

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

          <InfoBox title="CoronaVirus Cases" total={countryInfo.cases} cases={countryInfo.todayCases} />

          <InfoBox title="Recovered" total={countryInfo.recovered} cases={countryInfo.todayRecovered} />

          <InfoBox title="Deaths" total={countryInfo.deaths} cases={countryInfo.todayDeaths} />

        </div>

        {/* Map */}
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* Table */}
          <Table countries={tableData} />
          <h3>Worldwide new cases</h3>
          {/* Graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
