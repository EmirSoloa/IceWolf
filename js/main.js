// SIMULADOR DE PEDIDOS ICE WOLF (versión DOM)

// Array de productos con precios
const productos = [
  { nombre: "Hielo 2kg", precio: 3000 },
  { nombre: "Hielo 5kg", precio: 5000 },
  { nombre: "Hielo 15kg", precio: 8000 },
  { nombre: "Hielo Escama 20kg", precio: 9000 },
  { nombre: "Hielo Barra 25kg", precio: 10000 },
  { nombre: "Carbón Especial 10kg", precio: 9000 },
  { nombre: "Carbón Brasita 8kg", precio: 8000 },
  { nombre: "Carbón Común 8kg", precio: 7000 },
  { nombre: "Leña 10kg", precio: 7500 },
];

// Cargar pedido desde localStorage o iniciar vacío
let pedido = JSON.parse(localStorage.getItem("pedido")) || [];
let total = pedido.reduce((acc, item) => acc + item.subtotal, 0);

// Referencias al DOM
const selectProductos = document.getElementById("selectProductos");
const inputCantidad = document.getElementById("inputCantidad");
const btnAgregar = document.getElementById("btnAgregar");
const btnVaciar = document.getElementById("btnVaciar");
const contenedorCarrito = document.getElementById("carrito");
const totalHTML = document.getElementById("total");

// Cargar productos en el <select>
function cargarProductosEnPantalla() {
  productos.forEach((p, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${p.nombre} - $${p.precio}`;
    selectProductos.appendChild(option);
  });
}

// Renderizar carrito en el DOM
function mostrarCarrito() {
  contenedorCarrito.innerHTML = "";

  if (pedido.length === 0) {
    contenedorCarrito.innerHTML = "<p class='text-muted'>El carrito está vacío.</p>";
  }

  pedido.forEach((item) => {
    const div = document.createElement("div");
    div.className = "item-carrito border-bottom py-2";
    div.innerHTML = `
      <strong>${item.cantidad} x ${item.producto}</strong>
      <span class="float-end">$${item.subtotal}</span>
    `;
    contenedorCarrito.appendChild(div);
  });

  totalHTML.textContent = total;
}

// Evento para agregar producto
btnAgregar.addEventListener("click", () => {
  const indexProducto = parseInt(selectProductos.value);
  const cantidad = parseInt(inputCantidad.value);

  if (isNaN(indexProducto) || isNaN(cantidad) || cantidad <= 0) {
    alert("Completá correctamente la cantidad.");
    return;
  }

  const seleccionado = productos[indexProducto];
  const subtotal = seleccionado.precio * cantidad;

  const item = {
    producto: seleccionado.nombre,
    cantidad,
    subtotal,
  };

  pedido.push(item);
  total += subtotal;

  // Guardar en storage
  localStorage.setItem("pedido", JSON.stringify(pedido));

  // Actualizar DOM
  mostrarCarrito();

  // Limpiar input
  inputCantidad.value = "";
});

// Vaciar carrito
btnVaciar.addEventListener("click", () => {
  pedido = [];
  total = 0;
  localStorage.removeItem("pedido");
  mostrarCarrito();
});

// Inicialización
cargarProductosEnPantalla();
mostrarCarrito();

