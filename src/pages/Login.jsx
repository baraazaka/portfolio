import { useState } from "react";
import { use } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login(){
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const[error,setError]=useState("");
    const navigate=useNavigate();

async function handleLogin(e) {
        e.preventDefault();
        try{
            const response=await api.post("/auth/Login",{email,password});
            localStorage.setItem("token", response.data.token);
            navigate("/")

        }catch(error){
            console.log(error);
            if(error.response){
                setError(error.response.data.error);
            }else{
                setError("Login Failed");
            }
        }

    
}

    return(
        
        <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <button type="submit"> Login</button>
        </form>
        );
}
export default Login;