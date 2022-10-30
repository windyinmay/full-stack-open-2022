import React from 'react'
import Content from './content/Content'
import Header from './header/Header';
import Total from './content/Total';

export default function Course(props) {

    // return <Content header={props.course.name} parts={props.course.parts}/>
    return (
        <div>
            {props.courses.map((c,index) =>
                <div key={index}>
                    <Header names={c.name}/>
                    <Content parts={c.parts}/>
                    <Total parts={c.parts}/>
                </div>
            )}
        </div>
    )
}