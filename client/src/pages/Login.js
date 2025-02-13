import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from '../authentication/useAuth';

import "../css/Login.css";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { setAuth } = useAuth();

    function validateInput(){
        if(!email || !password){
            return false;
        }
        return true;
    }

    async function submit(e) {
        e.preventDefault();
        if(!validateInput()){
            toast.error("Please enter a valid email and password");
            setEmail("");
            setPassword("");
            document.getElementById("login_form").reset();
            return;
        }
        try{
            await fetch(`${process.env.REACT_APP_PUBLIC_BACKEND}/api/users/login`, {
                method: "POST",
                body: JSON.stringify({email, password}),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(res => res.json())
            .then((res) => {
                console.log(res);
                if(res._id == null){
                    setEmail("");
                    setPassword("");
                    document.getElementById("login_form").reset();
                    toast.error("Wrong email or password. Please try again");
                } else {
                    setEmail("");
                    setPassword("");
                    const _id = res._id;
                    const email = res.email;
                    const role = [1];
                    const token = res.token;
                    setAuth({ _id: _id, email: email, role: role, token: token });
                    toast.success("Successfully Logged In!");
                    navigate('/', {state: {id: res.email}});
                }
            })
        } catch (res){
            setEmail("");
            setPassword("");
            document.getElementById("login_form").reset();
            toast.error("Wrong email or password. Please try again");
        }
    }

    return (
        <div className="login">
            <h1>Login</h1>

            <form id="login_form">
                <div className="txt_field">
                    <input 
                        type="email" 
                        onChange={(e)=>{setEmail(e.target.value)}} 
                        placeholder="Email" 
                        value={email}
                        required 
                        className="userinputs"/>
                </div>
                <div className="txt_field">
                    <input type="password" 
                    onChange={(e)=>{setPassword(e.target.value)}} 
                    placeholder="Password" 
                    required 
                    value={password}
                    className="userinputs"/>
                </div>
                
                <input type="submit" onClick={submit} />
            </form>

            <div className="signup_link">
                Not a member? <Link to="/signup" className="link">Signup</Link>
            </div>
        </div>
    );
};

export default Login;