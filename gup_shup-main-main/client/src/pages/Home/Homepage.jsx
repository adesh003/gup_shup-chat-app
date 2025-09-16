import React, { useEffect } from 'react'
import MessageContainer from './MessageContainer'
import UserSideBar from './UserSidebar'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { intializeSocket, setUserOnline } from '../../store/slice/socket/socket.slice'

function Homepage() {

  const { isAuthenticated,userProfile } = useSelector((state) => state.userReducer)

  const dispatch = useDispatch();
  const {socket} = useSelector((state) => state.socketReducer)

  useEffect(() => {
    if (!isAuthenticated) return
    dispatch(intializeSocket(userProfile?._id))
  }, [isAuthenticated])

useEffect(() => {
  if(!socket) return
  socket.on("userOnline", (userOnline) => {
    console.log(userOnline)
    dispatch(setUserOnline(userOnline))
  })
}, [socket])


  return (
    <div className='flex'>
      <UserSideBar />
      <MessageContainer />
    </div>
  )
}

export default Homepage