const productos = [
  {
    id: "0",
    title: "Hamburguesa",
    price: 1200,
    image: "hambu.jpg",
  },
  {
    id: "1",
    title: "Empanada",
    price: 70,
    image: "empanada.jpg",
  },
  {
    id: "2",
    title: "Pizza",
    price: 1300,
    image: "pizza.jpg",
  },
  {
    id: "3",
    title: "Lomito",
    price: 1500,
    image: "lomito.jpg",
  },
];
let id;
let titulo;
let precio;
let imagen;
let chacho = []
console.log(chacho)

class Producto {
  constructor(id, titulo, precio, imagen) {
    this.id = id;
    this.titulo = titulo;
    this.precio = precio;
    this.imagen = imagen;
    
  }
}


const magia2 = document.querySelector(".magia2");

const div2 = document.createElement("div");

let menu;
for (let i = 0; i < productos.length; i++) {
  menu += "<div class='row'><h5 class='titulo'>" + productos[i].title + "</h5>";
  menu +=
    "<img class='foto' src='imagenes/" +
    productos[i].image +
    "' alt='hamburguesa' /></div>";
  menu += "<div class='precio'>" + "$" + productos[i].price + "</div>";
  menu +=
    "<div><button onClick='agregar(" +
    productos[i].id +
    ")' class='btn btn-primary' id=' " +
    productos[i].id +
    "'>Añadir</button>";


}

div2.innerHTML = menu;
magia2.append(div2);

const magia = document.querySelector(".magia");

function agregar(event) {
  const item = productos[event];

  
  let itemId = item.id;  
  let itemTitulo = item.title;
  let itemPrecio = item.price;
  let itemImagen = item.image;

  const idExiste = chacho.some((producto) => producto.id === itemId);
  if (!idExiste) {
    let producto = new Producto(
      itemId,
      itemTitulo,
      itemPrecio,
      itemImagen
      
    ); 

chacho.push(producto)

// pintar() 

    }

  agregarCart(itemId, itemTitulo, itemPrecio, itemImagen);
}
function agregarCart(itemId, itemTitulo, itemPrecio, itemImagen) {
  const elementsTitle = magia.getElementsByClassName("itemCompraTitulo");
  for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === itemTitulo) {
      let elementQuantity = elementsTitle[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        ".itemCompraCantidad",
      );
      elementQuantity.value++;
      aumentarPrecio();
      return;
    }
  }

  
  actualizarProductosStorage();
  obtenerProductosStorage();
  aumentarPrecio();
}
function pintar(){
  magia.innerHTML="";
  chacho.forEach((producto) => {
let div = document.createElement("div");
  div.innerHTML = `<div class="row itemCompra">
  <div class="col-6">
      <div class=" d-flex align-items-center h-100 border-bottom pb-2 pt-3">
          <img src=imagenes/${producto.itemImagen} class="imagenCarro">
          <h6 class="itemCompraTitulo text-truncate ml-3 mb-0"> ${producto.itemTitulo}</h6>
      </div>
  </div>
  <div class="col-2">
      <div class=" d-flex align-items-center h-100 border-bottom pb-2 pt-3">
          <p class="itemCompraPrecio mb-0 ">$${producto.itemPrecio}</p>
      </div>
  </div>
  <div class="col-4">
      <div
          class=" d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
          <input class="itemCompraCantidad" type="number"
              value="1">
          <button class="ml-2 btn btn-danger borrar" id="botonEliminar-${producto.id}" type="button">X</button>
      </div>
  </div>
</div>`;
  
  magia.append(div);

  div.querySelector(`#botonEliminar-${producto.id}`).addEventListener("click", borrar);
  // let botonEliminar = document.getElementById(`botonEliminar-${itemId.id}`);
  //   botonEliminar.onclick = () => borrar(itemId.id);

  div
    .querySelector(".itemCompraCantidad")
    .addEventListener("change", cambiarCantidad);
})
}

function aumentarPrecio() {
  let total = 0;
  const precioTotal = document.querySelector(".precioTotales");

  const itemCompras = document.querySelectorAll(".itemCompra");

  itemCompras.forEach((itemCompra) => {
    const itemPrecioTotal = itemCompra.querySelector(".itemCompraPrecio");

    const precio = itemPrecioTotal.textContent.replace("$", "");

    const cantidadTotal = itemCompra.querySelector(".itemCompraCantidad");

    const itemCompraCantidad = cantidadTotal.value;
    total = total + precio * itemCompraCantidad;
  });
  precioTotal.innerHTML = `$${total.toFixed(0)}`;
}

function cambiarCantidad(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  aumentarPrecio();
}

function borrar(event) {
  const botonBorrar = event.target;
  botonBorrar.closest(".itemCompra").remove();
  // let columnaBorrar = document.getElementById(`columna-${itemId}`);
  // let indiceBorrar = productos.findIndex(
  //   (producto) => Number(producto.id) === Number(itemId)
  // );

  // chacho.splice(indiceBorrar, 1);
  // columnaBorrar.remove()

  actualizarProductosStorage()
  aumentarPrecio();
}

function actualizarProductosStorage() {
  let productosJSON = JSON.stringify(chacho);
  localStorage.setItem("chacho", productosJSON);
}

function obtenerProductosStorage() {
  let productosJSON = localStorage.getItem("chacho");
  if(productosJSON){
    chacho = JSON.parse(productosJSON);
    
  }
}
