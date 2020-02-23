import React from "react";
import { render } from "react-dom";
import Spinner from './Spinner'
import Checkmark from './Checkmark'
import './Processing.css'
import freeze from './freeze'
async function Processing(func, words = "Processing...") {
    const basic = "PaymentProcessing"


    let temp = document.createElement("div");
    let location = document.getElementById("toastBar").appendChild(temp);

    render(<div className={[basic].join(' ')}><br></br>{words}{<Spinner />}</div>, location);
    freeze();
    let res = await func
    if (res) {

        setTimeout(() => {
            render(<div className={[basic].join(' ')}>Transaction completed!<Checkmark /></div>, location);

        }, 3000)
        let removeNotify = () => location.parentNode.removeChild(location);
        setTimeout(() => {
            removeNotify()
            freeze(false)
        }, 5000)


        //let removeNotify = () => location.parentNode.removeChild(location);

        return "finished"


    };
}

export default Processing;