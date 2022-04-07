const carrito = document.querySelector(".carrito");
const carritoBtn = document.querySelector(".boton--cart");
const carritoBtnClose = document.querySelector(".carrito__close");

carritoBtn.addEventListener("click", () => {
    carrito.classList.add("active");
    body.classList.add("active");
    agregadoExitosamente.classList.add("left");
});

carritoBtnClose.addEventListener("click", () => {
    carrito.classList.remove("active");
    body.classList.remove("active");
    agregadoExitosamente.classList.remove("left");
});

//===== variables =====
const contenedorProductos = document.querySelector(".grid");
const carritoContenedor = document.querySelector(".carrito__contenedor");
const btnPagar = document.querySelector(".carrito__boton");
const indiceContador = document.querySelector(".indiceContador");
const agregadoExitosamente = document.querySelector(".agregadoExitosamente");

let guardarCarrito = [];

function cargarListener() {
    contenedorProductos.addEventListener("click", RecoletaImformacion);
    carritoContenedor.addEventListener("click", eliminarProducto);
    try {
        document.addEventListener("DOMContentLoaded", () => {
            verificacion = JSON.parse(
                localStorage.getItem("carrito__75") || []
            );

            if (verificacion.length != 0) {
                guardarCarrito = verificacion;
                insertarHtml();
            }
            totalPagar();
            indice();
        });
    } catch (error) {
        console.log(error);
    }
}
cargarListener();

//===== RecoletaImformacion =====
function RecoletaImformacion(e) {
    if (e.target.classList.contains("grid__boton")) {
        const div = e.target.parentElement.parentElement;
        if (!agregadoExitosamente.classList.contains("active")) {
            agregadoExitosamente.classList.add("active");
            setTimeout(() => {
                agregadoExitosamente.classList.remove("active");
            }, 2500);
        }
        leerDatos(div);
    }
}
//===== eliminarProducto =====
function eliminarProducto(e) {
    e.preventDefault();
    const dataId = parseInt(e.target.getAttribute("data-id"));
    if (e.target.classList.contains("carrito--eliminar")) {
        guardarCarrito = guardarCarrito.filter((producto) => {
            return producto.id !== dataId;
        });
        insertarHtml();
    }
    if (e.target.classList.contains("mas")) {
        const existe = guardarCarrito.some((producto) => {
            return producto.id === dataId;
        });

        if (existe) {
            const copiaCarrito = guardarCarrito.map((producto) => {
                if (producto.id === dataId) {
                    producto.cantidad++;
                    return producto;
                } else {
                    return producto;
                }
            });
            guardarCarrito = [...copiaCarrito];
        } else {
            guardarCarrito = [...guardarCarrito];
        }
        insertarHtml();
    }
    if (e.target.classList.contains("menos")) {
        const existe = guardarCarrito.some((producto) => {
            return producto.id === dataId;
        });

        if (existe) {
            const copiaCarrito = guardarCarrito.map((producto) => {
                if (producto.id === dataId) {
                    if (producto.cantidad > 1) {
                        producto.cantidad--;
                        return producto;
                    } else {
                        return producto;
                    }
                } else {
                    return producto;
                }
            });
            guardarCarrito = [...copiaCarrito];
        } else {
            guardarCarrito = [...guardarCarrito];
        }
        insertarHtml();
    }
}

//===== leer Datos =====
function leerDatos(div) {
    const infoProducto = {
        imagen: div.querySelector("img").src,
        nombre: div.querySelector(".productos__nombre").textContent,
        precio: parseInt(div.querySelector(".productos__precio").textContent),
        id: parseInt(div.querySelector(".grid__boton").getAttribute("data-id")),
        cantidad: 1,
    };
    const existe = guardarCarrito.some((producto) => {
        return producto.id === infoProducto.id;
    });

    if (existe) {
        const copiaCarrito = guardarCarrito.map((producto) => {
            if (producto.id === infoProducto.id) {
                producto.cantidad++;
                return producto;
            } else {
                return producto;
            }
        });
        guardarCarrito = [...copiaCarrito];
    } else {
        guardarCarrito = [...guardarCarrito, infoProducto];
    }
    insertarHtml();
}
//===== insertarHtml =====
function insertarHtml() {
    limpiarHtmlPrevio();
    guardarCarrito.forEach((producto) => {
        const { imagen, nombre, precio, id, cantidad } = producto;
        let div = document.createElement("DIV");

        div.innerHTML = `
             <div class="carrito__item">
             <img class="carrito__img" src="${imagen}" alt="${nombre}">
                 <div class="carrito__info">
                     <p class="titulo">${nombre}</p>
                     <p class="carrito__tachado">S/.<span class="precio--original">${
                         precio + 3
                     }</span></p>
                     <p class="carrito__precio">S/.<span class="precio">${precio}</span></p>
                     <div class="carrito__cantidad">
                         Cantidad: 
                         <i class='bx bx-minus-circle menos' data-id="${id}"></i>
                         <p>${cantidad}</p>
                         <i class='bx bx-plus-circle mas' data-id="${id}"></i>
                     </div>
                     <div class="carrito__envio">
                         <i class='bx bxs-car-garage carrito__i'></i>
                         Entrega estimada: ${id + 6} de abril
                     </div>
                     <p class="carrito__vendido">Enviado y vendido por Coffee</p>
                 </div>
                <div class="carrito__enlaces">
                    <a class="carrito__a" href="#">Guardar para despues</a>
                     <a class="carrito__a carrito--eliminar" href="#" data-id="${id}">Eliminar</a>
                 </div>
            </div>
        `;
        carritoContenedor.appendChild(div);
    });
    indice();
    totalPagar();
    guardarLocalStorage();
}
//===== guardarLocalStorage =====
function guardarLocalStorage() {
    localStorage.setItem("carrito__75", JSON.stringify(guardarCarrito));
}

//===== total a pagar =====
let total = 0;
function totalPagar() {
    const totalApagar = guardarCarrito.reduce((total, producto) => {
        return total + producto.precio * producto.cantidad;
    }, 0);
    document.querySelector(".total").textContent = totalApagar;
}
//===== indice =====
function indice() {
    let i = 0;
    i = guardarCarrito.length;
    indiceContador.textContent = i;
    if (i === 0) {
        btnPagar.style.display = "none";
    } else {
        btnPagar.style.display = "block";
    }
}

//===== limpiarHtmlPrevio =====
function limpiarHtmlPrevio() {
    while (carritoContenedor.firstChild) {
        carritoContenedor.removeChild(carritoContenedor.firstChild);
    }
}
