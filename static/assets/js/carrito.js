var deleteBtns = document.getElementsByClassName('producto__delete')
var updateBtns = document.getElementsByClassName('update-cart')

if (deleteBtns.length > 0) {
    for (var i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].addEventListener('click', function () {
            var ordenitemId = this.dataset.ordenitem
            console.log('USER:', user);
            if (user == 'AnonymousUser') {
                deleteItemOrden(ordenitemId)
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
                addCookieItem(productId, action, colorId, sizeId, quantity, this)
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
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            location.reload()
        })
}

function addCookieItem(productId, action, colorId, sizeId, quantity, context) {
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
            // Context of row 
            var orden_item_cantidad = context.parentElement
            var orden_item_total = orden_item_cantidad.parentElement.parentElement

            // Context of fields
            var item_cantidad = orden_item_cantidad.querySelector('.producto__cantidad-item')
            var item_total = orden_item_total.querySelector('.producto__total')

            // Global context of cart_items
            var carrito_total = document.querySelector('#carrito__total')
            var carrito_cantidad = document.querySelector('.carrito--icon span')

            if (data.quantityItem > 0) {
                item_cantidad.textContent = data.quantityItem
                item_total.textContent = "S/ " + data.totalItem.toFixed(2)
                carrito_total.textContent = "S/ " + data.totalItems.toFixed(2)
            } else {
                item_cantidad.parentElement.parentElement.parentElement.remove();
                carrito_total.textContent = "S/ " + data.totalItems.toFixed(2)
            }
            carrito_cantidad.textContent = data.cartItems
        })
}

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
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            // Context of row 
            var orden_item_cantidad = context.parentElement
            var orden_item_total = orden_item_cantidad.parentElement.parentElement

            // Context of fields
            var item_cantidad = orden_item_cantidad.querySelector('.producto__cantidad-item')
            var item_total = orden_item_total.querySelector('.producto__total')

            // Global context of cart_items
            var carrito_total = document.querySelector('#carrito__total')
            var carrito_cantidad = document.querySelector('.carrito--icon span')

            if (data.quantityItem > 0) {
                item_cantidad.textContent = data.quantityItem
                item_total.textContent = "S/ " + data.totalItem.toFixed(2)
                carrito_total.textContent = "S/ " + data.totalItems.toFixed(2)
            } else {
                item_cantidad.parentElement.parentElement.parentElement.remove();
                carrito_total.textContent = "S/ " + data.totalItems.toFixed(2)
            }
            carrito_cantidad.textContent = data.cartItems
        })

}