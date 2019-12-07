import React from 'react'

function CreateAndSend(){
    return (
        <div>
            <input type="file"></input>
            <button>Create</button>
            {/* only if the homework is created then it can only be sent */}
            <button>Send</button>
        </div>
    )
}
export default CreateAndSend()