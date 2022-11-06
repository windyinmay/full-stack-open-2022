import React, {useEffect, useState} from 'react';
import Filter from './components/Filter';
import Countries from "./components/Countries";
import SearchCountries from "./components/SearchCountries";
import axios from "axios";

function App() {
    const [countries, setCountries] = useState([]);
    const [input, setInput] = useState('');
    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
            .then(res => {
                // console.log(res.data)
                setCountries(res.data)
            })
            .catch(err=> console.log(err))
    },[input])
    const handleSearch = (e) => {
        // console.log(e.target.value)
        setInput(e.target.value.toLowerCase())
    }
    const filterCountries = countries.filter(c =>
        c.name.common.toLowerCase().includes(input.trim().toLowerCase()))
    // console.log(filterCountries)
    return (
    <div>
        <Filter handleSearch={handleSearch}/>
        {/*{filterCountries.length > 0 && <Countries filterCountries={filterCountries}/>}*/}
        {filterCountries.length > 0 && <SearchCountries filterCountries={filterCountries}/>}
    </div>
  );
}

export default App;
