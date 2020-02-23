import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './component/navbar/Header';
import Footer from './component/Footer/Footer';
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

function RouteCongig({
    dataPerPage, filteredResult, pagination, direcToPage, currentPage, searchResult, shopCart, updateShopCart, search, handleChange,
    displayNoResult, products, value, setValue, loading, setLoading, loginStatus, setLogin, paymentStep, setPaymentStep,...props
}) {
    let returnHomePage = function (props) {
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
    }
    return (
        <>
        <div className="App">
            <Header loginStatus={loginStatus} setLogin={setLogin} updateShopCart={updateShopCart} />
            <div id="toastBar"></div>
            <Switch>
                <Route exact path="/" render={() => returnHomePage()}
                />

                <Route path="/contact" component={ContactPage} />

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
                <Route path="/login" render={(props) =>
                    loginStatus ?
                        <Redirect
                            to={{
                                pathname: "/",

                            }}
                        /> :
                        <LoginPage
                            {...props}
                            loginStatus={loginStatus}
                            setLogin={setLogin}

                        />
                } />

                {/*redirect to login if no login*/}
                {(!loginStatus) && <Redirect to={{pathname: "/login",}}/>}

                <Route path="/profile" render={() =><ProfilePage/>} />

                {/*redirect to homepage for empty shopcart*/}             
                <Route  exact path="/checkout" render={(props) =>
                sessionStorage.getItem("shopCart")?
                    <CheckOutPage
                        {...props}
                        products={searchResult}
                        shopCart={shopCart}
                        updateShopCart={updateShopCart}
                        setPaymentStep={setPaymentStep}

                    />:<Redirect to={{pathname: "/"}}/>} />
                <Route path="/checkout/transport" render={(props) =>
                sessionStorage.getItem("shopCart")?
                    <TransportPage
                            {...props}
                            setPaymentStep={setPaymentStep}
                />:<Redirect to={{pathname: "/"}}/> } />
                
                {/* prevent direct access to /payment and /checkout */}    
              
                <Route path="/confirm" render={(props) =>
            sessionStorage.getItem("shopCart")&&sessionStorage.getItem("method")&&sessionStorage.getItem("address")?
                        <SummaryPage
                            {...props}
                            products={searchResult}
                            shopCart={shopCart}
                            updateShopCart={updateShopCart}
                            setPaymentStep={setPaymentStep}

                        /> :<Redirect to={{pathname: "/"}}/>
                   } 
                        />} />
               
                <Route path="/payment" render={(props) =>
sessionStorage.getItem("shopCart")&&sessionStorage.getItem("method")&&sessionStorage.getItem("address")?
                    <PaymentPage
                        {...props}
                        shopCart={shopCart}
                        setPaymentStep={setPaymentStep}
                    />:<Redirect to={{pathname: "/"}}/>
                } />
                <Route path="/completed" render={(props) =>
                paymentStep > 4 ?
                    <CompletedPage
                        {...props}
                        setPaymentStep={setPaymentStep}
                    />:
                    <Redirect to={{pathname: "/checkout",}}/>
                } />
                <Route component={PageNotFound} />
            </Switch>
            


        </div>
        <Footer />
        </>

    )

}

export default RouteCongig;