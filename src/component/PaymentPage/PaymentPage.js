import React, { useState } from 'react';
import './PaymentPage.css';
import Processing from '../Common/Processing';
function PaymentPage({ products, shopCart, updateShopCart }) {


    /*const [creditCard, inputcreditCard] = useState()
    function handleChange(e) {
        let { name, value } = e.target;
        inputcreditCard(value)
        e.preventDefault()

    }*/

    return (<div className="PaymentPage">
        <h2>Transaction</h2>
        <form
            className="TransactionForm"
            onSubmit={(event) => {
                event.preventDefault()
                Processing(false)
                setTimeout(function () { window.location.href = "/completed" }, 4000)

            }}>

            <div className="orderheader"><h4>Please fill in your credit card information</h4></div>
            <label for="creditCard"> Card No. (Three Digits for testing)</label>
            <input className="" id="creditCard" pattern="[0-9]{3}" type="tel" maxLength="3" required>
            </input>
            <br></br>
            <label for="creditCard"> CVC No. (Three Digits)</label>
            <input className="" id="creditCard" pattern="[0-9]{3}" type="tel" maxLength="3" required>
            </input>
            <br></br>
            <label for="creditCard">Expiration Date</label>
            <input className="" id="creditCard" type="date" required>
            </input>
            <br></br>
            <input className="btn btn-info" type="submit" value="Submit"></input>
        </form>

    </div>)

}

export default PaymentPage;