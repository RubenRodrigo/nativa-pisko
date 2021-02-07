var categoria = document.getElementById("navbarDarkDropdownMenuLink")
var categorias = document.getElementById("categorias")
var categoriasMovil = document.getElementById("categorias-movil")

eventListener()
function eventListener() {
    categoria.addEventListener('click', mostrarCategorias)
}
function mostrarCategorias(e) {
    e.preventDefault()

    if (categorias.classList.contains("categorias--active")) {
        categorias.classList.remove("categorias--active")
        // categorias.classList.add("categorias--inactive") 
    } else {
        categorias.classList.add("categorias--active")   
        // categorias.classList.remove("categorias--inactive") 
    }

    if (categoriasMovil.classList.contains("categorias-movil--active")) {
        categoriasMovil.classList.remove("categorias-movil--active")
        // categorias.classList.add("categorias--inactive") 
    } else {
        categoriasMovil.classList.add("categorias-movil--active")   
        // categorias.classList.remove("categorias--inactive") 
    }    
}
function myFunction(x) {    
    if (x.matches) { // If media query matches
        categorias.style.display = 'none'
        categoriasMovil.style.display = 'block'
    } else {        
        categorias.style.display = 'block'
        categoriasMovil.style.display = 'none'
    }
}
  
var x = window.matchMedia("(max-width: 767px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes 