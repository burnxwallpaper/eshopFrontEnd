const URL = "https://mongoser1.herokuapp.com/api/product";

export async function handleResponse(response) {
    if (response.ok) {
        let res = await response.json()
        return res;
    };
    if (response.status === 400) {
        const error = await response.text();
        throw new Error("Response status 400. API call failed. " + error);
    }
    throw new Error("Network response was not ok.");
}

export function handleError(error) {
    console.error("API call failed. " + error);
    throw error;
}

export function getRecord() {
    return fetch(URL)
        .then(handleResponse)
        .catch(handleError)
}

export function saveRecord(record) {
    return fetch(URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(record)
    })
        .then(handleResponse)
        .catch(handleError)
}

export function deleteRecord(record) {

    return fetch(URL + "/" + record._id, {
        method: "DELETE"
    })
        .catch(handleError)
}

export function updateRecord(record) {
    return fetch(URL + "/" + record._id,
        {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(record)
        })
        .catch(handleError)
}

