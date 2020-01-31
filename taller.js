const url = 'https://rickandmortyapi.com/api/';
const filtro = document.querySelector('#txtBuscar');
const btnBuscar = document.querySelector('#buscarPersonaje');
const contenedor = document.querySelector('.row');
const next = document.querySelector('#siguiente');
const prev = document.querySelector('#anterior');
let personajes = [];
$.ajax({
  url: `${url}/character`,
  method: 'GET',
  crossDomain: true,
  success: function(response){
      personajes = response.results;
      personajes.forEach((personaje) => {
        contenedor.innerHTML = contenedor.innerHTML + mostrarTarjeta(personaje);
      });
  },
  error: function(error) {
    console.error('Error trayendo personajes', error);
  }
});

btnBuscar.addEventListener('click', function(){
  contenedor.innerHTML = '';
  let nombre = filtro.value;
  $.ajax({
    url: `${url}/character/?name=${nombre}`,
    method: 'GET',
    crossDomain: true,
    success: function(response) {
      personajes = response.results;
      personajes.forEach((personaje) => {
        contenedor.innerHTML = contenedor.innerHTML + mostrarTarjeta(personaje)
      })
    }
  })
});

next.addEventListener('click', function(event){
  event.preventDefault;
  contenedor.innerHTML = '';
  $.ajax({
    url: `${url}/character`,
    method: 'GET',
    crossDomain: true,
    success: function(response) {
      $.ajax({
        url: `${response.info.next}`,
        method: 'GET',
        crossDomain: true,
        success: function(response){
          personajes = response.results;
          personajes.forEach((personaje) => {
            contenedor.innerHTML = contenedor.innerHTML + mostrarTarjeta(personaje);
          })
        }
      })
    }
  })
});

prev.addEventListener('click', function(){
  event.preventDefault;
  contenedor.innerHTML = '';
  $.ajax({
    url: `${url}/character`,
    method: 'GET',
    crossDomain: true,
    success: function(response) {
      if(response.info != " "){
        $.ajax({
          url: `${response.info.prev}`,
          method: 'GET',
          crossDomain: true,
          success: function(response){
            personajes = response.results;
            personajes.forEach((personaje) => {
              contenedor.innerHTML = contenedor.innerHTML + mostrarTarjeta(personaje);
            })
          }
        })
      } else {
        alert('Ya estas en la primera pagina');
      }
    }
  })
});
function mostrarTarjeta(personaje){
  return `
    <div class="card mx-2" style="width: 300px;">
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
  `
}
