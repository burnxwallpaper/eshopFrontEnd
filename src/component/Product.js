import React from 'react';
import './Product.css'
import SuccessNotify from './Common/SuccessNotify'
import {
    Link
} from "react-router-dom";



function Product({ product, updateShopCart }) {
    return (

        <div className="product" key={product._id}>
            <Link to={`/product/${product._id}`}><img src={product.image} alt="" className="productImg"></img></Link>

            <b>Name:</b> {product.name}
            <br></br>
            <b>Price:</b> ${product.price}
            <br></br>

            <div
                className="btn btn-secondary"

                onClick={() => {
                    SuccessNotify()
                    updateShopCart(
                        prevState => ({
                            ...prevState,
                            //id:quantity
                            [product._id]: (prevState[product._id] ? prevState[product._id] + 1 : 1)
                        }));

                }
                }>
                Add to Cart</div>






        </div>

    )
}

export default Product;