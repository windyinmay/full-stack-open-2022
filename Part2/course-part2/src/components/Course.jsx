import React from 'react'
import Content from './content/Content'
import Header from './header/Header';
import Total from './content/Total';

export default function Course(props) {

    // return <Content header={props.course.name} parts={props.course.parts}/>
    return (
        <div>
            <Header header={props.course.name}/>
            <Content parts ={props.course.parts}/>
            <Total exercises={props.course.parts}/>
        </div>
    )
}