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
        getPeriodData(props.match.params.hwID);
    }, [])
    function viewImage(id){
        let newpath = `/period/homework/image/${id}`
        props.history.push(newpath);
    }
    const homeworkDataApiData = homeworkData.map((k, index) =>
        <div>
            <table>
                <tr>
                    <th>{k.dueDate}</th>
                </tr>
                <tr>
                    <td>{k.description}</td>
                    <button onClick={() => viewImage(k.periodHomeworkID)}>View image for this homework</button>
                    <button> Send Homework To Students In This Class</button>
                </tr>
            </table>
        </div>
    )
    return (
        <div>
            {homeworkDataApiData}
        </div>
    )

}
export default Homework;