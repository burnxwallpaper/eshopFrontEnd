//import React from 'react';



function doCookieSetup(name = "testName") {
    var expires = new Date();
    //有效時間保存 2 天 2*24*60*60*1000
    expires.setTime(expires.getTime() + 172800000);
    document.cookie = "username=" + name + ";expires=" + expires.toGMTString()
}

function LoginValid(e) {
    e.preventDefault();
    let username = document.getElementById("username").value
    doCookieSetup(username)
    window.history.go(-1)



};


export default LoginValid;