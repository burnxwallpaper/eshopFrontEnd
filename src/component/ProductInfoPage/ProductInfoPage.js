import React from 'react';
import './ProductInfoPage.css';
import ShopCart from '../ShopCart/ShopCart'
import Mockdata from '../Mockdata'
import SuccessNotify from '../Common/SuccessNotify'


function ProductInfoPage({ updateShopCart, shopCart, products, handleChange, value, setValue, loading, setLoading }) {

    if (!loading && products.length === 0) { setLoading(true) } else if (loading && products.length > 0) { setLoading(false) }
    if (!loading && products.length > 0) {
        let productID = window.location.pathname.substring(9)
        !value && setValue(1)
        let exactProduct = products.find(product => product._id.toString() === productID.toString())


        //product = { abd: 1 }
        return (
            <>
                <ShopCart updateShopCart={updateShopCart} shopCart={shopCart} MockData={Mockdata} products={products} />
                <div className="ProductInfoPage">
                    <div className="productInfoContainer">
                        <div className="productInfoImgArea">
                            <img className="productInfoImg" src={exactProduct.image} alt={exactProduct.name}></img>
                        </div>
                        <div className="productBuyArea">
                            <ul>
                                <li>Name:{exactProduct.name}</li>
                                <li>Price:{exactProduct.price}</li>
                                <li>Description: not available</li>
                                <li>Quantity:
                                <button onClick={() => setValue(prev => prev = (prev > 1 ? prev - 1 : 1))}>-</button>
                                    <input value={value} onChange={handleChange}></input>
                                    <button onClick={() => setValue(prev => prev = prev + 1)}>+</button>
                                </li>
                            </ul>
                            <div className="addToCartArea">

                                <div
                                    className="btn btn-success"
                                    onClick={() => {
                                        SuccessNotify()
                                        updateShopCart(
                                            prevState => ({
                                                ...prevState,
                                                //id:quantity
                                                [exactProduct._id]: value
                                            }))
                                    }
                                    }>
                                    Add to Cart</div>
                                <a href="/checkout">
                                    <div
                                        className="btn btn-danger"
                                        onClick={() => updateShopCart(
                                            prevState => ({
                                                ...prevState,
                                                //id:quantity
                                                [exactProduct._id]: value
                                            }))}>Buy Now
                                </div></a>

                            </div>
                        </div>
                        <div className="productCommentArea">Comment</div>
                    </div>


                </div>
            </>
        )
    } else return (<></>)
}

export default ProductInfoPage;