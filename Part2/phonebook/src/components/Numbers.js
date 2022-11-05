import React from 'react';

export default function Numbers(props) {
    console.log(props.persons);
    return
        <div>
            {props.persons && props.persons.map((p, index) => <li key={index}>{p.name}</li>)}
        </div>
}