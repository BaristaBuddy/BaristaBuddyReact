import React, { useEffect } from 'react';
import useAuth from '../../contexts/auth';
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";

const Login = () => {

    const { user, login, logout} = useAuth();
    let history = useHistory();
    const handleSubmit = e => {
        console.log("logging in");
        e.preventDefault();

        const { username, password } = e.target.elements;

       const result = login(username.value, password.value);
       if (result) history.push("/stores");
    }

    const logoutSubmit = e => {
        console.log("logging out use");
        e.preventDefault();
        logout();
        history.push("/")
        
    }

    console.log(user);
    useEffect(()=>{
        if (user) history.push("/stores");
    },[])

    
    if (user) {
        return (
            <div className="login">
                <h3>Welcome back, {user.username.split(" ")[0]}!</h3>
                <form onSubmit={logoutSubmit}>
                    <Button type="submit" >Log Out</Button>
                </form>
            </div>)
    }

    return (
        <form onSubmit={handleSubmit} className="login">
            <label>
              Email
            <input placeholder="Username" name="username" />
            </label>
            <label>
              password
            <input placeholder="Password" type="password" name="password" />
            </label>
            <Button type="submit">Login</Button>
        </form>
    )
}

export default Login;