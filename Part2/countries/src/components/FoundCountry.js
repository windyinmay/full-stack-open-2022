import React from 'react';

export default function FoundCountry({countriesFilter}) {
    const languages = countriesFilter.map(c => c.languages);
    console.log(languages)
    return(
        <div>
            <br/>
            <div>
                <h1>{countriesFilter.map(c=> c.name.common)}</h1>
            </div>
            <br/>
            <div>
                <p>capital {countriesFilter.map(c => c.capital)}</p>
                <p>area {countriesFilter.map(c => c.area)}</p>
            </div>
            <br/>
            <div>
                <p><b>languages:</b></p>
                <br/>
                <p></p>
            </div>
        </div>
    )
}