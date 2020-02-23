
import './freeze.css';
function freeze(freeze = true) {

    var div = document.createElement("div");
    if (freeze) {
        div.id = "freezelayer"
        div.className += "overlay";
        document.body.appendChild(div);
    }


    if (!freeze) document.getElementById("freezelayer").classList.remove("overlay")
}

export default freeze;