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
  const pedido = `<div class="row ">
  <div class="col-6">
      <div class=" d-flex align-items-center h-100 border-bottom pb-2 pt-3">
          <img src=${itemImagen} class="imagenCarro">
          <h6 class=" text-truncate ml-3 mb-0">${itemTitulo}</h6>
      </div>
  </div>
  <div class="col-2">
      <div class=" d-flex align-items-center h-100 border-bottom pb-2 pt-3">
          <p class=" mb-0 ">${itemPrecio}</p>
      </div>
  </div>
  <div class="col-4">
      <div
          class=" d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
          <input type="number"
              value="1" min="1">
          <button class="btn btn-danger" type="button">X</button>
      </div>
  </div>
</div>`
div.innerHTML = pedido;
  magia.append(div);
  }