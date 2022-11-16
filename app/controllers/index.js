var productService = new ProductService();

// Global variables
var productList = [];

var shoppingCart = [];


// Frequently-used functions
function domById(id) {
    return document.getElementById(id);
}


function getProductList() {
    productService.getProduct().then(function (response) {
        productList = response.data;
        renderProductList(productList);
    });
}

function renderProductList(data) {
    var html = "";

    for (var i = 0; i < data.length; i++) {
        html += `
    <div class="item">
        <div class="wrapper">
            <img src="${data[i].img}" alt="">
            <div class="desc">
                <div class="content">
                    <h2>${data[i].name}</h2>
                    <div class="stars">
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>

                </div>
                <div class="price">
                    <h2>${data[i].price}</h2>
                    <button class="btn-buy">
                        <i class="fa-solid fa-cart-shopping"><span>Shop Now</span></i>
                        </button>
                </div>    
            </div>
            <div class='product_feature'>
                <h3>${data[i].desc}</h3>
                <p>${data[i].screen}. ${data[i].backCamera}. ${data[i].fontCamera}</p>
            </div>
        </div>
    </div>
        `;
    }
    document.getElementById("product_list").innerHTML = html;
    console.log("rendered");
}

domById("productType").onchange = function (event) {
    var productType = event.target.value;
    filteredProductList(productType, productList);
};

function filteredProductList(productType, data) {

    if (productType === "all") {
        renderProductList(data);
        return;
    }
    
    var filteredProductList = [];

    for (var i = 0; i < data.length; i++) {
        if (productType === data[i].type.toLowerCase()) {
            filteredProductList.push(data[i]);
        }
    }
    
    renderProductList(filteredProductList);
}

window.onload = function () {
    getProductList();
};
