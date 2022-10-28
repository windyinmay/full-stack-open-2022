import React from 'react'

const Part = (props) => {
   console.log(props)
   return(
       <div>
          <p>{props.parts.name}: {props.parts.exercises}</p> 
       </div>
   )
}

export default Part;