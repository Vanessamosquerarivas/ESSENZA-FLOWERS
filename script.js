

const enlaces = document.querySelectorAll("header a");
const secciones = document.querySelectorAll("main section");

function mostrarSeccion(id) {
    secciones.forEach(function(seccion) {
        seccion.hidden = seccion.id !== id;
    });
}

mostrarSeccion("inicio");

enlaces.forEach(function(enlace) {
    enlace.addEventListener("click", function(event) {
        const id = enlace.getAttribute("href");

        if (!id || !id.startsWith("#")) {
            return;
        }

        event.preventDefault();
        mostrarSeccion(id.substring(1));
    });
});
const botonDescubrir = document.querySelector("#inicio a");

botonDescubrir.addEventListener("click", function(event) {
    event.preventDefault();
    mostrarSeccion("flores");
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
const tarjetas = document.querySelectorAll("#flores article");
let carrito = [];

function crearElemento(etiqueta, clases, contenido) {
    const elemento = document.createElement(etiqueta);
    elemento.className = clases;

    if (contenido) {
        elemento.textContent = contenido;
    }

    return elemento;
}

function formatoPrecio(precio) {
    return precio.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0
    });
}

const panelCarrito = crearElemento(
    "aside",
    "fixed bottom-4 right-4 z-40 w-80 max-w-[calc(100%-2rem)] rounded-2xl border border-[#E6B8C5] bg-white p-5 shadow-2xl"
);

const tituloCarrito = crearElemento(
    "h2",
    "mb-3 text-xl font-bold text-[#A64D79]",
    "Mi carrito"
);

const contadorCarrito = crearElemento(
    "p",
    "mb-3 text-sm font-semibold text-[#704F55]",
    "Productos: 0"
);

const listaCarrito = crearElemento(
    "div",
    "mb-4 flex max-h-52 flex-col gap-3 overflow-y-auto"
);

const totalCarrito = crearElemento(
    "p",
    "border-t border-rose-100 pt-3 text-lg font-bold text-[#C75B7A]",
    "Total: $0"
);

const vaciarCarrito = crearElemento(
    "button",
    "mt-3 w-full rounded-full bg-[#FBE5EC] px-4 py-2 font-bold text-[#A64D79] transition hover:bg-rose-200",
    "Vaciar carrito"
);

const cerrarCarrito = crearElemento(
    "button",
    "absolute right-4 top-4 text-xl font-bold text-[#A64D79]",
    "×"
);

panelCarrito.append(
    tituloCarrito,
    contadorCarrito,
    listaCarrito,
    totalCarrito,
    vaciarCarrito,
    cerrarCarrito
);

panelCarrito.hidden = true;
document.body.appendChild(panelCarrito);

const botonCarrito = crearElemento(
    "button",
    "fixed bottom-4 left-4 z-40 rounded-full bg-[#C75B7A] px-6 py-3 font-bold text-white shadow-lg transition hover:bg-[#A64D79]",
    "🛒 Carrito (0)"
);

document.body.appendChild(botonCarrito);

botonCarrito.addEventListener("click", function() {
    panelCarrito.hidden = !panelCarrito.hidden;
});

cerrarCarrito.addEventListener("click", function() {
    panelCarrito.hidden = true;
});

function actualizarCarrito() {
    listaCarrito.innerHTML = "";

    let cantidadTotal = 0;
    let precioTotal = 0;

    carrito.forEach(function(producto) {
        cantidadTotal += producto.cantidad;
        precioTotal += producto.precio * producto.cantidad;

        const fila = crearElemento(
            "div",
            "flex items-center justify-between gap-2 rounded-lg bg-[#FFF8F5] p-2"
        );

        const informacion = crearElemento(
            "div",
            "flex-1"
        );

        const nombre = crearElemento(
            "p",
            "font-bold text-[#A64D79]",
            producto.nombre
        );

        const cantidad = crearElemento(
            "p",
            "text-sm text-[#704F55]",
            "Cantidad: " + producto.cantidad
        );

        informacion.append(nombre, cantidad);

        const eliminar = crearElemento(
            "button",
            "rounded-lg px-3 py-1 font-bold text-red-500 hover:bg-rose-100",
            "Eliminar"
        );

        eliminar.addEventListener("click", function() {
            carrito = carrito.filter(function(item) {
                return item.nombre !== producto.nombre;
            });

            actualizarCarrito();
        });

        fila.append(informacion, eliminar);
        listaCarrito.appendChild(fila);
    });

    contadorCarrito.textContent = "Productos: " + cantidadTotal;
    totalCarrito.textContent = "Total: " + formatoPrecio(precioTotal);
    botonCarrito.textContent = "🛒 Carrito (" + cantidadTotal + ")";
}

