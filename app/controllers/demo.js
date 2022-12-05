// tạo productService
var productService = new ProductService ();

// rút gọn documnet.gêtlementID
function domId (id) {// truyền vào ID
    //return document....
    return document.getElementById(id);
};

// tạo hàm lặp đi lặp lại
function getProductList () {
    // var productList = [];==> ko dùng dc
    // axios( { // do import cnd ở trong dem.html
    //     url: "https://63661fbc79b0914b75c9bb80.mockapi.io/inventory", // gọi trên brower //==> tự return 1 promise
    //     method: "GET", // thuộc tính
    // })

    //do đã tách axios nên h sẽ gọi service, ko gọi trực tiếp nữa
    productService.getProduct().then(function (response) {//=> xoa promise.then lun, khi nào sd lại ms tạo biến thoi==> Gọi trực típ lun
       // lấy danh sách sp
       console.log(response);
    //xem chạy dòng nào trc
    // console.log("13");
    //    productList = response.data;// gán producLisst=respone.dâta : data là mảng ==> bị bất đồng bộ

// Gọi được khi axios trả về thì bắt buộc gọi bên trong thằng THEN (để nó đồng bộ đc thì phải gọi trong hàm THEN)    
        renderProductList(response.data);
    });

    // console.log("17");
    // renderProductList(productList);==> ko dùng đc
// vì produclist ở đây là 1 mảng rỗng==> ko gọi đc renderProductList ra đc
};

// render ra bảng
function renderProductList (data) {// nhận tham số vô là data
          // muốn xem d17 chạy đc hay chưa thi consloge
        // console.log(data);
    //render ra bảng
    var content = "";// tạo 1 biến content

    // data lúc này là 1 mảng hoàn toàn có thể map đc mảng đó thông qua vòng lặp FORR
    for(var i = 0; i < data.length; i++) {
    // trong vòng lặp forr này sẽ cho nó cộng chuỗi thông qua +=
      content += `
       <tr>
          <td>${i + 1}</td>
          <td>${data[i].name}</td>
          <td>${data[i].price}</td>
          <td>${data[i].img}</td>
          <td>${data[i].type}</td>
          <td>
          <button data-toggle="modal" 
              data-target="#myModal" class = "btn btn-info" onclick = "openUpdateModal(${data[i].id})">SỬA</button>

          <button 
          onclick = "deleteProduct(${data[i].id})"
          class = "btn btn-danger">XÓA</button>
          </td>
       </tr>
      `
// chuỗi mong muốn là những DÒNG => <tr></tr>  => có những dòng <td></td> bên trong
// <td>số tt</td>
//<td>Name</td>: mảng lấy ptu index.name
//<td>Price</td>: mảng lấy ptu index.price
//<td>image</td>: mảng lấy ptu index.image
//<td>description</td>: mảng lấy ptu index.description

 };
    //DOM đến ID để lấy đc bảng=> render nó vô
document.getElementById("tblDanhSachSP").innerHTML = content;
};

// Button XÓA
function deleteProduct (id) {
    productService.deleteProduct(id).then(function () {
        alert("Xóa sản phẩm thành công");
        getProductList();
    })
};

// Button SỬA
function openUpdateModal (id) {
    document.querySelector(".modal-title").innerHTML = "Sửa Sản Phẩm";
    document.querySelector(".modal-footer").innerHTML = 
    `<button onclick = 'UpdateProduct(${id})' class = 'btn btn-primary'>SỬA</button>`;

// hiển thị những nd khi ml click vào ô sửa
   productService.getProductDetail(id).then(function(respone) {
       // dom đến từng id, do bất đồng bộ nên sẽ chạy trong THEN
       domId("TenSP").value = respone.data.name;
       domId("GiaSP").value = respone.data.price;
       domId("HinhSP").value = respone.data.img;
       domId("loaiSP").value = respone.data.type;
   });
}

// khi sửa thì lấy đc gtri ms của form input
function UpdateProduct (id) { // cần có 1 id của thằng mk gọi
// cách lấy DATA từ FORM
  var name = domId("TenSP").value;
  var price = domId("GiaSP").value;
  var screen =  domId("screen 70");
  var backCamera = domId(" Chính 64 MP & Phụ 12 MP, 5 MP, 5 MP");
  var fontCamera = domId(" 32 MP");
  var img = domId("HinhSP").value;
  var desc = domId("Thiết kế đột phá, màn hình tuyệt đỉnh");
  var type = domId("loaiSP").value;

    var product = new Product (id, name, price, screen, backCamera, fontCamera, img, desc, type);//=> data

// gọi function update bên product.service
  productService.updateProduct(id, product).then(function (){
    // sau khi sửa xong thì tự động đóng
    document.querySelector(".close").click();
    //update lại dsach luôn
    alert("Sửa sản phẩm thành công");
    getProductList();
  });
};

// hàm chạy khi load lại Trang
window.onload = function () {
    getProductList();
    
};


// đổi tên model heading
domId("btnThemSP").onclick = function () { //==> dùng ngắn gọn hơn
// document.getElementById("btnThemSP").onclick = function () {
    //thử xem nó có chạy ko
    // console.log(123123);

// DOM trực tiếp đến CLASS ròi sau đó thay đổi tên
    // querySelector lấy phần tử đầu tiên nó kiếm đc
      document.querySelector(".modal-title").innerHTML = "Thêm Sản Phẩm";
//    document.querySelector("# + tên id"); => dom đến ID
//    document.querySelector("# + tên class"); => Dom đến CLASS
// vd trong HTML có 2 Class trùng nhau mà mk sd querySelector ==> tự hiểu DOm đến ptu đầu tiên


// Thêm Các NÚT BUTTON
// NOTE: bên ngoài dùng ""; bên TRONG dùng '' và ngc lại
      document.querySelector(".modal-footer").innerHTML = "<button onclick = 'addProduct()' class = 'btn btn-primary'>THÊM</button>"
      // lúc này mún inner 1 button chứ ko phải inner 1 test nữa ==> cần 1 button trong ""
      // click vô button thêm thì lấy đc thông tin ng dùng nhập vào

    //   document.querySelector(".modal-footer").innerHTML = "<button class = 'btn btn-second'>XÓA</button>"
};

// addProduct
function addProduct() {
    //xem nó đã đc chưa
    // console.log(30);

// dom đến id trên input để lấy value
  var id = domId("2");
  var name = domId("TenSP").value;
  var price = domId("GiaSP").value;
  var screen =  domId("screen 70");
  var backCamera = domId(" Chính 64 MP & Phụ 12 MP, 5 MP, 5 MP");
  var fontCamera = domId(" 32 MP");
  var img = domId("HinhSP").value;
  var desc = domId("Thiết kế đột phá, màn hình tuyệt đỉnh");
  var type = domId("loaiSP").value;


  // tạo 1 product để new từ lớp đối tượng là model
    var product = new Product(id, name, price, screen, backCamera, fontCamera, img, desc, type);

//   console.log(name, price, image, description);
  //log để bt đc cái nào là name, price, imge,...
  // console.log({name, price, img, type});

  //gọi API, load lại trang lun
  productService.addProduct (product).then(function () {
    alert("Thêm sản phẩm thành công.");
    getProductList();
  });
  // data ở đây chính là product new từ lớp đtg PRODUCT 
};

