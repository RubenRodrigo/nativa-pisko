from django.conf.urls import url
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('register/', views.registerPage, name="register"),
    path('login/', views.loginPage, name="login"),
    path('logout/', views.logoutUser, name="logout"),
    path('carrito/', views.carrito, name="carrito"),

    path('tienda/', views.tienda, name="tienda"),
    path('tienda/<catalogo_name>/', views.tienda_catalogo, name="tienda_catalogo"),
    path('tienda/<catalogo_name>/<categoria_name>', views.tienda_categoria, name="tienda_categoria"),    
    path('colecciones/', views.colecciones, name="colecciones"),
    path('colecciones/<coleccion>/', views.coleccion, name="coleccion"),
    path('servicio/', views.servicio, name="servicio"),
    path('compromiso/', views.compromiso, name="compromiso"),
    path('compromiso/<compromiso>/', views.compromiso_tipo, name="compromiso_tipo"),
    path('contactos/', views.contactos, name="contactos"),
    path('producto/<int:producto_id>/', views.producto, name="producto"),
    url(r'^getCategory/(?P<pk>[0-9]+)/$', views.get_category),
    path('update_item/', views.updateItem, name="updateItem"),
    path('delete_item/', views.deleteItem, name="deleteItem"),
]