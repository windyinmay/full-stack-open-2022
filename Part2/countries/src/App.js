import React, {useEffect, useState} from 'react';
import Filter from './components/Filter';
import Countries from "./components/Countries";
import SearchCountries from "./components/SearchCountries";
import axios from "axios";

function App() {
    const [countries, setCountries] = useState([]);
    const [input, setInput] = useState('')
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

    console.log('render', countries.length, 'countries')
    return (
    <div>
        <SearchCountries input={input} handleSearch = {handleSearch}/>
        <Filter countriesFilter = {countriesFilter}/>
        {/*{countries.length > 0 && countries.map(c => <li>{c.name.common}</li>)}*/}
    </div>
  );
}

export default App;
