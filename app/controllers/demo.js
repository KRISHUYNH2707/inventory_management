
// tạo hàm lặp đi lặp lại
function getProductList () {
    axios( { // do import cnd ở trong dem.html
        url: "https://63661fab046eddf1baf95d0d.mockapi.io/productss", // gọi trên brower //==> tự return 1 promise
        method: "GET", // thuộc tính
    }).then(function (response) {//=> xoa promise.then lun, khi nào sd lại ms tạo biến thoi==> Gọi trực típ lun
       // lấy danh sách sp
       console.log(response);
    });
};

// hàm chạy khi load lại Trang
window.onload = function () {
    getProductList();
    
};
