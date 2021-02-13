from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'tienda/index.html')

def tienda(request):
    return render(request, 'tienda/tienda.html')

def colecciones(request):
    return render(request, 'tienda/colecciones.html')

def compromiso(request):
    return render(request, 'tienda/compromiso.html')

def producto(request, producto_id):
    return render(request, 'tienda/producto.html')

def servicio(request):
    return render(request, 'tienda/servicio.html')

def contactos(request):
    return render(request, 'tienda/contactos.html')