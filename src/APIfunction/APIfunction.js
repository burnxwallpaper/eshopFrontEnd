
const URL = "http://localhost:4000";
//const URL = "https://mongoser1.herokuapp.com"
const prouctURL = "/api/product";
const PRL = URL + prouctURL;

export function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export async function handleResponse(response) {
    if (response.ok) {
        let res = await response.json()
        return res;
    };
    if (response.status === 400) {
        const error = await response.text();
        window.location.replace("/unauthenticated");
    }
    if (response.status === 401) {
        const error = await response.text();
        window.location.replace("/unauthenticated");
    }
    //throw new Error("Network response was not ok.");
}

export function handleError(error) {
    console.error("API call failed. " + error);
    throw error;
}

export function getRecord() {
    return fetch(PRL)
        .then(handleResponse)
        .catch(handleError)
}

export function saveRecord(record) {
    return fetch(PRL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(record)
    })
        .then(handleResponse)
        .catch(handleError)
}

export function deleteRecord(record) {

    return fetch(PRL + "/" + record._id, {
        method: "DELETE"
    })
        .catch(handleError)
}

export function updateRecord(record) {
    return fetch(PRL + "/" + record._id,
        {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(record)
        })
        .catch(handleError)
}

export function login(account) {
    return fetch(URL + "/authentication/account", {
        method: "POST",
        mode: 'cors',
        headers: { "content-type": "application/json" },
        body: JSON.stringify(account)
    })
        .then(handleResponse)
        .catch(handleError)
}

export function autoLogin(account) {
    return fetch(URL + "/authentication/account", {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "token": getCookie("token")


        },
    })
        .then(handleResponse)
        .catch(handleError)
}

export async function postPaymentRecord(record) {

    return fetch(URL + "/order", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "token": getCookie("token")
        },
        body: JSON.stringify(record)
    })

        .then(handleResponse)
        .catch(handleError)
}

export function getPaymentRecord() {

    return fetch(URL + "/order", {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "token": getCookie("token")
        },

    })
        .then(handleResponse)
        .catch(handleError)
}


