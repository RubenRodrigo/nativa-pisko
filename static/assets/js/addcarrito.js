var updateBtns = document.getElementsByClassName('update-cart')
if(updateBtns.length >0 ){    
    for (var i = 0; i < updateBtns.length; i++) {
        updateBtns[i].addEventListener('click', function () {
            console.log(this);
            var productId = this.dataset.producto
            var action = this.dataset.action
            var sizeId = getSize(this)
            var colorId = getColor(this)
            var quantity = getQuantity(this)
            console.log('USER:', user);
            if (user == 'AnonymousUser') {
                addCookieItem(productId, action, colorId, sizeId, quantity)
            } else {
                updateUserOrder(productId, action, colorId, sizeId, quantity)
            }
        })
    }    
}

function getSize(e) {    
    var size = e.parentElement.parentElement.querySelector('.producto__tallas .talla.active')    
    console.log("SIZE",size);
    return size.dataset.size
}
function getColor(e) {
    var color = e.parentElement.parentElement.querySelector('.producto__colores .producto__color.active span')    
    console.log("COLOR",color);
    return color.dataset.color
}
function getQuantity(e) {
    var quantity = e.parentElement.parentElement.querySelector('.producto__cantidad .cantidad')    
    console.log("Quantity",quantity);
    return quantity.value
}

function addCookieItem(productId, action, colorId, sizeId, quantity) {
    console.log('Not logged in')
    var url = '/update_item/'
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
            'productId': productId,
            'colorId': colorId,
            'sizeId': sizeId,
            'quantity': quantity,
            'action': action
        })
    })
    .then((response) => {
        return response.json()
    })
    .then((data) => {      
        console.log(data);  
        var carrito_cantidad = document.querySelector('.carrito--icon span')
        carrito_cantidad.textContent = data.cartItems
    })
}

function updateUserOrder(productId, action, colorId, sizeId, quantity)  {

    var url = '/update_item/'
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
            'productId': productId,
            'colorId': colorId,
            'sizeId': sizeId,
            'quantity': quantity,
            'action': action
        })
    })
    .then((response) => {
        return response.json()
    })
    .then((data) => {      
        console.log(data);  
        var carrito_cantidad = document.querySelector('.carrito--icon span')
        carrito_cantidad.textContent = data.cartItems
    })

}