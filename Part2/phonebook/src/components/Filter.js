import React from 'react'

export default function Filter(props) {
    return (
        <div>
            filter shown with <input type="text" onChange={props.handleFilter}/>
        </div>
    )
}