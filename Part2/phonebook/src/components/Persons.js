import React from 'react';

const Persons = ({persons}) => {
    return <div>
        {persons.map(p =>
            <li key={p.id}>
                {p.name} {p.number}
            </li>)}
    </div>;
};

export default Persons;