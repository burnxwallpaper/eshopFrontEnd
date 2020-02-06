import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './component/navbar/Header';
import HomePage from './component/HomePage/HomePage';
import ContactPage from './ContactPage/ContactPage';
import CheckOutPage from './component/CheckOutPage/CheckOutPage';
import PageNotFound from './component/PageNotFound';
//import LoginPage from './component/LoginPage/LoginPage';
import ProfilePage from './component/ProfilePage/ProfilePage';
import ProductInfoPage from './component/ProductInfoPage/ProductInfoPage';
import Carousel from './component/PromotionPage/Carousel';
import * as APIfunction from './APIfunction/APIfunction'

function App() {
  let productlist;
  const [loading, setLoading] = useState(true);
  const [searchResult, searching] = useState([])
  const [filteredResult, filter] = useState([])
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
  const [displayNoResult, noResult] = useState(true)
  const [currentPage, direcToPage] = useState(1)


  useEffect(() => {
    if (shopCart.length === 0) return;
    sessionStorage.setItem("key", JSON.stringify(shopCart));
    console.log("session saved")
  }, [shopCart])


  function handleChange(e) {
    let temp = e.target.value;
    setValue(temp)
    e.preventDefault()

  }

  function search(e) {
    let result = searchResult.filter(product => product.name.includes(value));
    //result.length > 0 ? noResult(true) : noResult(false);
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


  return (
    <div className="App">
      <Header />
      <div id="toastBar"></div>
      <Switch>
        <Route exact path="/" render={(props) =>
          <HomePage
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

          />} />

        <Route path="/contact" component={ContactPage} />
        <Route path="/checkout" render={(props) =>
          <CheckOutPage
            {...props}
            products={searchResult}
            shopCart={shopCart}
            updateShopCart={updateShopCart}

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
        <Route component={PageNotFound} />
      </Switch>


    </div>

  )
}

export default App;
