import React from 'react'
import StatisticLine from './StatisticLine';

export default function Statistics(props) {
    let all = props.good + props.neutral + props.bad;
    let average = (props.good - props.bad) / all;
    let possitive = (props.good/all) * 100;

    if (all === 0) {
        return "No feedback given";
    } else {
    return (
        <div>
            <StatisticLine text="good" value = {props.good}/>
            <StatisticLine text="neutral" value = {props.neutral}/>
            <StatisticLine text="bad" value = {props.bad}/>
            <StatisticLine text="all" value = {all}/>
            <StatisticLine text="average" value = {average}/>
            <StatisticLine text="positive" value = {possitive}/>
        </div>
    )
    }
}