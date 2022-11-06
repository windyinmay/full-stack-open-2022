import React from 'react';

const Countries = ({ filterCountries}) => {
    return <div>
        {filterCountries.map(country =>
            <p key={country.name.official}>
                {country.name.common} {' '}
            </p>
        )}
    </div>
};
export default Countries;
