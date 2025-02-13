import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import useAuth from "../authentication/useAuth"

import "../css/Signup.css";

function Signup() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");

    const navigate = useNavigate();
    const { setAuth } = useAuth();

    async function submit(e) {
        e.preventDefault();
        try{
            await fetch(`${process.env.REACT_APP_PUBLIC_BACKEND}/api/users/register`, {
                method: "POST",
                headers: {'Access-Control-Allow-Origin':'*',
                    "Content-Type": "application/json"},
                body: JSON.stringify({
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    password: password
                })
            })
            .then(res => res.json())
            .then((res) => {
                console.log(res);
                if(res._id == null){
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setPassword("");
                    toast.error("Sign Up Failed");
                } else {
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setPassword("");
                    const _id = res._id;
                    const email = res.email;
                    const role = [1];
                    const token = res.token;
                    setAuth({ _id, email, role, token });
                    toast.success("Successfully Signed Up!");
                    navigate('/', {state: {user: res}});
                }
            })
        } catch {

        }
    }

    return (
        <div className="signup">
            <h1>Sign Up</h1>

            <form>
                <div className="txt_field">
                    <input type="text" onChange={(e)=>{setFirstName(e.target.value)}} placeholder="First Name" className="userinputs" />
                </div>
                <div className="txt_field">
                    <input type="text" onChange={(e)=>{setLastName(e.target.value)}} placeholder="Last Name" className="userinputs" />
                </div>
                <div className="txt_field">
                    <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" className="userinputs" />
                </div>
                <div className="txt_field">
                    <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" className="userinputs" />
                </div>

                <input type="submit" onClick={submit} />
            </form>

            <div className="login_link">
                Already have an account? <Link to="/login" className="link">Login</Link>
            </div>
            
        </div>
    );
};

export default Signup;