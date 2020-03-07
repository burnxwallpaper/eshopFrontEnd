import React from 'react';
import { Link } from "react-router-dom";
import './shopCart.css'

function ShopCart({ shopCart, updateShopCart, products }) {
    function handleChange(e) {
        let { name, value, max, min } = e.target;
        if (value > Number(max) || value < Number(min)) return
        //value = Math.max(Number(min), Math.min(Number(max), Number(value)));
        updateShopCart(prev => ({ ...prev, [name]: value }))
        e.preventDefault()
    }
    function deleteProduct(product) {
        if (product === "all") {
            updateShopCart(prev => prev.length =
                0)
            return;
        }
        const { [product]: tmp, ...rest } = shopCart
        updateShopCart(
            rest

        )
    }

    let Summary = []
    let total = 0
    let productsInSession = JSON.parse(sessionStorage.getItem("key"))
    //get session storage for shop cart items
    //if (productsInSession ? (Object.keys(productsInSession).length > 0 && shopCart.length === 0) : false) { updateShopCart(productsInSession) }
    if (shopCart.length !== 0) {
        for (let [productID, quantity] of Object.entries(shopCart)) {
            let exactProduct = products.find(prod => prod._id.toString() === productID.toString())
            if (exactProduct) {
                total += exactProduct ? exactProduct.price * quantity : "NULL";

                Summary.push(
                    <div className="shopCartSummaryProduct" key={productID}>


                        <b >Name:</b>{exactProduct.name}
                        <br></br>
                        <b>Price:</b>
                        ${exactProduct.price}
                        <br></br>
                        <b>Sum:</b>
                        ${exactProduct.price * quantity}
                        <br></br>
                        <b>Qty:</b>

                        <input className="shopCartInputQty" type="number" min="1" max="99"
                            name={exactProduct._id} value={quantity} onChange={handleChange} required></input>

                        <button onClick={() => deleteProduct(productID)}><i className="far fa-trash-alt"></i></button>
                        <br></br>
                        <span className="breakline"></span>
                    </div>);
            }
        }
    }
    if (Summary.length === 0) {
        Summary.push(
            <div key="empty"
                className="alert alert-warning"
                style={{
                    textAlign: "center",
                    marginBottom: "unset"

                }}>
                Empty!

            </div>
        )
    }
    return (
        <>
            <input className="shopCartCheckbox" id="shopCartCheckbox" type="checkbox"></input>
            <label className="shopCartCheckboxlabel" htmlFor="shopCartCheckbox"><i class="fas fa-shopping-cart"></i></label>

            <div className="shopCartArea">

                <i class="fas fa-shopping-cart"></i>

                <div className="shopCart">
                    <h3>Shop Cart</h3>
                    <button
                        className="btn btn-light"
                        onClick={() => deleteProduct("all")}>Clear all</button>

                    <div className="shopCartList">

                        {Summary}


                    </div>
                    {(total !== 0) && (<div className="shopCartSummary">
                        <h4>Total <br></br>${total}</h4>

                        {total !== 0 && (<div className="checkOut"><h4><Link to="/checkout">Checkout</Link></h4></div>)}
                    </div>)}
                </div>
            </div>
        </>
    )
}

export default ShopCart;