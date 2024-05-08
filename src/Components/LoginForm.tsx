import React,{useState} from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const LoginForm =()=>{
    const [email,setEmail]=useState<string>('');
    const [password,setPassword]=useState<string>('')

    const inputTyping = (event)=>{
        event.target.name=='email' ? setEmail(event.target.value) : setPassword(event.target.value)
    }

   const submitFunction =async (event)=>{
    // event.preventDefault();
    alert(email)
   }

    return(
        <>
        <div>
            <form action="" onSubmit={submitFunction}>
             <label htmlFor="email">Email</label>
             <input type="text" name="email" id="" value={email} onChange={(e)=> inputTyping(e)} />
             <label htmlFor="password">Password</label>
             <input type="password" name="password" id="" value={password} onChange={(e)=> inputTyping(e)}  />
             <input type="submit" value="Login" />
            </form>
        </div>
        <div>
            <p>Dont Have an Account <span>Signup Here</span></p>
        </div>
        <ToastContainer />
        </>
    )

}



export default LoginForm;