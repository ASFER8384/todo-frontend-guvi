import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import TrashLogo from '../../assets/trash.svg'
import EditLogo from '../../assets/edit.png'
import TodoContext from '../../context/Todo/TodoContext'
import TaskContext from '../../context/Task/TaskContext'
import SpinnerContext from '../../context/Spinner/SpinnerContext'
import {toast} from 'react-hot-toast'


import "./stylecard.css"



const TodoCard = ({todo, setShowEditTodoModal, todoToEdit}) => {
  const spinnerContext = useContext(SpinnerContext);
  const {isLoading, setIsLoading} = spinnerContext

  const navigate = useNavigate();
  const todoContext = useContext(TodoContext);
  const taskContext = useContext(TaskContext);
  const{setTasks} = taskContext;
  const {deleteTodo} = todoContext;

  const handleClickOnTodo = ()=>{
    navigate(`/${todo._id}/${todo.title}`);
  }

  const handleDelete = (todoId)=>{
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false)
    }, 2000);
    console.log("in todo display useeffect")

    deleteTodo(todoId);
    console.log("first")
    toast.success("TODO DELETED successfully")

  }

  const handleEdit = ()=>{
    
    setShowEditTodoModal(true)
    todoToEdit.current = todo;

  }


  return (
    <div  className='card'>


      <div className='card-btn-del'>
        <button onClick={handleEdit} className=''>
          <img className='card-edit-icon' src={EditLogo} alt="" />
        </button>
        <button onClick={()=>handleDelete(todo._id)} className=''>
          <img className='card-del-icon' src={TrashLogo} alt="" />
        </button>
      </div>

    <div className='card-title' onClick={handleClickOnTodo}>
    
      <div className=''>
        <h1 className=''>
          {
            todo.title.length>15?todo.title.slice(0,14).concat("..."):todo.title
          }
        </h1>
        <div></div>
      </div>


      <div className='hover-card'>
        <h4 className=''>
          Tasks: <span className=''>{todo.tasks.length}</span>
        </h4>
        <h4 className=''>
          In Progress: <span className=''>
            {
              todo.tasks.filter(e=>{
                return e.checked!=true
              }).length
            }
          </span>
        </h4>
        <h4  className='text-[#3aab75] font-bold'>
          Completed: <span className='font-[600]'>
          {
              todo.tasks.filter(e=>{
                return e.checked==true
              }).length
            }
          </span>
        </h4>
    
      </div>

    </div>
    </div>
  )
}

export default TodoCard