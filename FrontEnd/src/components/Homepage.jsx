import React, {useState} from 'react'
import getBaseUrl from './apiHelper'
import  {Link}  from 'react-router-dom'

function Homepage(){
    let [periodData, setPeriodData] = useState([]);
    let [homeworkData, setHomeworkData] = useState([]);
    let [dataLoaded, setDataLoaded] = useState(false);
    const token = localStorage.getItem('user')
    var noQuotesToken = token.replace(/[""]+/g, '');
    let requestOptions = {
        method: "GET",
        headers: { 'Content-Type': 'application/json',  'Accept': 'application/json',  'Authorization': `Bearer ${noQuotesToken}`},
    }
    async function fetchMyApi(){
      
        const fetcher= await fetch(getBaseUrl() + "api/periods", requestOptions)
        const response = await fetcher.json();
        console.log(response);
        setPeriodData(response);
        
    }
    React.useEffect(() => {
       fetchMyApi();
    }, [])
    async function getPeriodData(id){
        let requestOptions = {
            method: "GET",
            headers: { 'Content-Type': 'application/json',  'Accept': 'application/json',  'Authorization': `Bearer ${noQuotesToken}`}
        }
        const getData = await fetch(`${getBaseUrl()}api/period/${id}`, requestOptions);
        const responseData = await getData.json();
        setHomeworkData(responseData);
        setDataLoaded(true);
        console.log(responseData);
        console.log(id)
       
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
    const okay = periodData.map((k,index) =>
    <div>
    <h1>{k.name}</h1>
    <h4>{k.subject}</h4>
   <button onClick={() => getPeriodData(k.periodID)}>View Homework For This Class</button>
    </div>
    )
    if (!dataLoaded){
    return (
        <div>    
           {okay}
        </div>
    )
    } else {
        console.log(homeworkData);
        const secondData = homeworkData.map((k,index) =>
        <div>
            <h1>{k.description}</h1>
            <h4>{k.dueDate}</h4>
            <Link to={`/homework/${k.periodHomeworkID}`}>Click</Link>
        </div>
        );
        return (
            <div>
                {secondData}
            </div>
        )
    }
    
    
}
export default Homepage;