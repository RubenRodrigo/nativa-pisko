from django.contrib import admin
from nested_admin import NestedModelAdmin, NestedStackedInline, NestedTabularInline
# Register your models here.
from .models import *

admin.site.register(Cliente)
admin.site.register(Catalogo)
admin.site.register(Categoria)
admin.site.register(Color)
admin.site.register(Talla)
admin.site.register(Orden)
admin.site.register(OrdenItem)

class ProductoTallaAdmin(NestedTabularInline):
    model = ProductoTalla
    extra = 1    

class ProductoColorAdmin(NestedTabularInline):    
    model = ProductoColor
    extra = 1  

class ProductoImagenesAdmin(NestedTabularInline):
    model = ProductoImagen
    extra = 1      

class ProductoAdmin(NestedModelAdmin):
    inlines = [ProductoImagenesAdmin, ProductoTallaAdmin, ProductoColorAdmin]
    change_form_template = 'admin/change_form.html'

admin.site.register(Producto, ProductoAdmin)
