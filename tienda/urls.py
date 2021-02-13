from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('tienda/', views.tienda, name="tienda"),
    # path('tienda/<catalogo_name>/', views.tienda_catalogo, name="tienda_catalogo"),
    # path('tienda/<catalogo_name>/<categoria_name>', views.tienda_categoria, name="tienda_categoria"),
    path('colecciones/', views.colecciones, name="colecciones"),
    path('servicio/', views.servicio, name="servicio"),
    path('compromiso/', views.compromiso, name="compromiso"),
    path('contactos/', views.contactos, name="contactos"),
    path('producto/<int:producto_id>/', views.producto, name="producto"),
]