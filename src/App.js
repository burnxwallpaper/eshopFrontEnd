import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import * as APIfunction from './APIfunction/APIfunction'
import RouteConfig from './RouteConfig'


function App() {

  const [loading, setLoading] = useState(true);
  const [searchResult, searching] = useState([])
  const [filteredResult, filter] = useState([])
  const [paymentStep, setPaymentStep] = useState([])
  const [loginStatus, setLogin] = useState(false)
  const [shopCart, updateShopCart] = useState([]);
  const [value, setValue] = useState()
  const [displayNoResult, noResult] = useState(false)
  const [currentPage, direcToPage] = useState(1)

  //remain shopcart status even refresh page & add to session storage when updated
  useEffect(() => {
    if (shopCart.length === 0) return;
    sessionStorage.setItem("shopCart", JSON.stringify(shopCart));
    console.log("shopCart saved in session")
  }, [shopCart])
  //retrieve shopCart saved in session
  if (sessionStorage.getItem("shopCart") && shopCart.length === 0) {
    console.log("retrieve shopCart saved in session")
    updateShopCart(JSON.parse(sessionStorage.getItem("shopCart")))
  }

  //check auto login
  const [loginProcessCompleted, setLoginProcessCompleted] = useState(false)
  async function autoLogin() {

    if (loginStatus) return true;
    if (APIfunction.getCookie("token")) {
      let account = await APIfunction.autoLogin()
      if (account) {
        sessionStorage.setItem("username", account.username);
        console.log("auto login success")
        setLogin(true)
        setLoginProcessCompleted(true)
        return true
      } else {
        console.log("invalid token,auto login fail")
        setLoginProcessCompleted(true)
        return false
      }

    } else {
      console.log("token not found,auto login fail")
      return false
    }
  }
  useEffect(() => {
    autoLogin()
  }, [loginStatus])
  //load productlist after loading
  useEffect(() => {
    async function getProducts() {
      let productlist;

      productlist = await APIfunction.getRecord().then(products => { return products });
      if (productlist) { setLoading(false) }
      searching(productlist)
      console.log("productlist get")

    }
    getProducts()
  }, [])

  // check rerender
  console.log("rerender")



  //change quantity
  function handleChange(e) {
    let temp = e.target.value;
    setValue(temp)
    e.preventDefault()

  }

  //search bar function
  function search(e) {
    let result = searchResult.filter(product => product.name.includes(value.toLowerCase()));
    result.length > 0 ? noResult(false) : noResult(true);
    result.length > 0 ? filter(result) : filter(searchResult);
    direcToPage(1);
    e.preventDefault();
  }

  //pagination based on filtered result
  function pagination(dataPerPage = 8) {

    const minData = (currentPage * dataPerPage) - dataPerPage + 1;
    const maxData = (currentPage * dataPerPage);
    const tempData = [];
    (filteredResult.length > 0 ? filteredResult : searchResult).forEach((item, index) => {
      const num = index + 1;
      if (num >= minData && num <= maxData) {
        tempData.push(item);
      }
    });

    return tempData
  }

  return (
    <RouteConfig
      loginProcessCompleted={loginProcessCompleted}
      autoLogin={autoLogin}
      dataPerPage={8}
      filteredResult={filteredResult}
      pagination={pagination}
      direcToPage={direcToPage}
      currentPage={currentPage}
      searchResult={searchResult}
      shopCart={shopCart}
      updateShopCart={updateShopCart}
      search={search}
      handleChange={handleChange}
      displayNoResult={displayNoResult}
      products={searchResult}
      value={value}
      setValue={setValue}
      loading={loading}
      setLoading={setLoading}
      setLogin={setLogin}
      loginStatus={loginStatus}
      paymentStep={paymentStep}
      setPaymentStep={setPaymentStep} />)
}



export default App;
