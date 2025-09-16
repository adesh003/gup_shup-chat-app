import React, { useEffect } from 'react'
import MessageContainer from './MessageContainer'
import UserSideBar from './UserSidebar'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { intializeSocket, setUserOnline } from '../../store/slice/socket/socket.slice'
import { setNewMessages } from '../../store/slice/message/message.slice'

function Homepage() {

  const { isAuthenticated, userProfile } = useSelector((state) => state.userReducer)

  const dispatch = useDispatch();
  const { socket,userOnline } = useSelector((state) => state.socketReducer)
  
  useEffect(() => {
    if (!isAuthenticated) return
    dispatch(intializeSocket(userProfile?._id))
  }, [isAuthenticated])

  useEffect(() => {
    if (!socket) return
    socket.on("userOnline", (userOnline) => {
      dispatch(setUserOnline(userOnline))
    })
    socket.on("newMessage", (newMessage) => {
      dispatch(setNewMessages(newMessage))
    })
    return () => {
      socket.close()
    }
  }, [socket])


  return (
    <div className='flex'>
      <UserSideBar />
      <MessageContainer />
    </div>
  )
}

export default Homepage