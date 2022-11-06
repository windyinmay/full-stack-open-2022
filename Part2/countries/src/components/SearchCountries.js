import React from 'react';
import FoundCountry from "./FoundCountry";

const SearchCountries = ({filterCountries}) => {
    return <div>
        {
            (()=> {
                if(filterCountries.length > 10) return <p>"Too many matches, specify another filter"</p>
                else{
                    if(filterCountries === 1){
                        return (<FoundCountry found= {filterCountries[0]}/>)
                    }else {
                        return
                        {filterCountries.map(c => {
                            <li key={c.name.official}>{c.name.common}</li>
                            })}
                    }
                }
            })
        }
    </div>
};
export default SearchCountries;
