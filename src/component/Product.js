import React from 'react';
import './Product.css'
import SuccessNotify from '../common/Toastbar/SuccessNotify'



function Product({ product, updateShopCart }) {
    return (

        <div className="product" key={product._id}>
            <a href={`/product/${product._id}`}><img src={product.image} alt="" className="productImg"></img></a>
            <br></br>
            <br></br>
            Name: {product.name}
            <br></br>
            Price: {product.price}
            <br></br>

            <div
                className="btn btn-secondary"

                onClick={() => {
                    /*let temp = document.createElement("div");
                    let location = document.getElementById("toastBar").appendChild(temp);
                    render(<SuccessNotify words={"Added successfully!"} color={"green"} />, location);
                    let removeNotify = () => location.parentNode.removeChild(location);
                    setTimeout(removeNotify, 3000)*/
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