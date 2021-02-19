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
    // if (action == 'add') {
    //     if (cart[productId] == undefined) {
    //        cart[productId] = {'quantity': 1}
    //     } else {
    //         cart[productId]['quantity'] += 1
    //     }
    // }
    // if (action == 'remove') {
    //     cart[productId]['quantity'] -= 1
    //     if (cart[productId]['quantity'] <= 0) {
    //         console.log('Remove Item');
    //         delete cart[productId]
    //     }
    // }

    // console.log('Cart:',cart);
    // document.cookie = 'cart='+ JSON.stringify(cart) + ";domain=;path=/"
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
    .then((respose) => {
        return respose.json()
    })
    .then((data) => {
        console.log(data.quantity);
        var carrito_cantidad = document.querySelector('.carrito--icon span')
        carrito_cantidad.textContent = data.quantity
    })

}