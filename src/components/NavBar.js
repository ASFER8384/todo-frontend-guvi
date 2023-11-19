import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from "react-cookie";
import UserContext from '../context/User/UserContext'
import logOut from '../assets/logout.png'
import { toast } from 'react-hot-toast'

const NavBar = () => {
    const userContext = useContext(UserContext);
    const {getUser,user} = userContext;
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate()

  

    useEffect(() => {
      
        getUser()
    }, [cookies.token])
    
  return (
    <>
    <nav className='flex justify-between items-center h-[10vh] px-2 sm:px-10 text-[#bcbcbf] bg-[#FFF] '>
       
        <div>
            <h1 className='text-[14px] sm:text-[1.3rem] font-bold text-black sm-display-none'>
                GUVIDO
            </h1>
        </div>
        {/* <div className='flex gap-5'>
            <h1 className='text-[14px] sm:text-[1.3rem] font-bold text-black cursor-pointer'>
                 <Link to='/notes'>Notes</Link>
            </h1>
            <h1 className='text-[14px] sm:text-[1.3rem] font-bold text-black cursor-pointer'>
                <Link to='/'>Todos</Link>
            </h1>
        </div> */}
        <div className='flex gap-8 items-center'>
           <Link to='/profile'>
          <div className='flex gap-2'>
                
          <h4 className='	border-solid border-2 border-black-600  text-black sm:text-base text-[14px]  px-5 rounded-xl duration-200 ease-in-out  font-bold'>
               { user && user.name}
            </h4>
          </div>
           </Link>

           <button onClick={()=>{
            setCookie('token','')
            navigate('/signup')
            toast.success("Logged Out")
            }} className='bg-[#87898b] text-black rounded-xl py-1 px-2'>
            <img className='h-[20px] ' src={logOut} alt="" />
           </button>
        </div>
    </nav>
    </>
  )
}

export default NavBar