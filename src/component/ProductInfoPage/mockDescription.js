let country = ["China", "USA", "Australia", "Holand"]


function mockDescription(a, b) {
    let mockDescription1 = [
        `This product is made from ${country[a]}.`,
        "The quality of this product is guaranteed by IFC certificate.",

    ]
    let mockDescription2 = [
        "Most importantly,it tastes good!",
        "Most importantly,it is fresh!",
        "Most importantly,it provides vitamin!",
    ]
    return mockDescription1[a] + mockDescription2[b]
}

export default mockDescription;
