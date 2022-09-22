const agregar = document.querySelectorAll('.btn');
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
              value="1" min="1">
          <button class="btn btn-danger borrar" type="button">X</button>
      </div>
  </div>
</div>`
div.innerHTML = pedido;
magia.append(div);

div.querySelector(".borrar").addEventListener("click", borrar)

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

function borrar(event){
  const botonBorrar = event.target
  botonBorrar.closest('.itemCompra').remove();
  aumentarPrecio();

}




