var productosColor = document.querySelectorAll('.producto')

eventListenerColores()
function eventListenerColores(){			
	productosColor.forEach((producto) => {
		var colores = producto.querySelector('.producto__colores')
		colores.addEventListener('click', mostrarColor)
		var tallas = producto.querySelector('.producto__tallas')
		tallas.addEventListener('click', mostrarTalla)
	})			
}
function mostrarColor(e){
	var colores = this
	if(e.target.classList.contains('color')){				
		var coloresInactivos = colores.querySelectorAll(".producto__color")
		coloresInactivos.forEach(element => {
			element.classList.remove("active")
		});
		var color = e.target
		color.parentElement.classList.add("active")				
	}
}
function mostrarTalla(e){
  e.preventDefault()
	var tallas = this
	if(e.target.classList.contains('talla')){				
		var tallasInactivos = tallas.querySelectorAll(".talla")
		tallasInactivos.forEach(element => {
			element.classList.remove("active")
		});
		var talla = e.target
		talla.classList.add("active")		
	}
}