const BASEURL = 'https://prueba-jqvf.onrender.com';

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
async function saveevento() {
  const idEvento = document.querySelector('#id-evento').value;
  const titulo = document.querySelector('#titulo').value;
  const fecha = document.querySelector('#fecha').value;
  const descripcion = document.querySelector('#descripcion').value;
  const imagen = document.querySelector('#imagen').value;

  const fechaActual = new Date();
  const fechaIngresada = new Date(fecha);

  if (fechaIngresada <= fechaActual) {
    Swal.fire({
      title: 'Error!',
      text: 'La fecha debe ser posterior a la fecha actual.',
      icon: 'error',
      confirmButtonText: 'Cerrar',
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
  if (idEvento !== '') {
    result = await fetchData(`${BASEURL}/api/evento/${idEvento}`, 'PUT', eventoData);
  } else {
    result = await fetchData(`${BASEURL}/api/evento/`, 'POST', eventoData);
  }

  const formevento = document.querySelector('#form-evento');
  formevento.reset();

  Swal.fire({
    title: 'Éxito!',
    text: result.message,
    icon: 'success',
    confirmButtonText: 'Cerrar',
  });

  showevento();
}

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
 * @param {number} id
 */
function deleteevento(id){
  Swal.fire({
      titulo: "Esta seguro de eliminar el evento?",
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
 * @param {number} id
 */
async function updateevento(id){

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
  
document.addEventListener('DOMContentLoaded',function(){
  const btnSaveevento = document.querySelector('#btn-save-evento');

  btnSaveevento.addEventListener('click',saveevento);
  showevento();
});
