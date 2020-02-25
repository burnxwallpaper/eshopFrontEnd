import React from 'react';
import * as APIfunction from '../../APIfunction/APIfunction'
import Spinner from '../Common/Spinner'
import freeze from '../Common/freeze'
import { render } from "react-dom";

function doCookieSetup(name = "testName") {
    var expires = new Date();
    //有效時間保存 2 天 2*24*60*60*1000
    expires.setTime(expires.getTime() + 172800000);
    document.cookie = "token=" + name + ";expires=" + expires.toGMTString()
}

async function LoginValid(e) {
    e.preventDefault();
    freeze()
    let temp = document.createElement("div");
    let location = document.getElementById("loadingLogin").appendChild(temp);
    let removeNotify = () => location.parentNode.removeChild(location);
    render((<div>{<Spinner />}</div>), location);
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value
    let account = { username: username, password: password }
    let res = await APIfunction.login(account)
    if (res) {
        freeze(false)
        removeNotify()
    }
    //Processing(APIfunction.login(account))
    if (res.success === false) {
        freeze(false)
    }
    sessionStorage.setItem("username", res.username)
    doCookieSetup(res.token)
    return res.username
};


export default LoginValid;