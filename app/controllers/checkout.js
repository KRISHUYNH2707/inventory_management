// const showCheckoutCart = (data) => {
//     const html = data.reduce((total, element) => {
//         total += 
//         `
//         <div class="flex space-x-4">
//         <div>
//             <img src="${element.product.img}" alt="image"
//                 class="w-60">
//         </div>
//         <div>
//             <h2 class="text-xl font-bold">${element.product.name}</h2>
//             <p class="text-sm">Quantity: ${element.quantity}</p>
//             <span class="text-red-600">Total Price: $${element.totalPrice()}</span> $20
//         </div>
//         <div>
//             <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none"
//                 viewBox="0 0 24 24" stroke="currentColor">
//                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
//                     d="M6 18L18 6M6 6l12 12" />
//             </svg>
//         </div>
//     </div>
//         `
//     return total
//     }, "")

//     domById('orderSummary').innerHTML = html
// }

// window.onload = function () {
//     console.log('Hello')
//     showCheckoutCart(shoppingCart)
// };

