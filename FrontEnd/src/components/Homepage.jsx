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
    var divStyle = {
        width: '65%',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '50px',
        
       
    }
    var btnStyle = {
        backgroundColor: 'grey',
        color: 'black',
        marginLeft: '5px',
        marginRight: '5px',
        marginTop: '10px',
        marginBottom: '10px'
      };
      var innerDiv = {
          flexWrap: "flex",
          textAlign: "center",
          backgroundColor: 'grey'
      }
      var h4Style = {
          textAlign: "center"
      }
    const periodDataV = periodData.map((k, index) =>
            <div style={innerDiv}>
             <li className="collection-item">
            <h3>{k.subject}</h3>
            <button style={btnStyle} onClick={() => movePage(k.periodID)} type="submit" className="waves-effect waves-light btn"><i className="material-icons left">view_list</i>View Homework</button>
             </li>
           
            
             </div>
    )
    if (!dataLoaded) {
        return (
            <div style={divStyle}> 
                 <ul className="collection with-header">
                 <li className="collection-header"><h4 style={h4Style}>Your Classes</h4></li>
                {periodDataV}
                </ul>
            </div>
        )
    }
}
export default Homepage;