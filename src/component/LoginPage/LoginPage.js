import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import './LoginPage.scss'
import LoginValid from './LoginValid'
import SuccessNotify from '../Common/SuccessNotify'



function LoginPage({ setLogin }) {
    const [loginFail, setLoginFail] = useState()

    //let url = window.location.protocol + '//' + window.location.host;
    //document.cookie && window.location.replace(url)

    let history = useHistory();
    return (


        <>
            <form className="login-form" onSubmit={async (e) => {
                let res = await LoginValid(e)
                if (res) {

                    setLogin(true)
                    //setLoginFail(false)
                    SuccessNotify("Wellcome back, " + res + "!")
                    history.push("/")
                } else {

                    setLoginFail(true)
                    document.getElementById("invalidAuth").classList.remove("wrongAuth")
                    void (document.getElementById("invalidAuth").offsetHeight)
                    document.getElementById("invalidAuth").classList.add("wrongAuth")
                }


            }}>

                <span id="loginLabel">Login</span>
                <span id="loadingLogin"></span>
                <span className="tooltipac" title="username+pw= aaa+aaa or bbb+bbb" >Test account info</span>
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
                {loginFail && <div id="invalidAuth">Incorrect username or password</div>}

            </form>

        </>

    )
}

export default LoginPage;

