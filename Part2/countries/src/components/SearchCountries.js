import React from 'react';

export default function SearchCountries({handleSearch, input}) {
    return(
        <div>
            find countries <input value={input} onChange={handleSearch}/>
        </div>
    )
}