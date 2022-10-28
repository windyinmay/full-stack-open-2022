import React from 'react'
import Part from '../Part'

export default function Content(props) {
    console.log(props.parts)
    return (
        <div>
            <Part parts = {props.parts[0]}/>
            <Part parts = {props.parts[1]}/>
            <Part parts = {props.parts[2]}/>
        </div>
    )
};