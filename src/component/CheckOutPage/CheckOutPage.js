import React from 'react';
import './CheckOutPage.css'


function CheckOutPage({ products, shopCart, updateShopCart }) {

    function changeQuantity(add, product) {
        updateShopCart(
            prevState => ({
                ...prevState,
                [product]: add ? Number(prevState[product]) + 1 :
                    //max=0
                    (prevState[product] - 1 > 1 ? Number(prevState[product]) - 1 : 1)
            }))
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
                <div key={productID}>
                    <br></br>
                    <img src={exactProduct.image} className="productImg" alt=""></img>

                    <br></br>
                    Product Name:{exactProduct.name}
                    <br></br>
                    Price: {exactProduct.price}
                    <br></br>
                    Sum: {exactProduct.price * quantity}
                    <br></br>
                    Quantity:{quantity}

                    <button onClick={() => changeQuantity(true, productID)}>
                        +</button>
                    <button onClick={() => changeQuantity(false, productID)}>
                        -</button>
                    <button onClick={() => deleteProduct(productID)}>Delete</button>
                </div>);
        }
    }

    return (
        <div className="CheckOutPage">
            <h1>CheckOutPage</h1>
            <br></br>
            {Summary}
            <br></br>
            <br></br>
            <h2>Total <br></br>${total}</h2>
            <br></br>
            <button>Confirm</button>


        </div>
    )
}

export default CheckOutPage;