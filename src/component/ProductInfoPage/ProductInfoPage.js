import React,{useState,useEffect} from 'react';
import './ProductInfoPage.css';
import ShopCart from '../ShopCart/ShopCart'
import Mockdata from '../Mockdata'
import SuccessNotify from '../Common/SuccessNotify'
import mockDescription from './mockDescription'
import { Link } from 'react-router-dom';


function ProductInfoPage({ updateShopCart, shopCart, products,value,setValue,handleChange, loading, setLoading, ...props }) {
    
    if (!loading && products.length === 0) { setLoading(true) } else if (loading && products.length > 0) { setLoading(false) }
    //get product after loading productlist

    if (!loading && products.length > 0) {
        let productID = window.location.pathname.substring(9)
        !value && setValue(1)
        let exactProduct = products.find(product => product._id.toString() === productID.toString())

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
                                <li><h3>Name:{exactProduct.name}</h3></li>
                                <li><h3>Price:${exactProduct.price}</h3></li>
                                <li><h3>Quantity:
                                
                                <div >
                                        <div style={{ cursor: "pointer" }} onClick={() => setValue(prev => prev = (prev > 1 ? prev - 1 : 1))}><i className="fas fa-minus-square"></i></div>
                                        <input value={value} onChange={handleChange} ></input>
                                        <div style={{ cursor: "pointer" }} onClick={() => setValue(prev => prev = prev + 1)}><i className="fas fa-plus-square"></i></div>
                                    </div>
                                </h3>
                                </li>
                                <li><h3>Sum:${exactProduct.price * value}</h3></li>
                                <li className="buyBtn"> <div
                                    className="btn btn-success"
                                    onClick={() => {
                                        SuccessNotify()
                                        updateShopCart(
                                            prevState => ({
                                                ...prevState,
                                                [exactProduct._id]: value
                                            }))
                                    }
                                    }>
                                    Add to Cart</div>

                                    <Link to='/checkout' className="btn btn-danger"
                                        onClick={() => {updateShopCart(
                                            prevState => ({
                                                ...prevState,
                                                [exactProduct._id]: value
                                            }))
                                        }}>Buy Now
                                </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="productDescriptionArea">
                        <h4>Description:</h4>
                        {exactProduct.description || mockDescription((exactProduct.price > 8) ? 0 : 1, exactProduct.name.includes("o") ? 1 : 2)}
                    </div>




                </div>
            </>
        )
    } else return (<></>)
}

export default ProductInfoPage;