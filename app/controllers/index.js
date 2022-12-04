var productService = new ProductService();

// Global variables
var productList = [];

var shoppingCart = [];


// Frequently-used functions
function domById(id) {
    return document.getElementById(id);
}


/** ------------------------------------------------- */


//GET PRODUCT LIST
function getProductList() {
    productService.getProduct().then(function (response) {
        productList = response.data;
        renderProductList(productList);
    });
}


// RENDER PRODUCTS
function renderProductList(data) {
    var html = "";

    for (var i = 0; i < data.length; i++) {
        html += `
    <div class="item">
        <div class="wrapper">
            <img src="${data[i].img}" alt="">
            <div class='product_feature'>
                <h3>${data[i].desc}</h3>
                <p>Màn hình: ${data[i].screen}. Camera sau: ${data[i].backCamera}. Camera trước: ${data[i].frontCamera}</p>
            </div>

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
                    <h2>$${data[i].price}</h2>
                    <button class="btn-buy">
                        <i class="fa-solid fa-cart-shopping" onclick="addToCart('${data[i].id}')"><span>ADD TO CART</span></i>
                    </button>
                </div>    
            </div>

        </div>
    </div>
        `;
    }
    document.getElementById("product_list").innerHTML = html;
}

const renderTotalQty = (data) => {
    let totalQty = 0

    for (let [i,item] of data.entries()) {
        console.log(item)
        totalQty += item.quantity
    }
    domById('CartQty').innerText = totalQty
}

//ADD TO CART 
function addToCart(id){


    for (var i=0; i<productList.length; i++) {
        if (productList[i].id === id) {
            var quantityAndIndex = checkQuantity(id)
            var quantity = quantityAndIndex[0]
            var cartItemIndex = quantityAndIndex[1]

            if (quantity === 1) {
                var cartItem = new Cart(productList[i], 1)
                shoppingCart.push(cartItem)
            }
            else {
                shoppingCart[cartItemIndex].quantity = quantity
            }          
        }
    }
    console.log(shoppingCart)
    renderTotalQty(shoppingCart)
    setLocalStorage()
}


// CHECK CART QUANTITY

function checkQuantity(id) {
    var quantity = 0 
    var cartItemIndex = ''

    for (var i=0; i<shoppingCart.length;i++) {
        console.log(shoppingCart.length)
        if (shoppingCart[i].product.id === id) {
            quantity = shoppingCart[i].quantity
            cartItemIndex = i
        }
    }

    if (quantity === 0) {
        quantity = 1 // if there is no selected product in the shopping cart, the quantity is 1 for the first product
    }
    else {
        quantity += 1 // if there are products in the shopping cart, take the current quantity plus 1 
    }
    return [quantity, cartItemIndex]

}

const showAddedItem = (data) => {
    const html = data.reduce((total, element) => {
        total += 
        `
        <li class="flex py-6">
        <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img src="${element.product.img}" alt="">
        </div>

        <div class="ml-4 flex flex-1 flex-col">
          <div>
            <div class="flex justify-between text-base font-medium text-gray-900">
              <h3>
                <a href="#">${element.product.name}</a>
              </h3>
              <p class="ml-4">$${element.totalPrice()}</p>
            </div>
            <p class="mt-1 text-sm text-gray-500">${element.product.type}</p>
          </div>
          <div class="flex flex-1 items-end justify-between text-sm">
            <button id='plusButton' onclick="incrementQty('${element.product.id}')">
                <i class="fa-solid fa-plus"></i>
            </button>
            <p class="text-gray-500">Quantity: ${element.quantity}</p>
            <button id='minusButton' onclick="decreaseQty('${element.product.id}')">
            <i class="fa-solid fa-minus"></i>
            </button>
            <div class="flex">
              <button type="button" tn-buyclass="font-medium text-indigo-600 hover:text-indigo-500" onclick="removeItemCart('${element.product.id}')">Remove</button>
            </div>
          </div>
        </div>
      </li>
        `
        return total;
    }, "")
    domById('cartItems').innerHTML = html;
    calcSubtotal(shoppingCart);
}

domById('closeModalButton').onclick = () => {
    domById('shoppingCartModal').style.display = 'none';
}

const closeCartModal = () => domById('shoppingCartModal').style.display = 'none';

domById('openShoppingCart').onclick = () => {
        domById('shoppingCartModal').style.display = 'block';
        console.log(shoppingCart)
        showAddedItem(shoppingCart);
    }


// CALC SUBTOTAL --------------------------------------------------

const calcSubtotal = (data) => {
    let subTotal = 0
    for (let [i,item] of data.entries()) {
        subTotal += item.totalPrice()
    }

    domById('subTotal').innerText = `$${subTotal}`
}


const calcSubtotalCheckout = (data) => {
    let subTotal = 0
    for (let [i,item] of data.entries()) {
        subTotal += item.totalPrice()
    }

    domById('subTotalCheckout').innerText = `$${subTotal}`
    return subTotal;
}

const calcTotal = (subtotal) => {

    tax = subtotal * 0.1
    domById('tax').innerText = tax

    if (shoppingCart.length > 0) {
        shipping = 35
    }
    else {
        shipping = 0
    }
    domById('shipping').innerText = shipping

    const total = subtotal + tax + shipping 
    console.log(subtotal, tax,shipping)
    domById("total").innerText = `$${total}`
}


// ADD AND DEDUCT ITEMS ---------------------------------

