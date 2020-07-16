import React, {useState} from "react";
import {signUpUser} from "../lib/auth";
import Layout from "../components/_App/Layout";

const INITIAL_USER = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
}

export default function Register() {
    const [user, setUser] = useState(INITIAL_USER);
    const [loading, setLoading] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        await signUpUser(user).then((user) => {
            console.log(user);
            setUser(INITIAL_USER);
        })
    }

    function handleChange(e) {
        const {name, value} = e.target;
        setUser(prevState => ({...prevState, [name]: value}))
    }

    return (

        <Layout>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nameInput">Name:</label>
                    <input type="text" onChange={handleChange} value={user.name} className="form-control"
                           name={"name"} id="nameInput"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" name={"email"} onChange={handleChange} value={user.email} className="form-control"
                           id={"exampleInputEmail1"}/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword">Password</label>
                    <input type="password" onChange={handleChange} value={user.password} name={"password"}
                           className="form-control" id="inputPassword"/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputPasswordConfirmed">Confirm Password</label>
                    <input type="password" onChange={handleChange} value={user.password_confirmation}
                           name={"password_confirmation"} className="form-control" id="inputPasswordConfirmed"/>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Create</button>
                </div>
            </form>
        </Layout>
    )
}