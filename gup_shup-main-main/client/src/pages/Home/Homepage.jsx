import React from 'react'
import MessageContainer from './MessageContainer'
import UserSideBar from './UserSidebar'

function Homepage() {
  return (
    <div className='flex'>
      <UserSideBar/>
      <MessageContainer/>
    </div>
  )
}

export default Homepage