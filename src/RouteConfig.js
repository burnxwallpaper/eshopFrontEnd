import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import Spinner from './component/Common/Spinner'
import Header from './component/navbar/Header';
import Footer from './component/Footer/Footer';
import HomePage from './component/HomePage/HomePage';
import ProductInfoPage from './component/ProductInfoPage/ProductInfoPage';
import UnauthenticatedPage from './component/UnauthenticatedPage/UnauthenticatedPage'

//***below import are loadable component
//import ContactPage from './ContactPage/ContactPage';
//import CheckOutPage from './component/CheckOutPage/CheckOutPage';
//import SummaryPage from './component/SummaryPage/SummaryPage'
//import TransportPage from './component/TransportPage/TransportPage'
//import PaymentPage from './component/PaymentPage/PaymentPage'
//import PageNotFound from './component/PageNotFound';
//import LoginPage from './component/LoginPage/LoginPage';
//import ProfilePage from './component/ProfilePage/ProfilePage';
//import Carousel from './component/PromotionPage/Carousel';
//import CompletedPage from './component/CompletedPage/CompletedPage'
//useless
//import * as APIfunction from './APIfunction/APIfunction'
//import SuccessNotify from './component/Common/SuccessNotify'  

function RouteCongig({ autoLogin, loginProcessCompleted,
    dataPerPage, filteredResult, pagination, direcToPage, currentPage, searchResult, shopCart, updateShopCart, search, handleChange,
    displayNoResult, products, value, setValue, loading, setLoading, loginStatus, setLogin, paymentStep, setPaymentStep, ...props
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
    const LoadableContactPage = Loadable({
        loader: () => import('./ContactPage/ContactPage'),
        loading: Spinner,
    });
    const LoadablePromotionPage = Loadable({
        loader: () => import('./component/PromotionPage/Carousel'),
        loading: Spinner,
    });
    const LoadableLoginPage = Loadable({
        loader: () => import('./component/LoginPage/LoginPage'),
        loading: Spinner,
    });
    const LoadableProfilePage = Loadable({
        loader: () => import('./component/ProfilePage/ProfilePage'),
        loading: Spinner,
    });
    const LoadableCheckOutPage = Loadable({
        loader: () => import('./component/CheckOutPage/CheckOutPage'),
        loading: Spinner,
    });
    const LoadableSummaryPage = Loadable({
        loader: () => import('./component/SummaryPage/SummaryPage'),
        loading: Spinner,
    });
    const LoadableTransportPage = Loadable({
        loader: () => import('./component/TransportPage/TransportPage'),
        loading: Spinner,
    });
    const LoadablePaymentPage = Loadable({
        loader: () => import('./component/PaymentPage/PaymentPage'),
        loading: Spinner,
    });
    const LoadablePageNotFound = Loadable({
        loader: () => import('./component/PageNotFound'),
        loading: Spinner,
    });
    const LoadableCompletedPage = Loadable({
        loader: () => import('./component/CompletedPage/CompletedPage'),
        loading: Spinner,
    });

    return (
        <>
            <div className="App">
                <Header loginStatus={loginStatus} setLogin={setLogin} updateShopCart={updateShopCart} />
                <div id="toastBar"></div>
                <Switch>
                    <Route exact path="/" render={() => returnHomePage(props)} />
                    <Route path="/unauthenticated" component={UnauthenticatedPage} />
                    <Route path="/contact" component={LoadableContactPage} />

                    <Route path="/promotion" component={LoadablePromotionPage} />
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
                            <LoadableLoginPage
                                {...props}
                                loginStatus={loginStatus}
                                setLogin={setLogin}

                            />
                    } />

                    <Route path="/profile" render={(props) =>
                        <LoadableProfilePage
                            {...props}
                            loginStatus={loginStatus} />} />
                    {/*redirect to login if no login*/}
                    {/*(!loginStatus) && <Redirect to={{ pathname: "/login", }} />*/}

                    {!loginProcessCompleted && <Spinner />}
                    {(!loginStatus) && loginProcessCompleted && <Redirect to={{ pathname: "/login", }} />}

                    <Route exact path="/checkout" render={(props) =>

                        <LoadableCheckOutPage
                            {...props}
                            products={searchResult}
                            shopCart={shopCart}
                            updateShopCart={updateShopCart}
                            setPaymentStep={setPaymentStep}

                        />} />
                    <Route path="/checkout/transport" render={(props) =>
                        Object.keys(shopCart).length > 0 ?
                            <LoadableTransportPage
                                {...props}
                                setPaymentStep={setPaymentStep}
                            /> : <Redirect to={{ pathname: "/" }} />} />

                    {/* prevent direct access to /payment and /checkout */}

                    <Route path="/confirm" render={(props) =>
                        Object.keys(shopCart).length > 0 && sessionStorage.getItem("method") && sessionStorage.getItem("address") ?
                            <LoadableSummaryPage
                                {...props}
                                products={searchResult}
                                shopCart={shopCart}
                                updateShopCart={updateShopCart}
                                setPaymentStep={setPaymentStep}

                            /> : <Redirect to={{ pathname: "/" }} />
                    }
                    />} />

                <Route path="/payment" render={(props) =>
                        Object.keys(shopCart).length > 0 && sessionStorage.getItem("method") && sessionStorage.getItem("address") ?
                            <LoadablePaymentPage
                                {...props}
                                shopCart={shopCart}
                                setPaymentStep={setPaymentStep}
                                updateShopCart={updateShopCart}
                            /> : <Redirect to={{ pathname: "/" }} />
                    } />
                    <Route path="/completed" render={(props) =>
                        paymentStep > 4 ?
                            <LoadableCompletedPage
                                {...props}
                                setPaymentStep={setPaymentStep}
                            /> :
                            <Redirect to={{ pathname: "/checkout", }} />
                    } />
                    <Route component={LoadablePageNotFound} />
                </Switch>



            </div>
            <Footer />
        </>

    )

}

export default RouteCongig;