import React from 'react';
import './PaymentPage.css';
import Processing from '../Common/Processing';
import * as APIfunction from '../../APIfunction/APIfunction'
function PaymentPage({ products, shopCart, updateShopCart, setPaymentStep, ...props }) {


    return (<div className="PaymentPage">
        <h2>Transaction</h2>
        <form
            className="TransactionForm"
            onSubmit={async (event) => {
                event.preventDefault()
                let summary = {
                    shopCart: JSON.parse(sessionStorage.getItem("shopCart")),
                    transport: sessionStorage.getItem("method"),
                    destination: sessionStorage.getItem("address")

                }

                let func = APIfunction.postPaymentRecord(summary)

                let finish = await Processing(func)
                if (finish) {
                    setPaymentStep(5)
                    sessionStorage.removeItem('shopCart')
                    sessionStorage.removeItem('method')
                    sessionStorage.removeItem('address')
                    return setTimeout(() => props.history.push('/completed'), 5000)
                }



            }}>

            <div className="orderheader"><h4>Please fill in your credit card information</h4></div>
            <label htmlFor="creditCard"> Card No. (Three Digits for testing)</label>
            <input className="" id="creditCard" pattern="[0-9]{3}" type="tel" maxLength="3" required>
            </input>
            <br></br>
            <label for="creditCard"> CVC No. (Three Digits)</label>
            <input className="" id="creditCard" pattern="[0-9]{3}" type="tel" maxLength="3" required>
            </input>
            <br></br>
            <label for="creditCard">Expiration Date</label>
            <input className="" id="creditCard" type="date" >
            </input>
            <br></br>
            <input className="btn btn-info" type="submit" value="Submit"></input>
        </form>

    </div>)

}

export default PaymentPage;