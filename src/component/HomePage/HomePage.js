import React from 'react';
import Product from '../Product'
import SearchBar from '../SearchBar/SearchBar';
import ShopCart from '../ShopCart/ShopCart'
import Spinner from '../Common/Spinner'

import './HomePage.css'

function HomePage({
    loading, loginStatus, setLoading, currentPage, filteredResult, displayNoResult, products, dataPerPage, pagination, shopCart, updateShopCart, searchResult, direcToPage, search, handleChange, value, setValue }) {

    function pageNavBar(dataPerPage) {
        let bar = []
        let pageNum = Math.ceil((filteredResult.length > 0 ? filteredResult : searchResult).length / dataPerPage)
        for (let i = 1; i <= pageNum; i++) {
            bar.push(<button key={`page${i}`} className="pageNavButton"
                style={{
                    backgroundColor: `${currentPage === i ? "rgb(158, 227, 248)" : "white"}`
                    //color: `${currentPage === i ? "white" : "black"}`
                }}
                onClick={() => {
                    direcToPage(i);
                    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
                    document.getElementById("navbar").style.top = "0";
                }
                }> {i}</button >)
        }
        //let PageBtnStyle = (currentPage === 1 ? "visibility:hidden" : "visibility:visible")
        bar.unshift(
            <button key="prevPage" className="pageNavButton"
                style={{ visibility: `${currentPage === 1 ? "hidden" : "visible"}` }}
                onClick={() => {
                    direcToPage(prev => prev - 1);
                    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
                    document.getElementById("navbar").style.top = "0";
                }
                }> {`<`} </button >)
        bar.push(
            <button key="nextPage" className="pageNavButton"
                style={{ visibility: `${currentPage === pageNum ? "hidden" : "visible"}` }}
                onClick={() => {
                    direcToPage(prev => prev + 1);
                    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
                    document.getElementById("navbar").style.top = "0";
                }
                }> > </button >)
        return bar
    }
    return (

        <>
            <div className="mainArea">

                <SearchBar updateShopCart={updateShopCart} search={search} handleChange={handleChange} value={value} />
                <div style={{ height: "50px", top: "50px" }}>{displayNoResult && <div className="alert alert-warning" role="alert" >No result!</div>}</div>

                {loading && <Spinner />}
                <ShopCart updateShopCart={updateShopCart} shopCart={shopCart} handleChange={handleChange}
                    products={products}
                    value={value}
                    setValue={setValue} />
                {!loading &&
                    <div className="productArea">
                        <div className="products">
                            {
                                (pagination().map(product => <Product key={product._id} product={product} updateShopCart={updateShopCart} />))
                            }
                        </div>
                    </div>}

                {!loading && <div className="pageNavBar">

                    <br></br>
                    {pageNavBar(dataPerPage)}
                </div>}


            </div>
        </>
    )
}

export default HomePage;