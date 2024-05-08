import { useEffect } from "react";
import axios from "axios";
import  BASE_URL  from "../Constants/Links"
import {Link,useNavigate} from "react-router-dom";

const Dashboard=()=>{

    useEffect(() => {
        dashboardGet();
      }, []);

      const navigate=useNavigate();

      const dashboardGet =async ()=>{
        try {
            const response =await axios.get(`${BASE_URL}/dashboard`)

        } catch (Error) {
            if (Error.response.status === 401 ||Error.response.status === 403 ) {
                logout() //IF ANY ERROR MISMATCH IN TOKEN IT CLEAR AND USER SHOULD BE RELOGINED
            }
            console.error(Error);       
        } 
      }

      const logout = async () => {
        localStorage.removeItem("token");
        axios.defaults.headers.common["Authorization"] = null;
        navigate("/");
      };
    

    return(
        <>
        <h1>
            dashboard
            <button onClick={logout}>LOGOUT</button>
        </h1>
        </>
    )
}

export default Dashboard;