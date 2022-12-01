import React from 'react';

const Persons = ({persons, deletePerson}) => {
    return <div>
        {persons.map(p =>
            <li key={p.id}>
                {p.name} {p.number}
                <button onClick={() => deletePerson(p.id)}>delete</button>
            </li>)}
    </div>;
};

export default Persons;