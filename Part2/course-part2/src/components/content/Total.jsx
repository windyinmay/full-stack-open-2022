import React from 'react'

export default function Total(props) {
    const total = props.exercises.reduce((prev, curr) =>
        prev + curr.exercises, 0
    )

    // console.log(props.exercises)
    return(
        <div>
            total of {total} exercises
        </div>
    )
}