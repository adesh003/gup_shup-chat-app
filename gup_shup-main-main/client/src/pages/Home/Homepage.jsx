import React from 'react'
import UserSideBar from './UserSideBar'
import MessageContainer from './MessageContainer'

function Homepage() {
  return (
    <div className='flex'>
      <UserSideBar/>
      <MessageContainer/>
    </div>
  )
}

export default Homepage