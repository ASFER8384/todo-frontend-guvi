import React, { useContext, useEffect, useState } from 'react'
import TodoCard from './TodoCard'
import addLogo from '../../assets/add-btn.svg'
import TodoContext from '../../context/Todo/TodoContext'
import Spinner from '../Spinner'
import SpinnerContext from '../../context/Spinner/SpinnerContext'
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from 'react-router-dom'
import Search from '../Search'

import "./style.css"

const TodoDisplay = ({setShowTodoModal, setShowEditTodoModal, todoToEdit}) => {
  const todoContext = useContext(TodoContext);
  const spinnerContext = useContext(SpinnerContext);
  const {getTodos, todos} = todoContext;
  const navigate = useNavigate()
  const {isLoading, setIsLoading} = spinnerContext
  const [cookies, setCookie, cookieState] = useCookies();
  const location = useLocation()
  

  useEffect(() => {
    if(!cookies.token){
      console.log("first")
      navigate('/signup')
    }
    console.log("In todo display")

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false)
    }, 500);
    console.log("in todo display useeffect")
    getTodos();

  }, [cookies.token])
  

  const handleAdd = ()=>{
    setShowTodoModal(true);
    
  }



  return (
    <>

   
    <div className='tododisplay p-4'>


      <Search/>

            <div className='todocarddisplay'>
            {
              isLoading  || todos?.length===0 ?(<div className=''>
            {todos?.length===0 && <h1 className=''>No todos</h1>}

              <Spinner isLoading={true} />
            </div>):todos.map(element=>{
                return(
                <TodoCard key={element._id} todo={element} setShowEditTodoModal={setShowEditTodoModal} todoToEdit={todoToEdit} />
                )
              })
            }
        </div>
          


        <button onClick={handleAdd} className='taskaddbtn'>
          <img className='' src={addLogo} alt="" />
        </button>      

    </div>
    </>
  )
}

export default TodoDisplay