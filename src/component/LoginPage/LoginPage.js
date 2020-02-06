import React from 'react';
import './LoginPage.scss'
import LoginValid from './LoginValid'

function LoginPage() {


    let url = window.location.protocol + '//' + window.location.host;
    document.cookie && window.location.replace(url)



    return (


        <form className="login-form" onSubmit={LoginValid}>

            <span id="loginLabel">Login</span>
            <div className="form-field">
                <i className="fas fa-user"></i>
                <input type="text" name="username" id="username" className="form-field" pattern="^[a-zA-Z0-9_-]{1,16}$" placeholder=" " required></input>
                <label htmlFor="username">Username</label>
            </div>
            <div className="form-field">
                <i className="fas fa-lock"></i>
                <input type="password" name="password" id="password" className="form-field" placeholder=" " required></input>
                <label htmlFor="password">Password</label>
            </div>
            <button type="submit" value="Login" className="loginBtn">Login</button>
        </form>

    )
}

export default LoginPage;

