// SIMULADOR DE PEDIDOS ICE WOLF (versión DOM)

let productos = [];

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
const btnFinalizar = document.getElementById("btnFinalizar");

async function cargarProductos() {
  try {
    const response = await fetch("./data/productos.json");
    productos = await response.json();
    cargarProductosEnPantalla();
  } catch (error) {
    Swal.fire("Error", "No se pudieron cargar los productos", "error");
  }
}


// Cargar productos en el <select>
function cargarProductosEnPantalla() {
  selectProductos.innerHTML = `<option value="">Seleccionar producto</option>`;

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
    Swal.fire({
  icon: "error",
  title: "Datos inválidos",
  text: "Ingresá una cantidad válida"
});
;
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
btnFinalizar.addEventListener("click", () => {
  if (pedido.length === 0) {
    Swal.fire({
      icon: "info",
      title: "Carrito vacío",
      text: "Agregá productos para continuar"
    });
    return;
  }

  Swal.fire({
    title: "¿Confirmar pedido?",
    text: `Total a pagar: $${total}`,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: "success",
        title: "Pedido confirmado",
        text: "Gracias por tu compra"
      });

      pedido = [];
      total = 0;
      localStorage.removeItem("pedido");
      mostrarCarrito();
    }
  });
});


// Inicialización
cargarProductos();
mostrarCarrito();
