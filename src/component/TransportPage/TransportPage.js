import React, { useState } from 'react';
import {
    Link, withRouter, Redirect, Route
} from "react-router-dom";
import './TransportPage.css';
//import Spinner from '../Common/Spinner';

function TransportPage({ products, shopCart, updateShopCart, setPaymentStep, ...props }) {

    const [address, inputAddress] = useState()
    const [checkedValue, updateValue] = useState()
    const [checkedMethod, updateMethod] = useState()


    function handleChange(e) {
        let { value } = e.target;
        inputAddress(value)
        e.preventDefault()
    }
    function handleOption(e) {
        let { value } = e.target;
        updateValue(value)

    }
    function handleMethodChange(e) {
        let { value } = e.target;
        updateMethod(value)

    }

    function handleSubmit(e) {
        if (document.getElementById("Delivery").checked) {
            sessionStorage.setItem("method", "Delivery")
            sessionStorage.setItem("address", address)
        }
        else {
            sessionStorage.setItem("method", "Self Pick Up");
            sessionStorage.setItem("address", checkedValue)
        }
        setPaymentStep(3)
        e.preventDefault()
        //return <Route path={{ pathname: "/confirm" }} />
        return props.history.push('/confirm')


    }


    return (
        <div className="TransportPage">
            <h2>Transport Method</h2>
            <br></br>

            <form className="TransportMethodForm" onSubmit={handleSubmit}>
                <h3>Please choose one:</h3>
                <input onChange={handleMethodChange}
                    checked={checkedMethod === "Self Pick Up"} required
                    className="SelfPickUp" type="radio" name="TransportMethod" id="Self Pick Up" value="Self Pick Up" ></input>
                <label className="SelfPickUpLabel" htmlFor="Self Pick Up">1. Self Pick Up</label>


                <div className="Wrapper">
                    <div className="SelfPickUpDetail">
                        <div>
                            <input
                                onChange={handleOption} checked={checkedValue === "SelfPickUpLocationA"}
                                disabled={!(checkedMethod === "Self Pick Up")} required
                                type="radio" name="SelfPickUp" id="SelfPickUpLocationA" value="SelfPickUpLocationA"  ></input>
                            <label htmlFor="SelfPickUpLocationA">Location A</label>
                        </div>
                        <div>
                            <input onChange={handleOption} checked={checkedValue === "SelfPickUpLocationB"}
                                disabled={!(checkedMethod === "Self Pick Up")} required
                                type="radio" name="SelfPickUp" id="SelfPickUpLocationB" value="SelfPickUpLocationB"></input>
                            <label htmlFor="SelfPickUpLocationB">Location B</label>
                        </div>
                        <div>
                            <input onChange={handleOption} checked={checkedValue === "SelfPickUpLocationC"}
                                disabled={!(checkedMethod === "Self Pick Up")} required
                                type="radio" name="SelfPickUp" id="SelfPickUpLocationC" value="SelfPickUpLocationC"></input>
                            <label htmlFor="SelfPickUpLocationC">Location C</label>
                        </div>
                        <br></br>
                    </div>
                </div>


                <input onChange={handleMethodChange} required
                    checked={checkedMethod === "Delivery"}
                    className="Delivery" type="radio" name="TransportMethod" id="Delivery" value="Delivery"></input>
                <label htmlFor="Delivery">2. Delivery</label>
                <div className="Wrapper">
                    <div className="DeliveryDetail">



                        <input
                            id="address" value={address} onChange={handleChange} disabled={checkedMethod !== "Delivery"} required></input>
                        <label htmlFor="address"> Address:</label>
                    </div>
                </div>
                <br></br>
                <input className="btn btn-info" type="submit" value="Submit" ></input>
            </form>
        </div >)
}

export default TransportPage;