import React from 'react'

export default function Total(props) {
    const total = props.parts.reduce((prev, curr) =>
        prev + curr.exercises, 0
    )

    // console.log(props.exercises)
    return(
        <div>
            <h4>total of {total} exercises</h4>
        </div>
    )
}