import React, { useState } from 'react'
import getBaseUrl from './apiHelper'
import { Link } from 'react-router-dom'
import Homework from './Homework'

function Homepage(props) {
    let [periodData, setPeriodData] = useState([]);
    let [dataLoaded, setDataLoaded] = useState(false);
    const token = localStorage.getItem('user')
    var noQuotesToken = token.replace(/[""]+/g, '');
    let requestOptions = {
        method: "GET",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${noQuotesToken}` },
    }
    async function fetchMyApi() {
        const fetcher = await fetch(getBaseUrl() + "api/periods", requestOptions)
        const response = await fetcher.json();
        console.log(response);
        setPeriodData(response);
    }
    React.useEffect(() => {
        fetchMyApi();
    }, [])
    function movePage(id) {
        let newpath = `/period/homework/${id}`
        props.history.push(newpath)
    }
    // function getHomeworkData(id){
    //     setimageurl(`https://testerbuckettt.s3-us-west-2.amazonaws.com/HOMEWORK-${id}.jpeg`);
    //     setimageto(true);
    // }
    // async function getHomeworkData(id){
    //     let requestOptions = {
    //         method: "GET",
    //         headers: { 'Content-Type': 'application/json',  'Accept': 'application/json',  'Authorization': `Bearer ${noQuotesToken}`},
    //     }
    //     const getHomeworkData = await fetch(getBaseUrl() + `api/period/homework/${id}/image`)
    //     const setter = await getHomeworkData.json();
    //     setimageurl(setter);
    //     console.log(setter);

    // }
    const periodDataV = periodData.map((k, index) =>
        <div>
            <h1>{k.name}</h1>
            <h4>{k.subject}</h4>
            <button onClick={() => movePage(k.periodID)}>View Homework For This Class</button>
        </div>
    )
    if (!dataLoaded) {
        return (
            <div>
                {periodDataV}
            </div>
        )
    }
}
export default Homepage;