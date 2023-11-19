import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import TodoContext from '../context/Todo/TodoContext'
import { useCookies } from "react-cookie";
import {toast} from 'react-hot-toast';
import API from '../api';

const Search = () => {
    const [cookies, setCookie] = useCookies();

    const todoContext = useContext(TodoContext)
    const {todos, setTodos, getTodos} = todoContext;
    const [search, setSearch] = useState("")

    const headers = {
        'Content-Type': 'application/json',
        'token': `${cookies.token}`
      }

    const handleOnchange = async(e)=>{
        setSearch(e.target.value)

    }

    const handleSearch = async()=>{
      const res = await axios.get(`${API}/searchTodos`,{
        headers,
        params:{
            search
        }
    })

    if(res.data.todos.length===0){
      toast.error("no such todo or task exists")
      return;
    }
    setTodos(res.data.todos.slice())
    }

    useEffect(()=>{
      if(search.length===0){
        console.log("In")
        getTodos()
        return
        }

        handleSearch()

      
    },[search])
  return (
    <div className='w-full p-5 '>
        <input className='bg-[#FFF] w-[50%] border-2 border-[#21202a]-600 text-[#000] w-[70%] p-3  text-[12px] sm:text-[14px] rounded-xl block mx-auto' placeholder='Search..' name='search' id='search' onChange={handleOnchange} type="text" />
    </div>
  )
}

export default Search