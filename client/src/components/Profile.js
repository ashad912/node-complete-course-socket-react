import React from 'react'

export default function Profile(props) {
    console.log(props)
    //console.log(props.ninja)
    //console.log(props.ninja.name)
    return (
        <div>
           <p>{props.data.name}</p> 
        </div>
    )
}
