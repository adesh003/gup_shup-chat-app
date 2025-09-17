import { response } from "express";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";
import Message from "../models/messageModel.js";
import Conversation from "../models/conversationModel.js";
import { getSocketId, io } from "../socket/socket.js";


export const sendMessage = asyncHandler(async (req, res, next) => {

    const senderId = req.user._id;
    const recieverId = req.params.recieverId;
    const message = req.body.message;

    if (!senderId || !recieverId || !message) {
        return next(new errorHandler("All feild are required", 400));
    }
    let conversation = await Conversation.findOne({
        participants: { $all: [senderId, recieverId] }
    })
    if (!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, recieverId]
        })
    }
    const newMessage = await Message.create({
        senderId,
        recieverId,
        message
    })
    if (conversation) {
        conversation.messages.push(newMessage._id)
        await conversation.save()
    }
    // sockit.io

    const socketId = getSocketId(recieverId)
    io.to(socketId).emit("newMessage", newMessage)

    res.status(200).json({
        success: true,
        responseData: {
            newMessage
        }
    })
    //   res.send("hello regsited");
});



export const getMessage = asyncHandler(async (req, res, next) => {

    const myId = req.user._id;
    const otherParticipantId = req.params.otherParticipantId;
    // console.log(myId, otherParticipantId);
    if (!myId || !otherParticipantId) {
        return next(new errorHandler("All feild are required", 400));
    }
    let conversation = await Conversation.findOne({
        participants: { $all: [myId, otherParticipantId] }
    }).populate("messages");

    if (!conversation) {
        return next(new errorHandler("Conversation not found", 404));
    }



    res.status(200).json({
        success: true,
        responseData: conversation
    })

});


// export const sendMessage = asyncHandler(async (req, res, next) => {
//     const myId = req.user._id;
//     const { recieverId, message } = req.body;

//     // 1. Conversation find ya create
//     let conversation = await Conversation.findOne({
//         participants: { $all: [myId, recieverId] }
//     });

//     if (!conversation) {
//         conversation = await Conversation.create({
//             participants: [myId, recieverId]
//         });
//     }

//     // 2. New message create karo
//     const newMessage = await Message.create({
//         senderId: myId,
//         recieverId,
//         message,
//         conversationId: conversation._id
//     });

//     // 3. Push karo message._id conversation ke andar
//     conversation.messages.push(newMessage._id);
//     await conversation.save();

//     res.status(200).json({
//         success: true,
//         responseData: newMessage
//     });
// });




// export const getMessage = asyncHandler(async (req, res, next) => {
//     const myId = req.user._id;
//     const otherParticipantId = req.params.otherParticipantId;

//     let conversation = await Conversation.findOne({
//         participants: { $all: [myId, otherParticipantId] }
//     }).populate("messages");   // 👈 ye ab kaam karega

//     if (!conversation) {
//         return next(new errorHandler("Conversation not found", 404));
//     }

//     res.status(200).json({
//         success: true,
//         responseData: conversation
//     });
// });
