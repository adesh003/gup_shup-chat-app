// import React, { useState } from 'react'
// import { IoSend } from 'react-icons/io5'
// import { useDispatch } from 'react-redux'
// import { sendMessageThunk } from '../../store/slice/message/message.thunk'
// import { useSelector } from 'react-redux'

// const SendMessage = () => {
//     const dispatch = useDispatch()
//     const [message, setMessage] = useState("")
//     const { selectedUser } = useSelector((state) => state.userReducer)



//     const handleSendBtn = () => {
//         dispatch(sendMessageThunk({
//             recieverId: selectedUser?._id,
//             message
//         }))
//         setMessage("")
//     }
//     return (
//         <div className="p-3 border-t border-t-white/10">
//             <div className="flex items-center gap-2">
//                 <input
//                     type="text"
//                     placeholder="Type a message..."
//                     className="input input-primary flex-1"
//                     onChange={(e) => setMessage(e.target.value)}
//                 />
//                 <button
//                     onClick={handleSendBtn}
//                     className="btn btn-primary">
//                     <IoSend size={20} />
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default SendMessage



import React, { useState } from 'react'
import { IoSend } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { sendMessageThunk } from '../../store/slice/message/message.thunk'
import { useSelector } from 'react-redux'

const SendMessage = () => {
    const dispatch = useDispatch()
    const [message, setMessage] = useState("")
    const { selectedUser } = useSelector((state) => state.userReducer)

    const handleSendBtn = () => {
        // Don't send an empty message
        if (!message.trim()) return;

        dispatch(sendMessageThunk({
            recieverId: selectedUser?._id,
            message
        }))
        // This will now work because the input's value is tied to the 'message' state
        setMessage("")
    }

    return (
        <div className="p-3 border-t border-t-white/10">
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="input input-primary flex-1"
                    // Add this line to control the input's value
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    onClick={handleSendBtn}
                    className="btn btn-primary">
                    <IoSend size={20} />
                </button>
            </div>
        </div>
    )
}

export default SendMessage
