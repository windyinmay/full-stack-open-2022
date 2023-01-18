import React from 'react';

const Persons = ({persons, deletePerson}) => {
    return <div>
        {persons.map(p =>
            <li className='note' key={p.id}>
                {p.name} - {p.number} { }
                <button onClick={() => deletePerson(p)}>delete</button>
            </li>)}
    </div>;
};

export default Persons;