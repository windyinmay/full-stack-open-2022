export default function Total(props){
    const total = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises
    return (
        <div>
            Number of exercises: {total}
        </div>
    )
}