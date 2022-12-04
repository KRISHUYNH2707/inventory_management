// tạo productService
var productService = new ProductService ();

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
    //    console.log(response);
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
          <td></td>
       </tr>
      `
// chuỗi mong muốn là những DÒNG => <tr></tr>  => có những dòng <td></td> bên trong
// <td>số tt</td>
//<td>Name</td>: mảng lấy ptu index.name
//<td>Price</td>: mảng lấy ptu index.price
//<td>image</td>: mảng lấy ptu index.image
//<td>description</td>: mảng lấy ptu index.description
//DOM đến ID để lấy đc bảng=> render nó vô
   document.getElementById("tblDanhSachSP").innerHTML = content;
    }

}

// hàm chạy khi load lại Trang
window.onload = function () {
    getProductList();
    
};


// đổi tên model heading
document.getElementById("btnThemSP").onclick = function () {
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
  var name = document.getElementById("TenSP").value;
  var price = document.getElementById("GiaSP").value;
  var img = document.getElementById("HinhSP").value;
  var type = document.getElementById("loaiSP").value;


  // tạo 1 product để new từ lớp đối tượng là model
    var product = new Product()

//   console.log(name, price, image, description);
  //log để bt đc cái nào là name, price, imge,...
  console.log({name, price, img, type});
};



