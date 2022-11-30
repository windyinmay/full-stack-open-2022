import React from 'react';


export default function Countries ({countriesFilter, showCountry}) {
    return(
        <div>
            {countriesFilter.map((c, index)=>
                <li key={index}>{c.name.common}
                    <button onClick ={() => showCountry(c.name.common)}>show</button></li>)}
        </div>
    )
}