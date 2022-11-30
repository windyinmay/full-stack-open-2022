import React from 'react';


export default function Countries ({countriesFilter, showCountry}) {
    return(
        <div>
            {countriesFilter.map(c=>
                <li key={c.name.offical}>{c.name.common}
                    <button onClick ={() => showCountry(c.name.common)}>show</button></li>)}
        </div>
    )
}