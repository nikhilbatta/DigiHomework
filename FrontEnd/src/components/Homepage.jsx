import React from 'react'

function Homepage(){
    const token = localStorage.getItem('user')
    console.log(token.slice(1))
    console.log(token.slice(0, token.length - 1))
    const requestOptions = {
        method: "GET",
        headers: { 'Content-Type': 'application/json',  'Accept': 'application/json',  'Authorization': `Bearer ${localStorage.getItem('user')}`},
    }
    React.useEffect(() => {
        return fetch('http://localhost:4000/api/teacher', requestOptions)
        .then(data => {
            console.log(data);
        })
    })
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