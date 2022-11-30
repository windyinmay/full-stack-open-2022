import React from 'react';

export default function FoundCountry({countriesFilter}) {
    const languages = countriesFilter.map(c => c.languages);
    // const flag = countriesFilter.map(c => c.flags.png)
    // console.log(Object.values(languages[0]))
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
                <p>{Object.values(languages[0]).map((l, index) => <li key={index}>{l}</li>)}</p>
            </div>
            <br/>
            <div>
                <img src = {countriesFilter.map(c => c.flags.png)}  alt='Country flag' />
            </div>
        </div>
    )
}