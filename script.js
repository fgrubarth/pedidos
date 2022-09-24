// const productos = [
//   {
//     id: "1",
//     title: "hamburguesa",
//     price: 1200,
//     image: "hambu.jpg"
//   },
//   {
//     id: "2",
//     title: "empanada",
//     price: 70,
//     image: "empanada.jpg"
//   },
//   {
//     id: "3",
//     title: "pizza",
//     price: 1300,
//     image: "pizza.jpg"
//   },
//   {
//     id: "4",
//     title: "lomito",
//     price: 1500,
//     image: "lomito.jpg"
//   }
// ]

// let titulo;
// let precio;
// let imagen;
// let agregar = document.querySelectorAll("agregar");
// console.log(agregar)


const agregar = document.querySelectorAll('#agregar');
agregar.forEach((agregarPedido) => {
  agregarPedido.addEventListener('click', hacerClick);
});

const magia = document.querySelector(
    '.magia'
  );
  
  function hacerClick(event) {
    const boton = event.target;
    const item = boton.closest('.contenedor');
  
    const itemTitulo = item.querySelector('.titulo').textContent;
    const itemPrecio = item.querySelector('.precio').textContent;
    const itemImagen = item.querySelector('.foto').src;
    
    agregarCart(itemTitulo, itemPrecio, itemImagen);
  }

  function agregarCart(itemTitulo, itemPrecio, itemImagen){
    const elementsTitle = magia.getElementsByClassName(
      'itemCompraTitulo'
    );
    for (let i = 0; i < elementsTitle.length; i++) {
      if (elementsTitle[i].innerText === itemTitulo) {
        let elementQuantity = elementsTitle[
          i
        ].parentElement.parentElement.parentElement.querySelector(
          '.itemCompraCantidad'
        );
        elementQuantity.value++;
        aumentarPrecio();
        return;
      }
    }


  const div = document.createElement('div');
  const pedido = `<div class="row itemCompra">
  <div class="col-6">
      <div class=" d-flex align-items-center h-100 border-bottom pb-2 pt-3">
          <img src=${itemImagen} class="imagenCarro">
          <h6 class="itemCompraTitulo text-truncate ml-3 mb-0">${itemTitulo}</h6>
      </div>
  </div>
  <div class="col-2">
      <div class=" d-flex align-items-center h-100 border-bottom pb-2 pt-3">
          <p class="itemCompraPrecio mb-0 ">${itemPrecio}</p>
      </div>
  </div>
  <div class="col-4">
      <div
          class=" d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
          <input class="itemCompraCantidad" type="number"
              value="1">
          <button class="btn btn-danger borrar" type="button">X</button>
      </div>
  </div>
</div>`
div.innerHTML = pedido;
magia.append(div);

div.querySelector(".borrar").addEventListener("click", borrar)

div.querySelector('.itemCompraCantidad').addEventListener('change', cambiarCantidad);
// actualizarProductosStorage()
// obtenerProductosStorage()
aumentarPrecio();
}

function aumentarPrecio(){
  let total= 0;
  const precioTotal = document.querySelector('.precioTotales');
  
  const itemCompras = document.querySelectorAll('.itemCompra')
  
  
  itemCompras.forEach((itemCompra) => {
    const itemPrecioTotal = itemCompra.querySelector(
      '.itemCompraPrecio'
      
    );
   
  const precio = itemPrecioTotal.textContent.replace("$", "");
  console.log(precio)
  
  const cantidadTotal = itemCompra.querySelector(
    '.itemCompraCantidad'
  );
  
  const itemCompraCantidad = 
    cantidadTotal.value;
    console.log(itemCompraCantidad)
  total = total + precio * itemCompraCantidad;
  console.log(total)
  });
  precioTotal.innerHTML = `$${total.toFixed(0)}`;

}

function cambiarCantidad(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  aumentarPrecio();
}

function borrar(event){
  const botonBorrar = event.target
  botonBorrar.closest('.itemCompra').remove();
  aumentarPrecio();

}

// function actualizarProductosStorage() {
//   let productosJSON = JSON.stringify("agregar");
//   localStorage.setItem("agregar", productosJSON);
// }

// function obtenerProductosStorage() {
//   let productosJSON = localStorage.getItem("agregar");
//   if (productosJSON) {
//     agregar = JSON.parse(productosJSON);
//     agregarCart();
//   }
// }

