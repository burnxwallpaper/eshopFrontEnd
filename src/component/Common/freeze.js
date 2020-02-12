
import './freeze.css';
function freeze() {
    var div = document.createElement("div");
    div.className += "overlay";
    document.body.appendChild(div);
}

export default freeze;