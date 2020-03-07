import React from 'react';
import './CheckOutPage.css'
import Spinner from '../Common/Spinner'
import { Link } from "react-router-dom";



function CheckOutPage({ products, shopCart, updateShopCart, setPaymentStep }) {
    function handleChange(e) {
        let { name, value, max, min } = e.target;
        if (value > Number(max) || value < Number(min)) return
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
    for (let [productID, quantity] of Object.entries(shopCart)) {
        let exactProduct = products.find(prod => prod._id.toString() === productID.toString())
        if (exactProduct !== undefined) {
            total += exactProduct.price * quantity;
            Summary.push(
                <div key={productID} className="CheckoutProduct">

                    <img src={exactProduct.image} className="productImg" alt=""></img>

                    <div className="description">
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
            <h2>CheckOutPage</h2>
            <div className="">{Summary}</div>


            <h2>Total:${total}</h2>
            <br></br>
            <div onClick={setPaymentStep(2)}><Link to='/checkout/transport' className="btn btn-info">Confirm</Link></div>


        </div>
    )
}

export default CheckOutPage;