const incrementQty = (id) => {
    const existingItem = shoppingCart.find(element => element.product.id ===id)
    existingItem.increaseQty()
    showAddedItem(shoppingCart)
    renderTotalQty(shoppingCart)
    setLocalStorage()
    calcSubtotal(shoppingCart);
}

const decreaseQty = (id) => {
    const existingItem = shoppingCart.find(element => element.product.id ===id)
    existingItem.decreaseQty()
    showAddedItem(shoppingCart)
    renderTotalQty(shoppingCart)
    setLocalStorage();
    calcSubtotal(shoppingCart);
}

// ADD AND DEDUCT ITEMS END---------------------------------


// REMOVE ITEMS FROM THE SHOPPING CART-------------------------

const removeItemCart = (id) => {
    const idx = shoppingCart.findIndex((element) => {
        return element.product.id === id
    })

    shoppingCart.splice(idx,1);
    showAddedItem(shoppingCart);
    setLocalStorage(shoppingCart);
    renderTotalQty(shoppingCart)
    calcSubtotal(shoppingCart);
}

const removeItemCheckout = (id) => {
    const idx = shoppingCart.findIndex((element) => {
        return element.product.id === id
    })

    shoppingCart.splice(idx,1);
    if (shoppingCart.length>0) {
        renderOrderSummary(shoppingCart)
    }

    else {
        domById('chec-div').style.display = 'none';
        alert('Không còn sản phẩm nào trong giỏ hàng của bạn.')
    }
    renderTotalQty(shoppingCart)
    setLocalStorage(shoppingCart);
    calcSubtotal(shoppingCart);
}


// REMOVE ITEMS FROM THE SHOPPING CART END-------------------------



// FILTER PRODUCTS
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



// LOCAL STORAGE -----------------------------

const setLocalStorage = () => {
    const stringify = JSON.stringify(shoppingCart);
    localStorage.setItem('ITEM_LIST_KEY', stringify)
}

const getLocalStorage = () => {
    const stringify = localStorage.getItem('ITEM_LIST_KEY');
    if(stringify) {
        return JSON.parse(stringify);
    }
    else return shoppingCart;
}

const mapDataFromLocalStorage = () => {
    const data = getLocalStorage();
    console.log(data);
    shoppingCart = data.map((element) => {
        const cartItem = new Cart(
            element.product,
            element.quantity,
        )
        return cartItem
    })
    return shoppingCart;
}


// END LOCAL STORAGE ----------------------------------------

domById('checkoutButton').onclick = () => {
    if (shoppingCart.length>0) {
        domById('shoppingCartModal').style.display = 'none';
        domById('chec-div').style.display = 'block'
        renderOrderSummary(shoppingCart)
    }
    else {
        alert('Vui lòng thêm sản phẩm vào giỏ hàng để có thể tiến hành thanh toán')
    }

}

checkoutHandler = (bool) => {
    if (bool) {
        console.log('Checkout Done')
    }
    domById('chec-div').style.display = 'none'
    
}

checkoutHandler1 = (bool) => {
    shoppingCart = []
    renderTotalQty(shoppingCart)
    domById('chec-div').style.display = 'none'
    domById('thankyouMessage').style.visibility = 'visible';

}

clearShoppingCart = () => {
    shoppingCart = []
    setLocalStorage()
    domById('thankyouMessage').style.visibility = 'hidden';
}

renderOrderSummary = (data) => {
    const html = data.reduce((total, element) => {
        total += 
        `
        <div class="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50">
        <div class="md:w-4/12 2xl:w-1/4 w-full">
            <img src="${element.product.img}" alt="Black Leather Bag" class="h-full object-center object-cover md:block hidden" />
            <img src="${element.product.img}" alt="Black Leather Bag" class="w-full h-full object-center object-cover" />
        </div>
        <div class="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
            <p class="text-xs leading-3 text-gray-800 dark:text-white md:pt-0 pt-4">${element.product.type}</p>
            <div class="flex items-center justify-between w-full pt-1">
                <p class="text-base font-black leading-none text-gray-800 dark:text-white">${element.product.name}</p>
                <p class="py-2 px-1 text-gray-500">Quantity: ${element.quantity}</p>
            </div>

            <p class="text-xs leading-3 text-gray-600 dark:text-white pt-2">Screen: ${element.product.screen}</p>
            <p class="text-xs leading-3 text-gray-600 dark:text-white py-4">Back Camera: ${element.product.backCamera}</p>
            <p class="w-96 text-xs leading-3 text-gray-600 dark:text-white">Front Camera: ${element.product.frontCamera}</p>

            <div class="flex items-center justify-between pt-5">
                <div class="flex itemms-center">
                    <p class="text-xs leading-3 underline teforxt-red-500 cursor-pointer" onclick="removeItemCheckout('${element.product.id}')">Remove</p>
                </div>
                <p class="text-base font-black leading-none text-gray-800 dark:text-white">$${element.totalPrice()}</p>
            </div>
        </div>
    </div>
        `
    return total
    },"")

    domById('checkoutItem').innerHTML = html
    const subTotal = calcSubtotalCheckout(shoppingCart)
    calcTotal(subTotal)
}



//END FILTER PRODUCTS

window.onload = function () {
    getProductList();
    mapDataFromLocalStorage();
    calcSubtotal(shoppingCart);
    renderTotalQty(shoppingCart)
}
