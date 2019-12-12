import React from 'react'
import getBaseUrl from './apiHelper'

function Homepage(){
    const token = localStorage.getItem('user')
    var noQuotesToken = token.replace(/[""]+/g, '');
    const requestOptions = {
        method: "GET",
        headers: { 'Content-Type': 'application/json',  'Accept': 'application/json',  'Authorization': `Bearer ${noQuotesToken}`},
    }
    async function fetchMyApi(){
        let response = await fetch(getBaseUrl + "api/teacher", requestOptions)
        response = await response.json();
        console.log(response);
    }
    React.useEffect(() => {
       fetchMyApi();
    }, [])
  
    // I needed this function because I wasnt using useEffect properly with async function but now I am so I can maybe delete this.
    function handleResponse(response) {
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if (response.status === 401) {
                    // auto logout if 401 response returned from api
                    logout();
                    location.reload(true);
                }
    
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            console.log(response)
            return data;
           
        });
    }
        let rows = []
        for(var i = 0; i < 5 ; i++){
            let rowID = `row${i}`
            let cell = []
            for (var i = 0; i < 5; i ++){
                let cellID = `cell${i}`
                cell.push(<div><td key={cellID} id={cellID}>Test Data</td>
                    <td>Hey</td></div>)
            }
            rows.push(<tr key={i} id={rowID}>{cell}</tr>)
        }
    
    return (
        <div>
           <h2>John Smith</h2>
           <h3>Olympia High School</h3>
           <table>
               <tbody>
               {rows}
               </tbody>
          
           </table>
           


        </div>
    )
}
export default Homepage;