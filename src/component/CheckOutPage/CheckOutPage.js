import React from 'react';
import './CheckOutPage.css'
import Spinner from '../Common/Spinner'


function CheckOutPage({ products, shopCart, updateShopCart }) {
    function handleChange(e) {
        let { name, value, max, min } = e.target;
        if (value > Number(max) || value < Number(min)) return
        //value = Math.max(Number(min), Math.min(Number(max), Number(value)));
        updateShopCart(prev => ({ ...prev, [name]: value }))
        e.preventDefault()

    }

    function deleteProduct(product) {
        const { [product]: tmp, ...rest } = shopCart
        updateShopCart(
            rest

        )
    }
    let Summary = []
    let total = 0
    let productsInSession = JSON.parse(sessionStorage.getItem("key"))
    //if (Object.keys(productsInSession).length > 0 && shopCart.length === 0) { updateShopCart(productsInSession) }
    if (Object.keys(productsInSession).length > 0 && shopCart.length === 0) { updateShopCart(productsInSession) }
    for (let [productID, quantity] of Object.entries(shopCart)) {
        let exactProduct = products.find(prod => prod._id.toString() === productID.toString())
        if (exactProduct !== undefined) {
            total += exactProduct.price * quantity;
            Summary.push(
                <div key={productID} className="CheckoutProduct">
                    <br></br>
                    <img src={exactProduct.image} className="productImg" alt=""></img>

                    <div className="description">
                        <br></br>
                        <b >Name:</b>{exactProduct.name}
                        <br></br>
                        <b >Price:</b> ${exactProduct.price}
                        <br></br>
                        <b >Sum:</b> ${exactProduct.price * quantity}
                        <br></br>
                        <b >Quantity:</b>

                        <input className="shopCartInputQty" type="number" min="1" max="99"
                            name={exactProduct._id} value={quantity} onChange={handleChange} required></input>
                        <button onClick={() => deleteProduct(productID)}><i className="far fa-trash-alt"></i></button>
                    </div>
                </div>);
        }
    }
    if (total === 0) { return <Spinner /> }
    else return (
        <div className="CheckOutPage">

            <h1>CheckOutPage</h1>
            <br></br>
            <div className="">{Summary}</div>

            <br></br>
            <br></br>
            <h2>Total <br></br>${total}</h2>
            <br></br>
            <a href='/transport' className="btn btn-info">Confirm</a>


        </div>
    )
}

export default CheckOutPage;