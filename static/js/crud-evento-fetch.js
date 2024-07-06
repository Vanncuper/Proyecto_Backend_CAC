const BASEURL = 'http://127.0.0.1:5000';

/**
 * @param {string} url
 * @param {string} method
 * @param {Object} [data=null]
 * @returns {Promise<Object>}
 */
async function fetchData(url, method, data = null) {
  const options = {
      method: method,
      headers: {
          'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null, 
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    alert('An error occurred while fetching data. Please try again.');
  }
}

/**
 * @returns 
 */
async function saveevento(){
  const idEvento = document.querySelector('#id-evento').value;
  const titulo = document.querySelector('#titulo').value;
  const fecha = document.querySelector('#fecha').value;
  const descripcion = document.querySelector('#descripcion').value;
  const imagen = document.querySelector('#imagen').value;

  if (!titulo || !fecha || !descripcion  || !imagen) {
    Swal.fire({
        titulo: 'Error!',
        text: 'Por favor completa todos los campos.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
    });
    return;
  }
  
  const eventoData = {
      titulo: titulo,
      fecha: fecha,
      descripcion: descripcion,
      imagen: imagen,
  };

    
  let result = null;
  // Si hay un idEvento, realiza una petición PUT para actualizar la película existente
  if(idEvento!==""){
    result = await fetchData(`${BASEURL}/api/evento/${idEvento}`, 'PUT', eventoData);
  }else{
    // Si no hay idEvento, realiza una petición POST para crear una nueva película
    result = await fetchData(`${BASEURL}/api/evento/`, 'POST', eventoData);
  }
  
  const formevento = document.querySelector('#form-evento');
  formevento.reset();
  Swal.fire({
    titulo: 'Exito!',
    text: result.message,
    icon: 'success',
    confirmButtonText: 'Cerrar'
  })
  showevento();
}


/**
 * Funcion que permite crear un elemento <tr> para la tabla de peliculas
 * por medio del uso de template string de JS.
 */
async function showevento(){
  let evento =  await fetchData(BASEURL+'/api/evento/', 'GET');
  const tableevento = document.querySelector('#list-table-evento tbody');
  tableevento.innerHTML='';
  evento.forEach((evento,index) => {
    let tr = `<tr>
                  <td>${evento.titulo}</td>
                  <td>${evento.fecha}</td>
                  <td>${evento.descripcion}</td>
                  <td>
                      <img src="${evento.imagen}" width="30%">
                  </td>
                  <td>
                      <button class="btn-1" onclick='updateevento(${evento.id_evento})'>Actualizar</button>
                      <button class="btn-1" onclick='deleteevento(${evento.id_evento})'>Borrar</button>
                  </td>
                </tr>`;
    tableevento.insertAdjacentHTML("beforeend",tr);
  });
}
  
/**
 * Function que permite eliminar una pelicula del array del localstorage
 * de acuedo al indice del mismo
 * @param {number} id posición del array que se va a eliminar
 */
function deleteevento(id){
  Swal.fire({
      titulo: "Esta seguro de eliminar la pelicula?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
  }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await fetchData(`${BASEURL}/api/evento/${id}`, 'DELETE');
        showevento();
        Swal.fire(response.message, "", "success");
      }
  });
  
}


/**
 * Function que permite cargar el formulario con los datos de la pelicula 
 * para su edición
 * @param {number} id Id de la pelicula que se quiere editar
 */
async function updateevento(id){
  //Buscamos en el servidor la pelicula de acuerdo al id
  let response = await fetchData(`${BASEURL}/api/evento/${id}`, 'GET');
  const idEvento = document.querySelector('#id-evento');
  const titulo = document.querySelector('#titulo');
  const fecha = document.querySelector('#fecha');
  const descripcion = document.querySelector('#descripcion');
  const imagen = document.querySelector('#imagen');
  
  idEvento.value = response.id_evento;
  titulo.value = response.titulo;
  fecha.value = response.fecha;
  descripcion.value = response.descripcion;
  imagen.value = response.imagen;
}
  
// Escuchar el evento 'DOMContentLoaded' que se dispara cuando el 
// contenido del DOM ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded',function(){
  const btnSaveevento = document.querySelector('#btn-save-evento');
  //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
  btnSaveevento.addEventListener('click',saveevento);
  showevento();
});