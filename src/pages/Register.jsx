import React from "react";
import api from "../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Register(){
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error,SetError]=useState("");
    const navigate=useNavigate();
   async function handleRegister(e) {
    e.preventDefault();

    try {
        const response = await api.post("/auth/register", {
            name,
            email,
            password
        });

        console.log(response.data);
        navigate("/Login");

    } catch (error) {
        if(error.response){
            SetError(error.response.data);
        }else{
            setError("Registration failed");
        }
    }
}
    return (
        <form onSubmit={handleRegister}>
            <h1>Register</h1>

            <input type="text" placeholder="Name"value={name} onChange={(e) => setName(e.target.value)}/>

            <input type="email"placeholder="Email"value={email} onChange={(e) => setEmail(e.target.value)}/>

            <input type="password" placeholder="Password"value={password}onChange={(e) => setPassword(e.target.value)} />

            
        <button type="submit">Register</button>
        </form>
    );
}
export default Register;