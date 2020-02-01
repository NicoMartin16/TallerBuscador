const url = "https://rickandmortyapi.com/api/";
const filtro = document.querySelector("#txtBuscar");
const btnBuscar = document.querySelector("#buscarPersonaje");
const contenedor = document.querySelector(".row");
const next = document.querySelector("#siguiente");
const prev = document.querySelector("#anterior");
var pagina = 0;
let personajes = [];

$.ajax({
  url: `${url}/character/?page=1`,
  method: "GET",
  crossDomain: true,
  success: function(response) {
    personajes = response.results;
    personajes.forEach(personaje => {
      contenedor.innerHTML = contenedor.innerHTML + mostrarTarjeta(personaje);
    });
  },
  error: function(error) {
    console.error("Error trayendo personajes", error);
  }
});

btnBuscar.addEventListener("click", function() {
  contenedor.innerHTML = "";
  let nombre = filtro.value;
  $.ajax({
    url: `${url}/character/?name=${nombre}`,
    method: "GET",
    crossDomain: true,
    success: function(response) {
      personajes = response.results;
      personajes.forEach(personaje => {
        contenedor.innerHTML = contenedor.innerHTML + mostrarTarjeta(personaje);
      });
    },
    error: function(error) {
      contenedor.innerHTML = `<div class="alert alert-danger" role="alert">
        No se encontraron coincidencias con el texto a buscar
      </div>`;
    }
  });
});

next.addEventListener("click", function() {
  contenedor.innerHTML = "";
  pagina++;
  $.ajax({
    url: `${url}/character/?page=${pagina}`,
    method: "GET",
    crossDomain: true,
    success: function(response) {
      personajes = response.results;
      personajes.forEach(personaje => {
        contenedor.innerHTML = contenedor.innerHTML + mostrarTarjeta(personaje);
      });
    },
    error: function(error) {
      contenedor.innerHTML = `<div class="alert alert-danger" role="alert">
        No se encontraron registros
      </div>`;
    }
  });
});

prev.addEventListener("click", function() {
  contenedor.innerHTML = " ";
  pagina--;
  $.ajax({
    url: `${url}/character/?page=${pagina}`,
    method: "GET",
    crossDomain: true,
    success: function(response) {
      personajes = response.results;
      personajes.forEach(personaje => {
        contenedor.innerHTML = contenedor.innerHTML + mostrarTarjeta(personaje);
      });
     
    },
    error: function(error) {
      contenedor.innerHTML = `<div class="alert alert-danger" role="alert">
        No se encontraron registros
      </div>`;
    }
  });
});
function mostrarTarjeta(personaje) {
  return `
    <div class="card mx-2 my-3" style="width: 300px;">
        <img src="${personaje.image}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${personaje.name}</h5>
        <p class="card-text">${personaje.species}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Estado: ${personaje.status}</li>
        <li class="list-group-item">Género: ${personaje.gender}</li>
        <li class="list-group-item">Origen: ${personaje.origin.name}</li>
      </ul>
    </div>
  `;
}
