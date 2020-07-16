import React, {useEffect, useState} from "react";
import {authInitialProps, signInUser} from "../lib/auth";
import Router from "next/router";

const INITIAL_USER = {
    email: "",
    password: ""
}

const Login = ({auth}) => {
    const [userReg, setUser] = useState(INITIAL_USER);
    const [loading, setLoading] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState("");

    useEffect( () => {
    
    }, [])

    function handleChange(e) {
        const {name, value} = e.target;
        setUser(prevState => ({...prevState, [name]: value}))
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const payload = {...userReg};
            signInUser(payload).then((res) => {
                 window.location.href = '/';
            })
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" onChange={handleChange} value={userReg.email} name={"email"} className="form-control"
                       id="exampleInputEmail1"
                       aria-describedby="emailHelp"/>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" onChange={handleChange} value={userReg.password} name={"password"}
                           className="form-control"
                           id="exampleInputPassword1"/>
                </div>

                <button type="submit" className="btn btn-primary">Login</button>
            </div>
        </form>
    )
}

Login.getInitialProps = authInitialProps();
export default Login;