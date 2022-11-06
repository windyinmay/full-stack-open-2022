import React from 'react'

export default function Filter(props) {
    return (
        <div>
            <input type="text" onChange={props.handleFilter}/>
        </div>
    )
}