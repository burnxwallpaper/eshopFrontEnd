import React, { useState } from 'react';
import './ProfilePage.css'
import * as APIfunction from '../../APIfunction/APIfunction';
import Spinner from '../Common/Spinner'


function ProfilePage({ loginStatus, ...props }) {

    const [temp, setTemp] = useState();
    const [currentPage, direcToPage] = useState(1);

    let res
    (async () => {
        res = await APIfunction.getPaymentRecord()
        if (!temp) {
            setTemp(res)
            console.log(res)
        }
    })()
    let summary = []
    //expand div children size function 
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
            if (growDiv.scrollHeight < 300) { growDiv.style.transition = "0.7s" }
        }
    }
    function pagination(dataPerPage = 5) {

        const minData = (currentPage * dataPerPage) - dataPerPage + 1;
        const maxData = (currentPage * dataPerPage);
        const tempData = [];
        loopArray().forEach((item, index) => {
            const num = index + 1;
            if (num >= minData && num <= maxData) {
                tempData.push(item);
            }
        });

        return tempData
    }
    function pageNavBar(dataPerPage) {
        let bar = []
        console.log(summary.length)
        let pageNum = Math.ceil(summary.length / dataPerPage)
        for (let i = 1; i <= pageNum; i++) {
            bar.push(<button key={`page${i}`} className="pageNavButton"
                style={{
                    backgroundColor: `${currentPage === i ? "rgb(158, 227, 248)" : "white"}`
                }}
                onClick={() => {
                    direcToPage(i);
                    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
                    document.getElementById("navbar").style.top = "0";
                }
                }> {i}</button >)
        }

        bar.unshift(
            <button key="prevPage" className="pageNavButton"
                style={{ visibility: `${currentPage === 1 ? "hidden" : "visible"}` }}
                onClick={() => {
                    direcToPage(prev => prev - 1);
                    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
                    document.getElementById("navbar").style.top = "0";
                }
                }> {`<`} </button >)
        bar.push(
            <button key="nextPage" className="pageNavButton"
                style={{ visibility: `${currentPage === pageNum ? "hidden" : "visible"}` }}
                onClick={() => {
                    direcToPage(prev => prev + 1);
                    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
                    document.getElementById("navbar").style.top = "0";
                }
                }> > </button >)
        return bar
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
                        <img alt={product.name} src={product.image} ></img>
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
                        <div><b>Transport:</b><div className="flowWhenSmall">{record.transport}</div></div>
                        <div><b>Destination:</b><div className="flowWhenSmall">{record.destination}</div></div>
                        <div><b>Total:</b>${total}</div>
                        <div>
                            <b>Detail:</b>
                            <i id={`detailArrowIcon${recordIndex}`} class="fas fa-chevron-circle-right"></i>
                            <div id={`arrow${recordIndex}`} className="doubleArrow"> <i className="fas fa-angle-double-up"></i></div>
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

                    {temp.length === 0 ? "Empty" : pagination()}
                    {pageNavBar(5)}
                </div>



            </div>
        )
    }
    else return (
        <div><Spinner /></div>

    )

}

export default ProfilePage;