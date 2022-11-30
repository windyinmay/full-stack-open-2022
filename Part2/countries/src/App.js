import React, {useEffect, useState} from 'react';
import Countries from "./components/Countries";
import axios from "axios";
import FoundCountry from "./components/FoundCountry";

function App() {
    const [countries, setCountries] = useState([]);
    const [input, setInput] = useState('')
    const message = "Too many matches, specify another filter";
    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                console.log('promise fulfilled')
                setCountries(response.data)
            })
    }, [])

    const handleSearch = (e) => {
        setInput(e.target.value.toLowerCase())
    }

    const countriesFilter = countries.filter(c =>
        c.name.common.toLowerCase().includes(input.trim().toLowerCase()))

    const showCountry = (countryName) => {
        setInput(countryName.toLowerCase());
    }
    console.log('render', countries.length, 'countries')
    return (
        <div>
            <div>
                find countries <input onChange={handleSearch}/>
            </div>
            <div>
                {countriesFilter.length === 1 ? <FoundCountry countriesFilter= {countriesFilter}/>
                    : countriesFilter.length <= 10 ? <Countries countriesFilter = {countriesFilter} showCountry ={showCountry}/> : message}
                {/*{countries.length > 0 && countries.map(c => <li>{c.name.common}</li>)}*/}
            </div>
        </div>
  );
}

export default App;
