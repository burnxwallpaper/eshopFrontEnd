import React from 'react';
import './SummaryPage.css';
import Spinner from '../Common/Spinner';
function SummaryPage({ products, shopCart, updateShopCart }) {
    let Summary = [];
    let total = 0;
    let productsInSession = JSON.parse(sessionStorage.getItem("key"));
    let tempIndex = 0;
    if (Object.keys(productsInSession).length > 0 && shopCart.length === 0) { updateShopCart(productsInSession) }
    for (let [productID, quantity] of Object.entries(shopCart)) {
        let exactProduct = products.find(prod => prod._id.toString() === productID.toString())
        if (exactProduct !== undefined) {
            total += exactProduct.price * quantity;
            tempIndex += 1;
            Summary.push(
                <div key={productID} className="SummaryProduct">
                    <br></br>
                    <div className="tempIndex" >
                        {tempIndex}</div>
                    <img src={exactProduct.image} className="productImg" alt=""></img>

                    <div className="productDescription">

                        <b >Name:</b>{exactProduct.name}
                        <br></br>
                        <b >Price:</b> ${exactProduct.price}
                        <br></br>
                        <div className="smalldescriptionSum">
                            <b >Quantity:</b>{quantity}
                            <br></br>
                            <b >Sum:</b> ${exactProduct.price * quantity}
                        </div>

                    </div>

                    <div className="descriptionSum">
                        <b >Quantity:</b>{quantity}
                        <br></br>
                        <b >Sum:</b> ${exactProduct.price * quantity}
                    </div>
                </div>);
        }
    }
    if (total === 0) { return <Spinner /> }
    else return (
        <div className="SummaryPage">

            <h1>Summary</h1>
            <br></br>
            <div className="SummaryTable">
                <div className="orderheader"><h3>Order List</h3></div>
                <div className="SummaryProductList">{Summary}</div>

                <br></br>
                <br></br>
                <h2>Total <br></br>${total}</h2>
                <br></br>
                <div className="orderheader"><h3>Transport</h3></div>

                <br></br>
                <div className="orderTransport">
                    <h4><i class="fas fa-truck"></i>&nbsp;Pick Up Method:</h4><p>{sessionStorage.getItem("method")}</p>

                    <h4><i class="fas fa-map-marked-alt"></i>&nbsp;Address:</h4><p>{sessionStorage.getItem("address")}</p>

                </div>
            </div>
            <button className="btn btn-info"><a href='/payment'>Confirm</a></button>


        </div>
    )

}

export default SummaryPage;
