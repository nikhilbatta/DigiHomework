import React, { useState } from 'react';
import getBaseUrl from './apiHelper'

function Homework(props) {
    console.log(props);
    let [homeworkData, setHomeworkData] = useState([]);
    const token = localStorage.getItem('user')
    var noQuotesToken = token.replace(/[""]+/g, '');
    async function getPeriodData(id) {
        let requestOptions = {
            method: "GET",
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${noQuotesToken}` }
        }
        const getData = await fetch(`${getBaseUrl()}api/period/${id}`, requestOptions);
        const responseData = await getData.json();
        setHomeworkData(responseData);
        console.log(responseData);
        console.log(id)

    }
    React.useEffect(() => {
        getPeriodData(props.match.params.pID);
    }, [])
    function viewImage(id){
        let newpath = `/period/homework/image/${id}`
        props.history.push(newpath);
    }
    function newHomework(id){
        let newpath = `/create/${id}`
        props.history.push(newpath)
    }
    async function sendHomework(periodID, periodHomeworkID){
        console.log(getBaseUrl() + `api/period/${periodID}/homework/${periodHomeworkID}`)
        let requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        }
        let apiCall = await fetch(getBaseUrl() + `api/period/${periodID}/homework/${periodHomeworkID}`, requestOptions)
        let data = await apiCall.json();
        console.log(data);
    }
    const homeworkDataApiData = homeworkData.map((k, index) =>
                <tr>
                    <td>Short Name</td>
                    <td>{k.dueDate}</td>
                    <td>{k.description}</td>
                    <td>{k.assignedDate}</td>
                    <td><button onClick={() => viewImage(k.periodHomeworkID)}>View homework</button>
                    <button onClick={() => sendHomework(k.periodID, k.periodHomeworkID)}> Send Homework To Students</button>
                    
                    </td>
                </tr>
    )
    return (
        <div>
            
            <label><h1>This will be class name</h1></label>
            <label><h2>Teacher name</h2></label>
            <button onClick={() => newHomework(props.match.params.pID)}>Create New Homework for this period</button>
            <table>
            <tr>
                    <th>Homework Name</th>
                    <th>Due Date</th>
                    <th>Description</th>
                    <th>Assigned</th>
                    <th></th>
                </tr>
            {homeworkDataApiData}
            </table>
            
        </div>
    )

}
export default Homework;