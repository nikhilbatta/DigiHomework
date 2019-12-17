import React from 'react';

function Homework(props){
    console.log(props)
    return (
        <h1 onClick={() => props.onClick(1)}>hey</h1>
    )
   
}
export default Homework;