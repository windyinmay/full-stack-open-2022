import React from 'react';

export default function Part(part) {
    
 return(
    <div>
        <li key={part.index}>
            {part.name}  {part.exercises}
        </li>
    </div>
 )
}