import React, {useRef, useState} from 'react'
import getBaseUrl from './apiHelper';



function CreateAndSend(){
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
        fetch(getBaseUrl() + `api/period/${id}/homework`, config)
          .then(response => 
            console.log(response))
            .then(data =>
                console.log(data));
    }
    function upload(e){
        setfile(e.target.files[0]);
        console.log(e.target.files)
 
    }
    return (
        <div>
            <input ref={file} type="file" onChange={upload}></input>
            <input ref={description} type="text"></input>
            <input ref={date} type="date"></input>
            <button onClick={Creator}>Create</button>
            {/* only if the homework is created then it can only be sent */}
            {/* <button>Send</button> */}
        </div>
    )
}
export default CreateAndSend;