from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Cliente(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    nombre = models.CharField(max_length=200, null=True, blank=True)
    apellido = models.CharField(max_length=200, null=True, blank=True)
    device = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        if self.nombre:
            nombre = self.nombre
        else:
            nombre = self.device
        return str(nombre)

class Catalogo(models.Model):    
    nombre = models.CharField(max_length=200, null=True)
    def __str__(self):
        return self.nombre

class Categoria(models.Model):
    catalogo = models.ForeignKey(Catalogo, on_delete=models.SET_NULL, null=True, blank=True)
    nombre = models.CharField(max_length=200, null=True)
    def __str__(self):
        return self.catalogo.nombre +" + "+ self.nombre

class Producto(models.Model):
    catalogo = models.ForeignKey(Catalogo, on_delete=models.SET_NULL, null=True, blank=True)
    categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True, blank=True)    
    nombre = models.CharField(max_length=500, null=True)
    caracteristicas = models.CharField(max_length=1000, null=True)    
    stock = models.IntegerField(default=0)
    precio = models.FloatField(null=True, blank=True)
    precioFalso = models.FloatField(null=True, blank=True)    
    date_added = models.DateTimeField(auto_created=True, null=True, blank=True)
    def __str__(self):
        return self.nombre

class ProductoColor(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, null=True, blank=True)
    color = models.ForeignKey("Color", on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.color.nombre

class ProductoTalla(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, null=True, blank=True)
    talla = models.ForeignKey("Talla", on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.talla.nombre

class ProductoImagen(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, null=True, blank=True)
    imagen = models.ImageField(upload_to="productos/", null=True)

    @property
    def imagenURL(self):
        try:
            url = self.imagen.url
        except:
            url = ''
        return url


class Color(models.Model):    
    nombre = models.CharField(max_length=200, null=True)
    codigo = models.CharField(max_length=100, null=True)
    def __str__(self):
        return self.nombre

class Talla(models.Model):    
    nombre = models.CharField(max_length=200, null=True)    
    def __str__(self):
        return self.nombre

class Orden(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.SET_NULL, blank=True, null=True)
    date_orden = models.DateTimeField(auto_now_add=True)
    completo = models.BooleanField(default=False, null=True, blank=True)
    transaccion_id = models.CharField(max_length=200, null=True)

    def __str__(self):
        return str(self.id)

    @property
    def envio(self):
        envio = False
        ordenitems = self.ordenitem_set.all()
        for i in ordenitems:
            if i.producto.stock > 0:
                envio = True
        return envio
        
    @property
    def get_cart_total(self):
        ordenitems = self.ordenitem_set.all()
        total = sum([item.get_total for item in ordenitems])
        return total

    @property
    def get_cart_items(self):
        ordenitems = self.ordenitem_set.all()
        total = sum([item.cantidad for item in ordenitems])
        return total

class OrdenItem(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.SET_NULL, blank=True, null=True)
    producto_color = models.ForeignKey(ProductoColor, on_delete=models.SET_NULL, blank=True, null=True)
    producto_talla = models.ForeignKey(ProductoTalla, on_delete=models.SET_NULL, blank=True, null=True)
    orden = models.ForeignKey(Orden, on_delete=models.SET_NULL, blank=True, null=True)
    cantidad = models.IntegerField(default=0, null=True, blank=True)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)

    @property
    def get_total(self):
        total = self.producto.precio * self.cantidad
        return total