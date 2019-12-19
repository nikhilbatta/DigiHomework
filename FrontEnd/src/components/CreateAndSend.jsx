import React, {useRef, useState} from 'react'
import getBaseUrl from './apiHelper';



function CreateAndSend(props){
    console.log(props.match.params.pID)
    var [fileupload,setfile] = useState('');
    let file = useRef('')
    let description = useRef('');
    let date = useRef('');
    function Creator(){
        console.log(fileupload);
        console.log(date.current.value)
        const formData = new FormData();
        formData.append('HWImage', fileupload);
        formData.append('Description', description.current.value);
        formData.append("DueDate", date.current.value);
        let id = 1;
        const config = {
            method: "POST",
            mode: 'no-cors',
            headers: {"type": "formData"},
            body: formData,
          };
          console.log(formData);
        fetch(getBaseUrl() + `api/period/${props.match.params.cID}/homework`, config)
          .then(response => 
            console.log(response))
            .then(data =>
                console.log(data));
    }
    function upload(e){
        setfile(e.target.files[0]);
        console.log(e.target.files)
 
    }
    var style = {
        textAlign: "center"
    }
    return (
        <div style={style}>
        <b><h3>New Homework</h3></b>
            <label>Homework Name
                <input type="text"></input>
            </label>
           
            <br/>
            <label>Description </label>
            <textarea className="materialize-textarea" ref={description}></textarea>
            <br/>
            <label>Due Date</label>
            <input ref={date} type="date"></input>
            <br/>
            <label>Upload Homework Image</label>
            <div className="file-path-wrapper">
         
            <input ref={file} type="file" onChange={upload}></input>
            <input className="file-path validate" type="text"/>
            </div>
        
            
            <br/>
            <button className="waves-effect waves-light btn" onClick={Creator}>Create</button>
        </div>
    )
}
export default CreateAndSend;