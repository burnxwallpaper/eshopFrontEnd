import React, { useState } from 'react';
import './PaymentPage.css';
import Spinner from '../Common/Spinner';
function PaymentPage({ products, shopCart, updateShopCart }) {


    /*const [creditCard, inputcreditCard] = useState()
    function handleChange(e) {
        let { name, value } = e.target;
        inputcreditCard(value)
        e.preventDefault()

    }*/
    return (<div className="PaymentPage">
        <form action={(event) => {
            event.preventDefault()
            alert("valid")
        }}>
            <label for="creditCard"> Card No.</label>
            <input className="" id="creditCard" pattern="[0-9]{16}" type="tel" maxLength="16" required>
            </input>
            <input type="submit" value="Submit"></input>
        </form>
        <a href='/end'
        //onClick={() => sessionStorage.setItem("address", address)}
        >pay</a>

    </div>)

}

export default PaymentPage;