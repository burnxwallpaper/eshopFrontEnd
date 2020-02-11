import React from 'react';


import './Header.css';

function Header() {

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

  return (
    <>
      <div className="Header">

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="navbar">
          <a className="navbar-brand" href="/">ABCShop</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/promotion">Promotion <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/contact">About us</a>
              </li>
              {document.cookie &&
                <li className="nav-item ">
                  <a className="nav-link" href="/profile">{document.cookie ? document.cookie.substring(9) : "My Profile"}</a>
                </li>}
              {!document.cookie &&
                <li className="nav-item ">
                  <a className="nav-link" href="/login">Login</a>
                </li>}

              {document.cookie &&
                <li className="nav-item ">
                  <a className="nav-link" href="/"
                    onClick={() => document.cookie = 'username=; Max-Age=-99999999;'}>Logout</a>
                </li>}

            </ul>
          </div>

        </nav>


      </div>
    </>
  );
}

export default Header;