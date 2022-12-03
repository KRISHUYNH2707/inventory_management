class Product {
    constructor (id, name, price, screen, backCamera, fontCamera, img, desc, type) {
        this.id = id,
        this.name = name, 
        this.price = price, 
        this.screen = screen, 
        this.backCamera = backCamera, 
        this.fontCamera = fontCamera, 
        this.img = img, 
        this.desc = desc, 
        this.type = type
    }
}

class Cart {
    constructor (product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    totalPrice = () => {
        return this.quantity * this.product.price
    }


    increaseQty = () => {
        if (this.quantity < 10) {
            return this.quantity += 1
        } 
        else {
            alert('Vui lòng liên hệ trực tiếp với nhân viên để được hỗ trợ nếu bạn muốn mua nhiều hơn 10 sản phẩm\n')
        }
    }

    decreaseQty = () => {
        if (this.quantity > 0) {
            return this.quantity -= 1
        }
    }
}
