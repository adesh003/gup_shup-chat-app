
import './App.css'
import { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { getOtherUsersThunk, getUserProfileThunk } from './store/slice/user/userThunk'
import { useEffect } from 'react'

function App() {

const dispatch = useDispatch()

useEffect(() => {
  dispatch(getUserProfileThunk())
  dispatch(getOtherUsersThunk())
}, [])
  return (
    <> 
 <Toaster
        position="top-center"
        reverseOrder={false}
      />
   </>
  )
}

export default App
