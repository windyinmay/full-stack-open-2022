import React from 'react';

export default function Filter(props) {

    return(
        <div>
            find countries <input type='text' onChange={props.handleSearch}/>
        </div>
    )
}