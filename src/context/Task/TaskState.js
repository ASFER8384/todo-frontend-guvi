import axios from "axios";
import { useState } from "react";
import TodoContext from "./TaskContext";
import { useCookies } from "react-cookie";
import API from "../../api";

const TaskState = (props)=>{    
    const [cookies, setCookie] = useCookies();

    const [tasks, setTasks] = useState([]);

    const headers = {
        'Content-Type': 'application/json',
        'token': cookies.token
      }

    const getTasks = async(todoId)=>{
        const res = await axios.get(`${API}/getTasks/${todoId}`,{
            headers
        });
        setTasks(res.data.tasks);
    }

    const addTask = async(todoId, task)=>{
        const res = await axios.put(`${API}/addTask/${todoId}`, {
            main: task
        },{
            headers
        });
        const newTasks = res.data.todo.tasks.slice();
        setTasks(newTasks)
    }

    const checkTask = async(todoId, taskId)=>{
        console.log(headers)
        const res = await axios.put(`${API}/checkTask/${todoId}/${taskId}`,{},{
            headers
        })
        console.log(res);
        const newTasks = res.data.todo.tasks.slice();
        setTasks(newTasks);
    }

    const editTask = async(todoId, taskId, editedPart)=>{
        console.log(cookies.token)
        const res = await axios.put(`${API}/editTask/${todoId}/${taskId}`,editedPart,{
            headers
        })
        console.log(res);
        const newTasks = res.data.todo.tasks.slice();
        setTasks(newTasks);
    }

    const deleteTask = async(todoId, taskId)=>{
        const res = await axios.put(`${API}/deleteTask/${todoId}/${taskId}`,{},
        {
            headers
        }
        )
        const newTasks = res.data.todo.tasks.slice();
        setTasks(newTasks)
    }


    return(

        <TodoContext.Provider value={{getTasks, tasks, addTask, checkTask, editTask, deleteTask}}>
            {
                props.children
            }
        </TodoContext.Provider>
    )
}

export default TaskState;