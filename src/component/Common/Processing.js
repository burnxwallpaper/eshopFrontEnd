import React from "react";
import { render } from "react-dom";
import Spinner from './Spinner'
import Checkmark from './Checkmark'
import './Processing.css'
import freeze from './freeze'
function Processing(remove = true, words = "Processing...") {
    const basic = "PaymentProcessing"


    let temp = document.createElement("div");
    let location = document.getElementById("toastBar").appendChild(temp);

    render(<div className={[basic].join(' ')}><br></br>{words}{<Spinner />}</div>, location);
    setTimeout(function () { render(<div className={[basic].join(' ')}>Transaction completed!<Checkmark /></div>, location) }, 2000);
    let removeNotify = () => location.parentNode.removeChild(location);
    freeze();
    if (remove) setTimeout(removeNotify, 3000)

}

export default Processing;