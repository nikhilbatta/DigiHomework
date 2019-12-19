import React, { useState } from 'react';
import getBaseUrl from './apiHelper'
import Spinner from 'react-bootstrap/Spinner'
function Homework(props) {
    console.log(props);
    let [homeworkData, setHomeworkData] = useState([]);
    let [teacherData, setTeacherData] = useState([]);
    const token = localStorage.getItem('user')
    var noQuotesToken = token.replace(/[""]+/g, '');
    async function getClassData(id) {
        let requestOptions = {
            method: "GET",
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${noQuotesToken}` }
        }
        console.log(id)
        let apiCall = await fetch(`${getBaseUrl()}api/period/info/${id}`, requestOptions);
        let apiResponse = await apiCall.json();
        console.log(apiResponse);
        setTeacherData(apiResponse);
    }
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
        await getClassData(id)

    }
    React.useEffect(() => {
        getPeriodData(props.match.params.pID);
    }, [])
    function viewImage(id) {
        console.log(id)
        let newpath = `/period/homework/image/${id}`
        props.history.push(newpath);
    }
    function newHomework(id) {
        let newpath = `/create/${id}`
        props.history.push(newpath)
    }
    async function sendHomework(periodID, periodHomeworkID) {
        console.log(getBaseUrl() + `api/period/${periodID}/homework/${periodHomeworkID}`)
        let requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        }
        let apiCall = await fetch(getBaseUrl() + `api/period/${periodID}/homework/${periodHomeworkID}`, requestOptions)
        let data = await apiCall.json();
        console.log(data);
    }
    var btnStyle = {
        backgroundColor: 'black',
        color: 'black',
        marginLeft: '5px',
        marginRight: '5px',
        marginTop: '10px',
        marginBottom: '10px',
        color: "white"
    };
    const homeworkDataApiData = homeworkData.map((k, index) =>
        <tr>
            <td>{k.title}</td>
            <td>{k.dueDate}</td>
            <td>{k.description}</td>
            <td>{k.assignedDate}</td>
            <td><button style={btnStyle} className="waves-effect waves-light btn" onClick={() => viewImage(k.periodHomeworkID)}>View homework</button>
                <br />
                <button style={btnStyle} className="waves-effect waves-light btn" onClick={() => sendHomework(k.periodID, k.periodHomeworkID)}> Send Homework</button>

            </td>
        </tr>
    )


    console.log(teacherData)
    if (teacherData.length !== 0) {
        return (
            <div>

                <h3>Teacher Name: {teacherData.teacherName}</h3><h3> Class: {teacherData.className}</h3>

                <button style={btnStyle} className="waves-effect waves-light btn" onClick={() => newHomework(props.match.params.pID)}>Create New Homework for this period</button>
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
    else{
        return (
            <div>
            </div>
        )
        }

}
export default Homework;