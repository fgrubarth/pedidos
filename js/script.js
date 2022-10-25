
 //pintar dom
 async function consultarProductosServer(){
  try {
    const response = await fetch(
      "https://633f1c0883f50e9ba3bfe80f.mockapi.io/api/comidas"
    );
    const data = await response.json();
    productes = [...data];
    pintarDom()
  } catch{
    console.log("error");
  }
}
function pintarDom(){
  
    for (let i = 0; i < productes.length; i++){
    const row = document.createElement('div');
    row.innerHTML = `
    <h4 class="titulo">${productes[i].titulo}</h4>
    <img class="foto" src="imagenes/${productes[i].imagen}" alt="${productes[i].titulo}">
    <p class="precio">
    ${productes[i].precio}
    </p>
    <button type="submit" id="agregar" class="btn btn-primary agregar-carrito" data-id=${productes[i].id}>Añadir</button>
    `;
    magia2.appendChild(row);}
;

}

consultarProductosServer();


class carritos{
  //para añadir al carrito
      comprarProducto(e){
        
        //Delegado para agregar al carrito
        if(e.target.classList.contains('agregar-carrito')){
            const producto = e.target.parentElement;
            //Enviamos el producto seleccionado para tomar sus datos
            this.leerDatosProducto(producto);
        }
}

leerDatosProducto(producto){
  const infoProducto = {
    imagen : producto.querySelector("img").src,
    titulo : producto.querySelector("h4").textContent,
    precio : producto.querySelector("p").textContent,
    id : producto.querySelector("button").getAttribute('data-id'),
    cantidad : 1
  }
  let productosLS;
  productosLS = this.obtenerProductosLocalStorage();
  productosLS.forEach(function(productoLS){
    if(productoLS.id === infoProducto.id){
      productosLS = productoLS.id;
    }
  });
  if(productosLS === infoProducto.id){
    Swal.fire({
      type: 'info',
      title: 'Oops...',
      text: 'El producto ya está agregado',
      showConfirmButton: false,
      timer: 1000
  })
  }
  else {
    this.insertarCarrito(infoProducto);
    this.calcularTotal();
  }
}


insertarCarrito(producto){
  const row = document.createElement('tr');
  row.innerHTML = `
      <td>
          <img src="${producto.imagen}" width=100>
      </td>
      <td>${producto.titulo}</td>
      <td>${producto.precio}</td>
      <td>
      <input type="number" class="form-control cantidad" min="1" value=${producto.cantidad}>
      </td>
      <td id='subtotales'>${producto.precio * producto.cantidad}</td>
      <td>
         <a href="#" class="borrar-producto fas fa-times-circle" style="font-size:30px" data-id="${producto.id}">X</a>
      </td>
      </td>
  `;
  listaCompra.appendChild(row);
  
  this.guardarProductosLocalStorage(producto);

}

 //Eliminar el producto del carrito en el DOM
 eliminarProducto(e){
  
  let producto, productoID;
  if(e.target.classList.contains('borrar-producto')){
      e.target.parentElement.parentElement.remove();
      producto = e.target.parentElement.parentElement;
      productoID = producto.querySelector('a').getAttribute('data-id');
  }
  this.eliminarProductoLocalStorage(productoID);
  this.calcularTotal();

}
//almacenar en ls
guardarProductosLocalStorage(producto){
  let productos;
  //Toma valor de un arreglo con datos del LS
  productos = this.obtenerProductosLocalStorage();
  //Agregar el producto al carrito
  productos.push(producto);
  //Agregamos al LS
  localStorage.setItem('productos', JSON.stringify(productos));
}
//Comprobar que hay elementos en el LS
obtenerProductosLocalStorage(){
  let productoLS;

  //Comprobar si hay algo en LS
  if(localStorage.getItem('productos') === null){
      productoLS = [];
  }
  else {
      productoLS = JSON.parse(localStorage.getItem('productos'));
  }
  return productoLS;

}
//Eliminar producto por ID del LS
eliminarProductoLocalStorage(productoID){
    let productosLS;
    //Obtenemos el arreglo de productos
    productosLS = this.obtenerProductosLocalStorage();
    //Comparar el id del producto borrado con LS
    productosLS.forEach(function(productoLS, index){
        if(productoLS.id === productoID){
            productosLS.splice(index, 1);
        }
    })
    localStorage.setItem('productos', JSON.stringify(productosLS)); 
    
  }

 //Mostrar los productos guardados en el LS
 leerLocalStorage(){
  let productosLS;
  productosLS = this.obtenerProductosLocalStorage();
  productosLS.forEach(function (producto){
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>
              <img src="${producto.imagen}" width=100>
          </td>
          <td>${producto.titulo}</td>
          <td>${producto.precio}</td>
          <td>
              <input type="number" class="form-control cantidad" min="1" value=${producto.cantidad}>
          </td>
          <td id='subtotales'>${producto.precio * producto.cantidad}</td>
          <td>
            <a href="#" class="borrar-producto fas fa-times-circle" style="font-size:30px" data-id="${producto.id}">X</a>
          </td>
      `;
      listaCompra.appendChild(row);
  });
 
}

 //Calcular montos
calcularTotal(){
    let productosLS;
    let total = 0;
    productosLS = this.obtenerProductosLocalStorage();
    for(let i = 0; i < productosLS.length; i++){
        let element = Number(productosLS[i].precio * productosLS[i].cantidad);
        total = total + element;
        
    }
    
    montoTotal.value = "$" + total;
}
obtenerEvento(e) {
  e.preventDefault();
  let id, cantidad, producto, productosLS;
  if (e.target.classList.contains('cantidad')) {
      producto = e.target.parentElement.parentElement;
      id = producto.querySelector('a').getAttribute('data-id');
      cantidad = producto.querySelector('input').value;
      let actualizarMontos = document.querySelectorAll('#subtotales');
      productosLS = this.obtenerProductosLocalStorage();
      productosLS.forEach(function (productoLS, index) {
          if (productoLS.id === id) {
              productoLS.cantidad = cantidad;                    
              actualizarMontos[index].innerHTML = Number(cantidad * productosLS[index].precio);
          }    
      });
      localStorage.setItem('productos', JSON.stringify(productosLS));
  }

}
 procesarCompra() {
  // e.preventDefault();
  if (carro.obtenerProductosLocalStorage().length === 0) {
      Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'No hay productos, selecciona alguno',
          showConfirmButton: false,
          timer: 2000
      })
} else{
  Swal.fire({
    title: '¿Estas seguro que quieres realidar la compra?',
    text: "",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Comprar '
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Compra exitosa',
        'Muchas gracias',
        'success'
      )
      this.vaciarLocalStorage()
    }
  })
}
}

 //Elimina todos los productos
 vaciarCarrito(){
  if (carro.obtenerProductosLocalStorage().length === 0) {
    Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'No hay productos para borrar',
        showConfirmButton: false,
        timer: 2000
    })
}else{
    Swal.fire({
      title: '¿Estas seguro que quieres borrar el carrito?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Comprar '
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Carrito borrado',
          "",
          'success'
        )
        this.vaciarLocalStorage()
      }
    })
 }
  }

 //Eliminar todos los datos del LS
 vaciarLocalStorage(){
  localStorage.clear();
  listaCompra.innerHTML="";
  this.calcularTotal()
  }
}








