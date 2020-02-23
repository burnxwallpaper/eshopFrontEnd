import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './component/navbar/Header';
import HomePage from './component/HomePage/HomePage';
import ContactPage from './ContactPage/ContactPage';
import CheckOutPage from './component/CheckOutPage/CheckOutPage';
import SummaryPage from './component/SummaryPage/SummaryPage'
import TransportPage from './component/TransportPage/TransportPage'
import PaymentPage from './component/PaymentPage/PaymentPage'
import PageNotFound from './component/PageNotFound';
import LoginPage from './component/LoginPage/LoginPage';
import ProfilePage from './component/ProfilePage/ProfilePage';
import ProductInfoPage from './component/ProductInfoPage/ProductInfoPage';
import Carousel from './component/PromotionPage/Carousel';
import * as APIfunction from './APIfunction/APIfunction'
import CompletedPage from './component/CompletedPage/CompletedPage'
import SuccessNotify from './component/Common/SuccessNotify'
import RouteConfig from './RouteConfig'

function App() {

  let productlist;
  const [loading, setLoading] = useState(true);

  const [searchResult, searching] = useState([])
  const [filteredResult, filter] = useState([])
  const [paymentStep, setPaymentStep] = useState([])
  const [loginStatus, setLogin] = useState(false)
  if (sessionStorage.getItem("username") && loginStatus === false) { setLogin(true) }
  if (APIfunction.getCookie("token")) {
    (async () => {
      let account = await APIfunction.autoLogin()
      if (account) {
        sessionStorage.setItem("username", account.username);
        setLogin(true)
      }
    })()
  }
  async function getProducts() {
    if (loading) {
      productlist = await APIfunction.getRecord().then(products => { return products });
      if (productlist) { setLoading(false) }
      searching(productlist)
    }
  }
  getProducts()
  console.log("rerender")
  const [shopCart, updateShopCart] = useState([]);
  const [value, setValue] = useState()
  const [displayNoResult, noResult] = useState(false)
  const [currentPage, direcToPage] = useState(1)

  useEffect(() => {
    if (shopCart.length === 0) return;
    sessionStorage.setItem("shopCart", JSON.stringify(shopCart));
    console.log("session saved")
  }, [shopCart])
  if (sessionStorage.getItem("shopCart") && shopCart.length === 0) {
    updateShopCart(JSON.parse(sessionStorage.getItem("shopCart")))
  }

  function handleChange(e) {
    let temp = e.target.value;
    setValue(temp)
    e.preventDefault()

  }

  function search(e) {
    let result = searchResult.filter(product => product.name.includes(value.toLowerCase()));
    result.length > 0 ? noResult(false) : noResult(true);
    result.length > 0 ? filter(result) : filter(searchResult);
    direcToPage(1);
    e.preventDefault();
  }
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
  /*let returnHomePage = function (props) {
    return <HomePage
      {...props}
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
      loginStatus={loginStatus}

    />
  }*/

  return (<RouteConfig dataPerPage={8}
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

/*return (
  <div className="App">
    <Header />
    <div id="toastBar"></div>
    <Switch>
      <Route exact path="/" render={(props) => returnHomePage()}
      />

      <Route path="/contact" component={ContactPage} />
      <Route path="/checkout" render={(props) =>
        <CheckOutPage
          {...props}
          products={searchResult}
          shopCart={shopCart}
          updateShopCart={updateShopCart}

        />} />

      <Route path="/login" render={(props) =>
        <LoginPage
          {...props}
          loginStatus={loginStatus}
          setLogin={setLogin}

        />} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/promotion" component={Carousel} />
      <Route path="/product/:slug" render={(props) =>
        <ProductInfoPage

          {...props}
          shopCart={shopCart}
          updateShopCart={updateShopCart}
          handleChange={handleChange}
          products={searchResult}
          value={value}
          setValue={setValue}
          loading={loading}
          setLoading={setLoading}
        />} />
      <Route path="/confirm" render={(props) =>
        <SummaryPage
          {...props}
          products={searchResult}
          shopCart={shopCart}
          updateShopCart={updateShopCart}

        />} />
      <Route path="/transport" render={(props) =>
        <TransportPage
          {...props}
        />} />
      <Route path="/payment" render={(props) =>
        <PaymentPage
          {...props}
          shopCart={shopCart}
        />} />
      <Route path="/completed" render={(props) =>
        <CompletedPage
          {...props}
        />} />
      <Route component={PageNotFound} />
    </Switch>


  </div>

)
}*/

export default App;
