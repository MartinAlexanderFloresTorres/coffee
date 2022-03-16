/*===== toggle menu ===== */
const btnMenu = document.querySelector("#nav-menu"),
    btnclose = document.querySelector("#nav-close"),
    navegacion = document.querySelector("#nav-navegacion"),
    navegacionLinks = document.querySelectorAll(".nav__link"),
    filtros = document.querySelector(".productos__filtros"),
    productos_ico = document.querySelector(".productos__ico"),
    productos_title = document.querySelectorAll(".productos__title");

if (btnMenu) {
    btnMenu.addEventListener("click", () => {
        navegacion.classList.add("active");
    });
}
if (btnclose) {
    btnclose.addEventListener("click", () => {
        navegacion.classList.remove("active");
    });
}
if (productos_ico) {
    productos_ico.addEventListener("click", () => {
        filtros.classList.toggle("active");
        productos_ico.classList.toggle("active");
    });
    if (productos_title) {
        productos_title.forEach((item) => {
            item.addEventListener("click", () => {
                filtros.classList.remove("active");
                productos_ico.classList.remove("active");
            });
        });
    }
}
function clickLink() {
    navegacion.classList.remove("active");
}
navegacionLinks.forEach((link) =>
    link.addEventListener("click", () => clickLink())
);

/*===== scroll header ===== */
const header = document.querySelector(".header"),
    logo = document.querySelector(".nav__logo"),
    subir = document.querySelector("#subir");

window.addEventListener("scroll", () => {
    const valorScroll = window.scrollY;
    if (valorScroll > 50) {
        header.style.background = "var(--body-color)";
        header.style.boxShadow = "var(--box-shadow)";
        logo.style.color = "var(--black-color)";
        header.classList.add("color");
    } else {
        header.style.background = "transparent";
        header.style.boxShadow = "none";
        logo.style.color = "var(--white)";
        header.classList.remove("color");
    }
    /*===== scroll up ===== */
    if (valorScroll > 200) {
        subir.classList.add("active");
    } else {
        subir.classList.remove("active");
    }
});

/*===== filtrar muri ===== */
const grid = new Muuri(".grid", {
    layout: {
        rounding: false,
    },
});

const load = document.querySelector('#load');
window.addEventListener("load", () => {
    load.style.display = 'none';
    grid.refreshItems().layout();
    // Agregamos los listener de los titulos para filtrar por categoria.
    const titulos = document.querySelectorAll(".productos__title");
    titulos.forEach((elemento) => {
        elemento.addEventListener("click", (evento) => {
            titulos.forEach((enlace) => enlace.classList.remove("activo"));
            evento.target.classList.add("activo");

            const categoria = evento.target.innerHTML.toLowerCase();
            categoria === "todos"
                ? grid.filter("[data-categoria]")
                : grid.filter(`[data-categoria="${categoria}"]`);
        });
    });
});
