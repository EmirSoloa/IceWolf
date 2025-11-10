// -------------------------------
// SIMULADOR DE PEDIDOS ICE WOLF
// -------------------------------

// Array de productos con precios
const productos = [
  { nombre: "Hielo 15kg", precio: 8000 },
  { nombre: "Carbón 10kg", precio: 9000 },
  { nombre: "Leña 10kg", precio: 7500 },
];

// Variable para guardar el total
let total = 0;

// Array para guardar el pedido
let pedido = [];

// Función para mostrar los productos en consola
function mostrarProductos() {
  console.log("=== PRODUCTOS DISPONIBLES ===");
  productos.forEach((p, index) => {
    console.log(`${index + 1}. ${p.nombre} - $${p.precio}`);
  });
}

// Función para agregar un producto al pedido
function agregarProducto() {
  mostrarProductos();

  let opcion = parseInt(prompt("Elegí un producto (1, 2 o 3):"));
  let cantidad = parseInt(prompt("¿Cuántas unidades querés comprar?"));

  // Validación
  if (opcion >= 1 && opcion <= productos.length && cantidad > 0) {
    let seleccionado = productos[opcion - 1];
    let subtotal = seleccionado.precio * cantidad;
    total += subtotal;

    // Guardar en array de pedido
    pedido.push({
      producto: seleccionado.nombre,
      cantidad: cantidad,
      subtotal: subtotal,
    });

    alert(`Agregaste ${cantidad} x ${seleccionado.nombre} al carrito.\nSubtotal: $${subtotal}`);
  } else {
    alert("⚠️ Ingreso inválido. Intentá nuevamente.");
  }
}

// Función para mostrar el resumen final
function mostrarResumen() {
  console.log("=== RESUMEN DE TU PEDIDO ===");
  pedido.forEach(item => {
    console.log(`${item.cantidad} x ${item.producto} = $${item.subtotal}`);
  });
  console.log(`TOTAL A PAGAR: $${total}`);
  alert(`Tu total a pagar es de $${total}`);
}

// -------------------------------
// EJECUCIÓN DEL SIMULADOR
// -------------------------------

alert("Bienvenido al simulador de pedidos de Ice Wolf 🧊🔥");

let seguir = true;

while (seguir) {
  agregarProducto();
  seguir = confirm("¿Querés agregar otro producto?");
}

mostrarResumen();

alert("¡Gracias por tu compra! ❄️");

