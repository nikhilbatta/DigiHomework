import React from 'react'
import {match} from "react-router-dom"

function HomeworkImage(props){
    console.log(props.match.params.imgId);
    return (
        <div>
            <h1>Hey</h1>
            <img src={`https://testerbuckettt.s3-us-west-2.amazonaws.com/HOMEWORK-${props.match.params.imgId}.jpeg`}></img>
        </div>
    )
}
// const HomeworkImage = ({ match }) => (
//     <div>
//         
// )
export default HomeworkImage;