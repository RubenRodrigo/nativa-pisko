var deleteBtns = document.getElementsByClassName('producto__delete')
var updateBtns = document.getElementsByClassName('update-cart')

if (deleteBtns.length > 0) {
    for (var i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].addEventListener('click', function () {
            var ordenitemId = this.dataset.ordenitem
            console.log('USER:', user);
            if (user == 'AnonymousUser') {
                addCookieItem(productId, action, colorId, sizeId, quantity)
            } else {
                deleteItemOrden(ordenitemId)
            }
        })
    }
}

if (updateBtns.length > 0) {
    for (var j = 0; j < updateBtns.length; j++) {
        updateBtns[j].addEventListener('click', function () {
            var productId = this.dataset.producto
            var action = this.dataset.action
            var sizeId = this.dataset.talla
            var colorId = this.dataset.color
            var quantity = 1
            console.log('USER:', user);
            if (user == 'AnonymousUser') {
                addCookieItem(productId, action, colorId, sizeId, quantity)
            } else {
                updateUserOrder(productId, action, colorId, sizeId, quantity, this)
            }
        })
    }
}

function deleteItemOrden(ordenitemId) {
    var url = '/delete_item/'
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
            'ordenitemId': ordenitemId,
        })
    })
        .then((respose) => {
            return respose.json()
        })
        .then((data) => {
            location.reload()
        })
}
// function getSize(e) {    
//     var size = e.parentElement.parentElement.querySelector('.producto-tallas .talla.active')    
//     console.log("SIZE",size);
//     return size.dataset.size
// }
// function getColor(e) {
//     var color = e.parentElement.parentElement.querySelector('.producto-colores .colores--prenda#active button')    
//     console.log("COLOR",color);
//     return color.dataset.color
// }
// function getQuantity(e) {
//     var quantity = e.parentElement.parentElement.querySelector('.producto-cantidad .cantidad')    
//     console.log("Quantity",quantity);
//     return quantity.value
// }

// function addCookieItem(productId, action, colorId, sizeId, quantity) {
//     console.log('Not logged in')
//     // if (action == 'add') {
//     //     if (cart[productId] == undefined) {
//     //        cart[productId] = {'quantity': 1}
//     //     } else {
//     //         cart[productId]['quantity'] += 1
//     //     }
//     // }
//     // if (action == 'remove') {
//     //     cart[productId]['quantity'] -= 1
//     //     if (cart[productId]['quantity'] <= 0) {
//     //         console.log('Remove Item');
//     //         delete cart[productId]
//     //     }
//     // }

//     // console.log('Cart:',cart);
//     // document.cookie = 'cart='+ JSON.stringify(cart) + ";domain=;path=/"
// }

function updateUserOrder(productId, action, colorId, sizeId, quantity, context) {

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
            console.log(data)
            var orden_item_cantidad = context.parentElement
            var item_cantidad = orden_item_cantidad.querySelector('.producto__cantidad-item')
            var carrito_total = document.querySelector('#carrito__total')
            var carrito_cantidad = document.querySelector('.carrito--icon span')
            if (data.quantityItem > 0) {
                item_cantidad.textContent = data.quantityItem
            } else {
                item_cantidad.parentElement.parentElement.parentElement.remove();
                carrito_total.textContent = "S/ 0"
            }
            carrito_cantidad.textContent = data.quantity
        })

}