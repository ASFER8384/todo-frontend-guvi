import axios from "axios";
import { useState } from "react";
import TodoContext from "./TodoContext";
import { useCookies } from "react-cookie";
import API from "../../api";

const TodoState = (props)=>{    
    const [cookies, setCookie] = useCookies();


    const [todos, setTodos] = useState([]);
    const headers = {
        'Content-Type': 'application/json',
        'token': cookies.token
      }

    const getTodos = async()=>{
        const res = await axios.get(`${API}/getTodos`,{
            headers
        });
        console.log(res.data.todos);
        setTodos(res.data.todos) 
    }

    const createTodo = async(title, color)=>{

        

        const res = await axios.post(`${API}/createTodo`,{
            title,
            color
        },
        {
            headers
        }
        )
        setTodos(todos.concat(res.data.todo));
    }


    const deleteTodo = async(todoId)=>{
        const res = await axios.delete(`${API}/deleteTodo/${todoId}`,{
            headers
        });
        console.log(res)
        setTodos(todos.filter(e=>e._id!==res.data.deletedTodo._id));
    }


    const editTodo = async(todoId,editedPart)=>{
        const res = await axios.put(`${API}/editTodo/${todoId}`,editedPart,{
            headers
        });
        const index = todos.indexOf(todos.filter(e=>e._id===todoId)[0])
        const newTodos = todos.slice();
        newTodos.splice(index,1,res.data.editedTodo);

        setTodos(newTodos);

    }

    return(

        <TodoContext.Provider value={{getTodos,setTodos, todos, createTodo, deleteTodo, editTodo, setCookie, cookies}}>
            {
                props.children
            }
        </TodoContext.Provider>
    )
}

export default TodoState;