const carro = new carritos()
const listaCompra = document.querySelector("#lista-compra tbody");
const carrito = document.getElementById('carrito');
const productos = document.getElementById('lista-productos');
const procesarCompraBtn = document.getElementById('procesar-compra');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
let montoTotal = document.getElementById('total')
//pintar dom
let magia2 = document.getElementById("magia2")


cargarEventos();

function cargarEventos(){
//boton agregar
    productos.addEventListener("click", (e)=>{carro.comprarProducto(e)});

    //Cuando se elimina productos del carrito
    carrito.addEventListener('click', (e)=>{carro.eliminarProducto(e)});
// dom
//  carro.pintarDom();

//calcular total
    carro.calcularTotal();

    //Al cargar documento se muestra lo almacenado en LS
    document.addEventListener('DOMContentLoaded', carro.leerLocalStorage());

    carrito.addEventListener('change', (e) => { carro.obtenerEvento(e) });
    
    procesarCompraBtn.addEventListener('click',(e)=>{carro.procesarCompra(e)});

     //Al vaciar carrito
     vaciarCarritoBtn.addEventListener('click', (e)=>{carro.vaciarCarrito(e)});
    
    
  }