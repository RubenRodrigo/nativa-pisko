import json
import uuid
from .models import *

# def cookieCart(request):
    
#     try:
#         cart = json.loads(request.COOKIES['cart'])
#     except:
#         cart = {}

#     print('Cart:', cart)
#     items = []
#     orden = {'get_cart_total':0, 'get_cart_items': 0, 'shipping': False}
#     cartItems = order['get_cart_items']

#     for i in cart:
#         try:
#             cartItems += cart[i]["quantity"]
#             producto = Producto.objects.get(id=i)
#             total = (producto.price * cart[i]["quantity"])
            
#             order['get_cart_total'] += total
#             order['get_cart_items'] += cart[i]["quantity"]

#             item = {
#                 'product':{
#                     'id':producto.id,
#                     'name':producto.name,
#                     'price':producto.price,
#                     'imageURL':producto.imageURL,
#                 },
#                 'quantity':cart[i]["quantity"],
#                 'get_total':total
#             }
#             items.append(item)

#             if product.digital == False:
#                 order['shipping'] = True
#         except:
#             pass
    
#     return {'cartItems':cartItems, 'order':order, 'items':items}

def cartData(request):
    
    if request.user.is_authenticated:
        cliente = request.user.cliente
        orden, created = Orden.objects.get_or_create(cliente=cliente, completo=False)
        items = orden.ordenitem_set.all()
        cartItems = orden.get_cart_items
    else:
        try:
            device = request.COOKIES['device']
        except:
            device = uuid.uuid4()
            print(device)
        cliente, created = Cliente.objects.get_or_create(device=device)
        orden, created = Orden.objects.get_or_create(cliente=cliente, completo=False)
        items = orden.ordenitem_set.all()
        cartItems = orden.get_cart_items        

    return {'cartItems':cartItems, 'orden':orden, 'items':items, 'cliente': cliente}
    
# def guestOrder(request, data):
#     print('User is not logged in')
#     print('COOKIES:', request.COOKIES)
#     name = data['form']['name']
#     email = data['form']['email']

#     cookieData = cookieCart(request)
#     items = cookieData['items']
#     customer, created = Customer.objects.get_or_create(
#         email=email
#     )
#     customer.name = name
#     customer.save()
#     order = Order.objects.create(
#         customer=customer,
#         complete=False
#     )

#     for item in items:
#         product = Product.objects.get(id=item['product']['id'])
#         orderItem = OrderItem.objects.create(
#             product=product,
#             order=order,
#             quantity=item['quantity']
#         )
#     return customer, order
