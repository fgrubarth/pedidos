const carro = new carritos()
const listaCompra = document.querySelector("#lista-compra tbody");
const carrito = document.getElementById('carrito');
const productos = document.getElementById('lista-productos');
const procesarCompraBtn = document.getElementById('procesar-compra');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
let limpiarStorage = document.getElementById("limpiarStorage")
let montoTotal = document.getElementById('total')

// para usuario
let usuario;
let formularioIdentificacion = document.getElementById(
    "formularioIdentificacion"
  );
let contenedorIdentificacion = document.getElementById(
    "contenedorIdentificacion");
let contenedorUsuario = document.getElementById("contenedorUsuario");
let textoUsuario = document.getElementById("textoUsuario");
let inputUsuario = document.getElementById("inputUsuario");


cargarEventos();

function cargarEventos(){
//boton agregar
    productos.addEventListener("click", (e)=>{carro.comprarProducto(e)});

    //Cuando se elimina productos del carrito
    carrito.addEventListener('click', (e)=>{carro.eliminarProducto(e)});

    carro.calcularTotal();

    //Al cargar documento se muestra lo almacenado en LS
    document.addEventListener('DOMContentLoaded', carro.leerLocalStorage());

    carrito.addEventListener('change', (e) => { carro.obtenerEvento(e) });
    
    procesarCompraBtn.addEventListener('click',(e)=>{carro.procesarCompra(e)});

     //Al vaciar carrito
     vaciarCarritoBtn.addEventListener('click', (e)=>{carro.vaciarCarrito(e)});
    
     //Vaciar LS
     limpiarStorage.addEventListener("click", (e)=>{carro.vaciarLocalStorage(e)});

     // usuario
    //  formularioIdentificacion.addEventListener( "onsubmit", (e) =>{ identificarUsuario(e)});
 
  }