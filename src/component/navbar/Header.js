import React from 'react';
import {
  Link
} from "react-router-dom";
import SuccessNotify from '../Common/SuccessNotify'
import './Header.css';

function Header({ loginStatus, setLogin, updateShopCart }) {

  let prevScrollpos = window.pageYOffset;
  window.onscroll = function () {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById("navbar").style.top = "0";
    } else {
      document.getElementById("navbar").style.top = "-70px";
    }
    prevScrollpos = currentScrollPos;
  }
  function collapse() {
    document.getElementById("navbarSupportedContent").classList.remove("show")
  }
  return (
    <>
      <div className="Header">

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="navbar">
          <Link className="navbar-brand" to={"/"}>ABCShop</Link>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active" onClick={collapse}>
                <Link className="nav-link" to={"/"}>Home</Link>
              </li>
              <li className="nav-item active" onClick={collapse}>
                <Link className="nav-link" to={"/promotion"}>Promotion</Link>
              </li>
              <li className="nav-item active" onClick={collapse}>
                <Link className="nav-link" to="/contact">About us</Link>
              </li>
              {sessionStorage.getItem("username") &&
                <li className="nav-item active" onClick={collapse}>
                  <Link className="nav-link" to="/profile">My Profile</Link>
                </li>}
              {!loginStatus &&
                <li className="nav-item active" onClick={collapse}>
                  <Link className="nav-link" to="/login">Login</Link>
                </li>}

              {loginStatus &&
                <li className="nav-item active" onClick={() => { collapse(); SuccessNotify("Logout successfully") }}>
                  <Link className="nav-link" to="/"
                    onClick={() => {
                      sessionStorage.removeItem("username")
                      sessionStorage.removeItem('shopCart')
                      sessionStorage.removeItem('method')
                      sessionStorage.removeItem('address')
                      updateShopCart(prev => prev === 0 ? ["empty"] : prev.length = 0)
                      document.cookie = 'token=; Max-Age=-99999999;'

                      setLogin(false)
                    }}>Logout</Link>
                </li>}

            </ul>
          </div>

        </nav>


      </div>
    </>
  );
}

export default Header;