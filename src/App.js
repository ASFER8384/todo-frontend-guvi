
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import MainScreen from './components/MainFront/MainScreen'
import toast, { Toaster } from 'react-hot-toast';

import NavBar from './components/NavBar'
import ProfileMain from './components/Profile/ProfileMain'
import SignUp from './components/Signup/SignUp'

import TaskScreen from './components/TaskFront/TaskScreen'
import SpinnerState from './context/Spinner/SpinnerState'
import TaskState from './context/Task/TaskState'

import TodoState from './context/Todo/TodoState'
import { useCookies } from "react-cookie";
import Login from './components/Login/Login';
import UserState from './context/User/UserState';
import Notes from './components/Notes';

const App = () => {


  const location = useLocation();
  const navigate = useNavigate()


  return (
    <>


      <TodoState>
        <TaskState>
          <SpinnerState>
            <UserState>

            <Toaster
              position="top-right"
              reverseOrder={false}
              gutter={8}
              containerClassName=""
              containerStyle={{}}
              toastOptions={{
                className: '',
                duration: 5000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },

                success: {
                  duration: 3000,
                  theme: {
                    primary: 'green',
                    secondary: 'black',
                  },
                },
              }}
            />

            {(location.pathname !== '/signup')&&(location.pathname !== '/login') ? <NavBar /> : (<></>)}
            <div className='flex'>


              <Routes>



                <Route exact path='/' element={<MainScreen />}></Route>
                <Route exact path='/notes' element={<Notes />}></Route>
                <Route exact path='/:todoId/:todoTitle' element={<TaskScreen />}></Route>
                <Route exact path='/profile' element={<ProfileMain />}></Route>
                <Route exact path='/signup' element={<SignUp />}></Route>
                <Route exact path='/login' element={<Login />}></Route>

              </Routes>

            </div>

            </UserState>
          </SpinnerState>
        </TaskState>
      </TodoState>

    

    </>
  )
}

export default App