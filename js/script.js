
//TRAIGO DATOS DE ARCHIVO JSON SIMULANDO BASE DE DATOS

const productos = [];

const traerDatos = async () => {
    await fetch('productos.json')
        .then(function (response) {
            return response.json()
        }).then(data => {
            for (const producto of data) {
                productos.push(producto)
            }
            pintarDatos();
        });
}

traerDatos();




function pintarDatos() {
    let cards = '';
    productos.forEach(function (producto) {
        cards += `<div class="col-md-4 mb-3 cards__cardKit">
            <div class="card producto">
                <img src="${producto.foto}" class="card-img-top" alt="pascuas">
                <div class="card-body">
                <h5 class="card-title cards__cardTitle">${producto.nombre}</h5>
                <p class="card-text cards__cardText">$${producto.precio}</p>
                <a href="#" onclick="agregarAlCarrito(${producto.id})" class="btn cards__botonCartas agregar_carrito" >Agregar al carrito</a>
                </div>
                </div>
            </div>`
    });
    document.getElementById('card-container').innerHTML = cards;
}

//FILTRO POR CATEGORÍA LOS PRODUCTOS

function filtrarPorCategoria(categoria){
    const listaFiltrada = productos.filter((producto) => producto.categoria == categoria);
    generarCardsFiltro(listaFiltrada)
}

function generarCardsFiltro(arrayRecorrer){
    let html = ``;
arrayRecorrer.forEach((producto) => {
    html += `<div class="col-md-4 mb-3 cards__cardKit">
    <div class="card producto">
        <img src="${producto.foto}" class="card-img-top" alt="pascuas">
        <div class="card-body">
            <h5 class="card-title cards__cardTitle">${producto.nombre}</h5>
            <p class="card-text cards__cardText">$${producto.precio}</p>
            <a href="#" id="pushCarrito" onclick="agregarAlCarrito(${producto.id})" class="btn cards__botonCartas" onclick="agregarAlCarrito()" >Agregar a carrito</a>
        </div>
        </div>
    </div>`
});
document.getElementById('card-container').innerHTML = html;
}







//AGREGO AL CARRITO

const carritoStorage = localStorage.getItem('cart');
const carrito = JSON.parse(carritoStorage) ?? [];


const agregarAlCarrito = (id) => {
    let seleccionado = productos.find((producto) => producto.id == id);
    carrito.push(seleccionado);
    const cartJSON = JSON.stringify(carrito);
    localStorage.setItem('cart', cartJSON);
    document.getElementById("productosPop").innerHTML = `<div width=100>
    <tr>
    <td>
    <img src="${seleccionado.foto}" width=100>
</td>
<td>${seleccionado.nombre}</td>
<td>$${seleccionado.precio}</td>
<td>
    <a href="#" id="borrar" class="fas fa-times-circle">X</a>
</td>
</tr>
<div>`;


const vistaTotal = carrito.reduce((cards, producto) => cards + producto.precio, 0);
const vistaTotalJSON = JSON.stringify(carrito);
localStorage.setItem('previa', vistaTotalJSON);
document.getElementById("total").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>`+ " $" + vistaTotal;
}


function borrarProducto (id){
    let seleccionado = productos.find((producto) => producto.id == id);
    carrito.splice(seleccionado);
}


pintarDatos();










// EVENTO PARA ABRIR POPUP DE CARRITO

const abrirCarrito = document.getElementById("total");
const popup = document.querySelector('.popup-wrapper');
const cerrarPop = document.querySelector('.btnPopCerrar');

abrirCarrito.addEventListener('click', () => {
    popup.style.display = 'block';
});

cerrarPop.addEventListener('click', () => {
    popup.style.display = 'none';
});














































/*
const chequearBD = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const productosEnBase = productos;

            productosEnBase.length > 0 ? resolve('Hay productos en la base de datos') : reject('No hay productos en la base de datos');

        },2000);
    });
}

chequearBD('').then((productos) => {
    const arrayBD = productos;
    console.log(arrayBD);
})
*/






/*

// AGREGO TOASTIFY Y SWEET ALERT PARA ACTIVAR DURANTE UNA SEMANA AL MES UN ACCESO AL CÓDIGO CON EL QUE EL USUARIO PUEDE ACCEDER A UN 25% DE DESCUENTO EN SU COMPRA.

Toastify({
    text: "Acceso a descuento semanal",
    duration: 5000,
    close: true,
    gravity: "top", 
    position: "right", 
    stopOnFocus: true, 
    style: {
    background: "linear-gradient(to right, #e290b2, #ff537e)",
    },
    onClick: function abrirDescuento(){
        swal("Hola dreamer!", "El código de descuento válido esta semana es: dreamsweek!. Ingresalo antes de finalizar la compra para obtener un 25% de descuento!");
    } 
}).showToast();
*/





