import React from 'react';

import './shopCart.css'

function ShopCart({ shopCart, updateShopCart, products }) {
    function handleChange(e) {
        let { name, value, max, min } = e.target;
        if (value > Number(max) || value < Number(min)) return
        //value = Math.max(Number(min), Math.min(Number(max), Number(value)));
        updateShopCart(prev => ({ ...prev, [name]: value }))
        e.preventDefault()

    }

    /*function changeQuantity(add, product) {
        updateShopCart(
            prevState => ({
                ...prevState,
                [product]: add ? prevState[product] + 1 :
                    //max=0
                    (prevState[product] - 1 > 1 ? prevState[product] - 1 : 1)
            }))
    }*/
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

    //if (productsInSession ? (Object.keys(productsInSession).length > 0 && shopCart.length === 0) : false) { updateShopCart(productsInSession) }
    if (productsInSession ? (Object.keys(productsInSession).length > 0 && shopCart.length === 0) : false) { updateShopCart(productsInSession) }

    if (shopCart.length !== 0) {
        for (let [productID, quantity] of Object.entries(shopCart)) {
            let exactProduct = products.find(prod => prod._id.toString() === productID.toString())
            if (exactProduct) {
                total += exactProduct ? exactProduct.price * quantity : "NULL";

                Summary.push(
                    <div key={productID}>


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
            <div key="empty">
                <br></br>
                It is empty!
            </div>
        )
    }
    return (
        <>
            <div className="shopCartArea">
                <span className="icon cart"></span>

                <div className="shopCart">
                    <h3>Shop Cart</h3>
                    <button onClick={() => deleteProduct("all")}>Clear all</button>
                    <div className="shopCartList">

                        {Summary}


                    </div>
                    <div className="shopCartSummary">
                        <h4>Total <br></br>${total}</h4>

                        {total !== 0 && (<div className="checkOut"><h4><a href="/checkout">checkout!</a></h4></div>)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShopCart;