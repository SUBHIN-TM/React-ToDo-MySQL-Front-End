/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState ,useEffect} from "react";
import axios from "axios";
import  BASE_URL  from "../Constants/Links"
import {Link,useNavigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


interface LoginResponse{
    token:string;
    message:string;
}

const LoginForm :React.FC= () => {
    const navigate=useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('')

    useEffect(() => {
        const token=localStorage.getItem('token')
        if(token){
          navigate('/Dashboard');
        }
      },[navigate])

    const inputTyping = (event:React.ChangeEvent<HTMLInputElement>) => {
        const {name,value} =event.target;
       name === 'email' ? setEmail(value) : setPassword(value);
    }

    const submitFunction = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmedEmail=email.trim();
        const trimmedPassword=password.trim();
        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(trimmedEmail)){
            return toast.error("Email should be valid")
        }
        if(trimmedPassword.length<4){
            return toast.error("Password Length should be Min 4 Characters")
        }
        try {
            const response=await axios.post<LoginResponse>(`${BASE_URL}/login`,{
             email,password
            })
            const{token,message}=response.data   
            // console.log(token); 
             toast.success(message)
             localStorage.setItem('token',token)
             navigate('/Dashboard')
        } catch (error: any) {
            toast.error(error.response?.data?.message || "An Error Occured")  //IT WILL SHOW THE MESSGE JSON OF ERROR THINGS
            console.error(error);
        }
    }

    return (
        <>
            <div className="flex  justify-center items-center h-screen ">
                <div className=" sm:flex border-2 border-black shadow-gray-500 shadow-md ">

                    <div className="border items-center text-center sm:flex  border-black text-white bg-black">
                        <h1 className="font-serif text-3xl text-center p-5">TO DO APP</h1>
                    </div>

                    <div className="border p-11 gap-3 bg-gray-300 border-black ">
                        <form action="" method="post" onSubmit={submitFunction} >
                            <div className="flex justify-between py-3">
                                <label htmlFor="email">Email</label>
                                <input type="text" name="email" required id="email"  value={email} onChange={(e) => inputTyping(e)} className="px-2"/>
                            </div>
                            <div className="flex justify-between">
                                <label htmlFor="password">Password</label>
                                <input type="password"   name="password" required id="password" value={password} onChange={(e) => inputTyping(e)} className="px-2" />
                            </div>
                            <div className="flex items-center justify-end py-3 ">
                                <input className="px-3 text-white bg-black hover:bg-white hover:text-black py-1 rounded-sm  font-semibold" type="submit" value="Login" />
                            </div>
                            <div className="">
                                Don't Have an account <span className=" font-semibold underline text-blue-700 ml-1 cursor-pointer"><Link to='/signup'>Register</Link>  </span>
                            </div>
                        </form>
                    </div>
                    <ToastContainer />
                </div>
            </div>

        </>
    )

}

export default LoginForm;