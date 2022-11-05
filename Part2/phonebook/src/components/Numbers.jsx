import React from 'react'

export default function Numbers({persons}) {

    return(
        <div>
            {persons.map((person, index) => {
                <li key={index}>
                    {person.name}
                </li>
            })}
        </div>
    )
}