import React from 'react';
import FoundCountry from './FoundCountry'

export default function Filter({countriesFilter}){
    const message = "Too many matches, specify another filter";
    const searchResult = countriesFilter.map(c=> <li>{c.name.common}</li>)
    console.log(countriesFilter)
    return(
        <div>
            {/*{countriesFilter.map(c=> <li>{c.name.common}</li>)}*/}
            {countriesFilter.length === 1 ? <FoundCountry countriesFilter = {countriesFilter}/>
                : countriesFilter.length <= 10 ? searchResult: message}
        </div>
    )
}