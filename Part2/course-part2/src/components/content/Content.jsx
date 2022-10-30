import React from 'react';
import Part from './Part';

export default function Content({parts}){
    // console.log(props.parts.map(part => console.log(part.name)))
    // return(
    //     <div>
    //         <Header header = {props.header}/>
    //         {props.parts && props.parts.map(part => {
    //                 <li key= {part.id}>
    //                     {part.name} {part.exercises}
    //                 </li>
    //         })}
    //     </div>
    // );
    // console.log(props.parts.map(p => console.log(p.name)))
    return(
        <div>
            {parts.map(part =>
                <Part
                    key={part.id}
                    name={part.name}
                    exercises={part.exercises}
                />
            )}
        </div>
    )
}