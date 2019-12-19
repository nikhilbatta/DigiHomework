import React from 'react'
import {match} from "react-router-dom"

function HomeworkImage(props){

    return (
        <div>
            
            <img src={`https://testerbuckettt.s3-us-west-2.amazonaws.com/HOMEWORK-${props.match.params.imgId}.jpeg`}></img>
        </div>
    )
}
// const HomeworkImage = ({ match }) => (
//     <div>
//         
// )
export default HomeworkImage;