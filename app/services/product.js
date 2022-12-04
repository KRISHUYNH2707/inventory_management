class ProductService {

    getProduct = () => {
        return axios({
            url: "https://63661fbc79b0914b75c9bb80.mockapi.io/inventory",
            method: "GET"
        })
    }

    getProductDetail = () => {
        return axios({
            url: `https://63661fbc79b0914b75c9bb80.mockapi.io/inventory/${id}`,
            method: "GET"
        })
    }

    
}