import React, { useState } from 'react';
import './ProfilePage.css'
import * as APIfunction from '../../APIfunction/APIfunction';
import Spinner from '../Common/Spinner'


function ProfilePage() {

    const [temp, setTemp] = useState();
    let res
    (async () => {

        res = await APIfunction.getPaymentRecord()
        if (!temp) {

            setTemp(res)
            console.log(res)
        }



    })()
    let summary = []

    function growDiv(index) {
        console.log("growing")
        let growDiv = document.getElementById("buyRecordProduct" + index);
        let arrow = document.getElementById("arrow" + index);



        if (growDiv.scrollHeight < 300) { growDiv.style.transition = "0.7s" }
        else { growDiv.style.transition = "1.2s" }
        if (growDiv.clientHeight) {
            arrow.classList.remove("doubleArrowDisplay")
            growDiv.style.height = 0;

        } else {
            growDiv.style.height = growDiv.scrollHeight + 'px';
            arrow.classList.add("doubleArrowDisplay")
            //growDiv.style.overflow = "scroll"
            if (growDiv.scrollHeight < 300) { growDiv.style.transition = "0.7s" }
        }
    }

    function loopArray() {

        temp.forEach((record, recordIndex) => {
            let products = []
            let total = 0
            record.products.forEach((product, prodIndex) => {
                let sum = product.price * product.quantity
                total += sum;
                products.push(
                    <div key={`buyRecordProduct${prodIndex}`} className="buyRecordProductEach">
                        <img src={product.image} ></img>
                        <div><div><b>Name:</b>{product.name}</div>
                            <div><b>Price:</b>${product.price}</div>
                            <div><b>Quantity:</b>{product.quantity}</div>
                            <div><b>Sum:</b>${sum}</div></div>

                    </div>
                )

            })
            summary.push(
                <div key={`buyRecord${recordIndex}`} className="buyRecordEach">
                    <label id={`buyRecordWrapperlabel${recordIndex}`} style={{ cursor: "pointer" }} htmlFor={`buyRecordWrapperCheckbox${recordIndex}`}>
                        <div >
                            <b>{recordIndex + 1}</b></div>
                        <div><b>OrderID:</b><div className="flowWhenSmall">{record._id}</div></div>
                        <div><b>Date:</b><div className="flowWhenSmall">{record.date.substring(0, 10)}</div></div>
                        <div><b>Total:</b>${total}</div>
                        <div>
                            <b>Detail:</b>
                            <i id={`detailArrowIcon${recordIndex}`} class="fas fa-chevron-circle-right"></i>
                            <div id={`arrow${recordIndex}`} className="doubleArrow"> <i class="fas fa-angle-double-up"></i></div>
                        </div>


                    </label>
                    <input style={{ display: "none" }} onClick={() => {
                        growDiv((recordIndex))
                        let thisLabel = document.getElementById(`buyRecordWrapperlabel${recordIndex}`)
                        let collapsed = document.getElementById(`buyRecordProduct${recordIndex}`)

                        if (collapsed.style.height !== "0px") {
                            document.getElementById(`detailArrowIcon${recordIndex}`).style.transform = "rotate(90deg)"
                            thisLabel.style.backgroundColor = "rgb(250, 230, 193)"
                        } else {
                            document.getElementById(`detailArrowIcon${recordIndex}`).style.transform = "unset"
                            thisLabel.style.backgroundColor = "unset"
                        }
                        ;
                    }} id={`buyRecordWrapperCheckbox${recordIndex}`} type="checkbox"></input>

                    <div
                        id={`buyRecordProduct${recordIndex}`} className="buyRecordProduct">{products}</div>




                </div >

            )
        }
        )
        return summary
    }

    if (temp) {
        return (
            <div className="profilePage">
                <h2>ProfilePage</h2>
                <h4>Username:{sessionStorage.getItem("username")}</h4>
                <br></br>
                <h5 style={{ textAlign: "left", marginLeft: "20px", textDecoration: "underline" }}>Purchasement Record:</h5>
                <div className="buyRecordList">

                    {temp.length === 0 ? "Empty" : loopArray()}
                    {}
                </div>



            </div>
        )
    }
    else return (
        <div><Spinner /></div>

    )

}

export default ProfilePage;