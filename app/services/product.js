class ProductService {

    getProduct = () => {
        return axios({
            url: "https://63661fbc79b0914b75c9bb80.mockapi.io/inventory",
            method: "GET"
        })
    }

    getProductDetail = (id) => {
        return axios({
            url: `https://63661fbc79b0914b75c9bb80.mockapi.io/inventory/${id}`,
            method: "GET"
        })
    }


//thêm sp lên data
    addProduct = (data) => {
        return axios({
            url: "https://63661fbc79b0914b75c9bb80.mockapi.io/inventory",
            method: "POST",
            data: data, //nhận gtri gtri bên ngoài truyền vào
        });
    };

// update
    updateProduct = (id, data) => {
        return axios({
            url: `https://63661fbc79b0914b75c9bb80.mockapi.io/inventory/${id}`,
            method: "PUT",
            data: data, // cung cấp dl ms mún sửa
        })
    };

// delete 
    deleteProduct = (id) => {
        return axios({
            url: `https://63661fbc79b0914b75c9bb80.mockapi.io/inventory/${id}`,
            method: "DELETE",
        });
    };  
}