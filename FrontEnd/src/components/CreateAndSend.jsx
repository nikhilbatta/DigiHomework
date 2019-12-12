import React, {useRef} from 'react'



function CreateAndSend(){
    let file = useRef('')
    let description = useRef('');
    function Creator(){
        console.log(file.current.value)
        console.log(description.current.value)
    }
    function upload(e){
        console.log(e.target.files)
    }
    return (
        <div>
            <input ref={file} type="file" onChange={upload}></input>
            <input ref={description} type="text"></input>
            <button onClick={Creator}>Create</button>
            {/* only if the homework is created then it can only be sent */}
            <button>Send</button>
        </div>
    )
}
export default CreateAndSend;