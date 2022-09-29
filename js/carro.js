const carro = new carrito()
const productos = document.getElementById("lista-productos");
const magia = document.querySelector('.magia');


cargarEventos();

function cargarEventos(){
//boton agregar
    productos.addEventListener("click", (e)=>{carro.comprarProducto(e)});

 
  }