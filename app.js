const lista = document.getElementById('lista-eventos');
const form = document.getElementById('form-evento');
const btnLimpiar = document.getElementById('limpiar-eventos');

const selectMateria = document.getElementById('materia');
const inputNuevaMateria = document.getElementById('nueva-materia');
const btnAgregarMateria = document.getElementById('agregar-materia');

btnAgregarMateria.addEventListener('click', () => {
  const nuevaMateria = inputNuevaMateria.value.trim();
  if (nuevaMateria && ![...selectMateria.options].some(opt => opt.value.toLowerCase() === nuevaMateria.toLowerCase())) {
    const option = document.createElement('option');
    option.value = nuevaMateria;
    option.textContent = nuevaMateria;
    selectMateria.appendChild(option);
    selectMateria.value = nuevaMateria; // Selecciona automáticamente la nueva materia
    inputNuevaMateria.value = '';
  } else {
    alert('Ingresá un nombre válido y que no exista.');
  }
});

function cargarEventos() {
  lista.innerHTML = '';
  const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
  eventos.forEach((evento, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="evento-info">
        <span>Materia: ${evento.materia}</span>
        <span>Tipo: ${evento.tipo}</span>
        <span>Fecha: ${evento.fecha}</span>
        <span>Hora: ${evento.hora}</span>
      </div>
      <button class="delete-btn" data-index="${index}">Eliminar</button>
    `;
    li.classList.add('agregado');
    setTimeout(() => li.classList.remove('agregado'), 400);
    
    lista.appendChild(li);
  });
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      eliminarEvento(this.getAttribute('data-index'));
    });
  });
}

function agregarEvento(e) {
  e.preventDefault();
  const materia = document.getElementById('materia').value;
  const tipoSelect = document.getElementById('tipo');
  const tiposSeleccionados = Array.from(tipoSelect.selectedOptions).map(opt => opt.value).slice(0, 2);
  const fecha = document.getElementById('fecha').value;
  const hora = document.getElementById('hora').value;

  if (!materia || tiposSeleccionados.length === 0 || !fecha || !hora) {
    alert('Por favor completá todos los campos y seleccioná hasta dos tipos de evento.');
    return;
  }

  const nuevoEvento = { materia, tipo: tiposSeleccionados.join(', '), fecha, hora };
  const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
  eventos.push(nuevoEvento);
  localStorage.setItem('eventos', JSON.stringify(eventos));
  cargarEventos();

  form.reset();
}

function eliminarEvento(index) {
  const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
  eventos.splice(index, 1);
  localStorage.setItem('eventos', JSON.stringify(eventos));
  cargarEventos();
}

btnLimpiar.addEventListener('click', function() {
  if (confirm('¿Seguro que deseas borrar todos los eventos?')) {
    localStorage.removeItem('eventos');
    cargarEventos();
  }
});

form.addEventListener('submit', agregarEvento);

// Cargar al inicio
cargarEventos();
// Alterna modo claro/oscuro
const toggleBtn = document.getElementById('toggle-tema');

// Carga tema guardado al iniciar
const temaGuardado = localStorage.getItem('tema');
if (temaGuardado === 'oscuro') {
  document.body.classList.add('oscuro');
}

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('oscuro');

  const modo = document.body.classList.contains('oscuro') ? 'oscuro' : 'claro';
  localStorage.setItem('tema', modo);
});