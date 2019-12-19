import React, { useState } from 'react'
import getBaseUrl from './apiHelper'

// var hwData = []
// function StudentHomework(props){
//     let [hwData, setHwData] = useState([]);  
//     async function getHomework(id) {
//         let requestOptions = {
//             method: "GET",
//             headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
//         }
//         const getData = await fetch(`${getBaseUrl()}api/periods/homework/${id}`, requestOptions);
//         const responseData = await getData.json();

//         setHwData(responseData);
//         console.log(responseData);
//         console.log(id)


//     }

//     // let [hwData, setHwData] = useState([]);                                                                                                                                                                                                                                                                                               
//     React.useEffect(() => {
//         getHomework(props.match.params.shID);

//     }, [props.match.params.shID]);
//     // React.useEffect(() => {
//     //     let requestOptions = {
//     //                 method: "GET",
//     //                 headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
//     //             }
//     //     fetch(`${getBaseUrl()}api/periods/homework/${props.match.params.shID}`, requestOptions)
//     //     .then(results => results.json())
//     //     .then(data => {setHwData(data)})
//     // }, [])

// //     const homeworkDataApiData =  hwData.map((k, index) =>
// //     <div>
// //         <table>
// //             <tr>
// //                 <th>{k.dueDate}</th>
// //             </tr>
// //             <tr>
// //                 <td>{k.description}</td>
// //             </tr>
// //         </table>
// //     </div>
// // )
// // if(hwData.length !== 0){
// //     <div>
// //     {hwData.forEach((k,index) =>
// //         k.description

// //     )}
// //     </div>
// //     console.log(hw);
// // }
//     // console.log(hwData)

// // const testData = <div>
// //     <input></input>
// // </div>
// return (
//     <div>
//         {hwData.map(el =>{
//             return <p>{el}</p>
//         })}
//     </div>
// )
// }

class StudentHomework extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hwData: []
        }
    }
    async componentDidMount() {
        let requestOptions = {
            method: "GET",
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        }
        console.log(this.props.match.params.shID)
        const test = await fetch(`${getBaseUrl()}api/sh/${this.props.match.params.shID}`, requestOptions)
        const test2 = await test.json()
        console.log(test2);
        this.setState({ hwData: test2 })

    }
 
    render() {
        var styler = {
            margin: "40px"
        }
        
            console.log(Object.keys(this.state.hwData))
            return (
                
                <div>
                    <label>Student Name: </label>
                    {this.state.hwData.firstName}
                    <br/>
                    <label>Homework Class</label>
                    <br/>
                    <label>Homework Short Description: </label>
                    {this.state.hwData.homeworkDescription}
                    <br/>
                    <img src={this.state.hwData.imageID}></img>
                    <br/>
                    <label>Functionality for submitting homework for student COMING SOON!</label>
                    <input type="file"></input> 
                </div>
            )
            // return (
            //     <div id="tester" style={styler}>
            //         {Object.keys(this.state.hwData).map(key =>  {
            //             if (key == "description" || key == "dueDate") {
            //                 return <div>
            //                     <h1>{key.toUpperCase()} </h1>
                                
            //                     <h2> {this.state.hwData[key]}</h2>
                               
            //                 </div>
                            

            //             }
            //         },
                    
            //         )}
            //         <input type="file"></input>
                    
            //     </div>
            // )
    }
}
export default StudentHomework;