vaciarCarrito.addEventListener("click", function() {
    carrito = [];
    actualizarCarrito();
});

tarjetas.forEach(function(tarjeta) {
    const nombre = tarjeta.querySelector("h3").textContent.trim();
    const descripcion = tarjeta.querySelector("p").textContent.trim();
    const precioTexto = tarjeta.querySelector(".text-lg").textContent;
    const precio = Number(precioTexto.replace(/\D/g, ""));
    const imagen = tarjeta.querySelector("img");
    const contenido = tarjeta.querySelector("div");

    const botonDetalles = crearElemento(
        "button",
        "mt-4 w-full rounded-full border border-[#D99AAF] bg-white px-4 py-2 font-bold text-[#A64D79] transition hover:bg-[#FBE5EC]",
        "Ver detalles"
    );

    const detalles = crearElemento(
        "div",
        "mt-3 rounded-xl bg-[#FBE8EE] p-4 text-sm leading-6 text-[#704F55]"
    );

    detalles.textContent = descripcion +
        " Cada ramo cuenta con una presentación especial. Puedes consultar por colores y personalizar tu pedido.";

    detalles.hidden = true;

    botonDetalles.addEventListener("click", function() {
        detalles.hidden = !detalles.hidden;

        botonDetalles.textContent = detalles.hidden
            ? "Ver detalles"
            : "Ocultar detalles";
    });

    const etiquetaCantidad = crearElemento(
        "label",
        "mt-4 block text-sm font-semibold text-[#704F55]",
        "Cantidad de ramos:"
    );

    const cantidad = crearElemento(
        "input",
        "mt-2 w-full rounded-xl border border-[#E6B8C5] bg-white px-4 py-2 text-center text-[#704F55] outline-none focus:border-[#C75B7A]"
    );

    cantidad.type = "number";
    cantidad.min = "1";
    cantidad.max = "99";
    cantidad.value = "1";

    etiquetaCantidad.appendChild(cantidad);

    const botonAgregar = crearElemento(
        "button",
        "mt-3 w-full rounded-full bg-[#D99AAF] px-4 py-3 font-bold text-white transition hover:bg-[#C75B7A]",
        "Agregar al carrito"
    );

    botonAgregar.addEventListener("click", function() {
        const unidades = Number(cantidad.value);

        if (!Number.isInteger(unidades) || unidades < 1 || unidades > 99) {
            alert("Selecciona una cantidad entre 1 y 99.");
            cantidad.value = "1";
            return;
        }

        const productoExistente = carrito.find(function(producto) {
            return producto.nombre === nombre;
        });

        if (productoExistente) {
            productoExistente.cantidad += unidades;
        } else {
            carrito.push({
                nombre: nombre,
                precio: precio,
                cantidad: unidades
            });
        }

        actualizarCarrito();
        alert(nombre + " se agregó al carrito.");
        cantidad.value = "1";
    });

    imagen.classList.add("cursor-zoom-in");

    imagen.addEventListener("click", function() {
        const ventana = document.createElement("dialog");

        ventana.className =
            "m-auto w-[90%] max-w-2xl rounded-2xl bg-white p-4 shadow-2xl backdrop:bg-black/70";

        const imagenGrande = document.createElement("img");

        imagenGrande.src = imagen.src;
        imagenGrande.alt = imagen.alt;
        imagenGrande.className =
            "max-h-[75vh] w-full rounded-xl object-contain";

        const botonCerrar = crearElemento(
            "button",
            "mt-4 w-full rounded-full bg-[#C75B7A] px-5 py-3 font-bold text-white",
            "Cerrar fotografía"
        );

        botonCerrar.addEventListener("click", function() {
            ventana.close();
        });

        ventana.append(imagenGrande, botonCerrar);
        document.body.appendChild(ventana);

        ventana.addEventListener("close", function() {
            ventana.remove();
        });

        ventana.addEventListener("click", function(event) {
            if (event.target === ventana) {
                ventana.close();
            }
        });

        ventana.showModal();
    });

    const botonFavorito = crearElemento(
        "button",
        "mt-3 w-full rounded-full border border-[#E6B8C5] bg-white px-4 py-2 font-bold text-[#C75B7A] transition hover:bg-[#FBE5EC]",
        "♡ Agregar a favoritos"
    );

    let favorito = false;

    botonFavorito.addEventListener("click", function() {
        favorito = !favorito;

        botonFavorito.textContent = favorito
            ? "♥ En favoritos"
            : "♡ Agregar a favoritos";

        botonFavorito.classList.toggle("bg-[#FBE5EC]", favorito);
    });

    contenido.append(
        botonDetalles,
        detalles,
        etiquetaCantidad,
        botonAgregar,
        botonFavorito
    );
});
