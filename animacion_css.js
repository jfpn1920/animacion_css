// ===== REFERENCIAS A LOS ELEMENTOS DEL HTML =====
const escenario = document.getElementById('escenario');
const figura = document.getElementById('figura');
const controles = document.getElementById('controles');
const selectForma = document.getElementById('forma');
const selectMovimiento = document.getElementById('movimiento');
const inputColor = document.getElementById('color');
const inputDuracion = document.getElementById('duracion');
const duracionTexto = document.getElementById('duracionTexto');
const btnPausa = document.getElementById('btnPausa');
const btnRestablecer = document.getElementById('btnRestablecer');
// ===== CLAVE DE LOCALSTORAGE =====
const CLAVE = 'animacion_estado';
// ===== ESTADO POR DEFECTO =====
// forma y movimiento: coinciden con las clases del CSS
// color: color de la figura | duracion: segundos | pausada: true o false
const estadoInicial = {
    forma: 'circulo',
    movimiento: 'horizontal',
    color: '#e4572e',
    duracion: 3,
    pausada: false
};
// ===== LEER EL ESTADO GUARDADO =====
function leerEstado() {
    try {
        const guardado = localStorage.getItem(CLAVE);
        // Si hay datos guardados los usamos; si no, partimos del estado inicial
        return guardado ? { ...estadoInicial, ...JSON.parse(guardado) } : { ...estadoInicial };
    } catch (error) {
      return { ...estadoInicial }; // si algo falla, empezamos desde cero
    }
}
// Al cargar la página recuperamos la configuración guardada
let estado = leerEstado();
// ===== GUARDAR EL ESTADO =====
function guardarEstado() {
    localStorage.setItem(CLAVE, JSON.stringify(estado));
}
// ===== APLICAR EL ESTADO A LA PANTALLA =====
// Esta función hace visibles todos los cambios
function aplicarEstado() {
    // Las clases del CSS definen la forma y el movimiento de la figura
    figura.className = `figura forma-${estado.forma} mov-${estado.movimiento}`;
    // Variables CSS: el CSS lee estos valores para el color y la velocidad
    escenario.style.setProperty('--color', estado.color);
    escenario.style.setProperty('--duracion', estado.duracion + 's');
    // La clase "pausada" detiene la animación
    escenario.classList.toggle('pausada', estado.pausada);
    btnPausa.textContent = estado.pausada ? 'Reanudar' : 'Pausar';
    // Mostramos la duración y sincronizamos los controles con el estado
    duracionTexto.textContent = estado.duracion + ' s';
    selectForma.value = estado.forma;
    selectMovimiento.value = estado.movimiento;
    inputColor.value = estado.color;
    inputDuracion.value = estado.duracion;
}
// ===== LEER LOS CONTROLES Y ACTUALIZAR EL ESTADO =====
function leerControles() {
    estado.forma = selectForma.value;
    estado.movimiento = selectMovimiento.value;
    estado.color = inputColor.value;
    estado.duracion = parseFloat(inputDuracion.value);
    guardarEstado();
    aplicarEstado();
}
// ===== PAUSAR O REANUDAR LA ANIMACIÓN =====
function alternarPausa() {
    estado.pausada = !estado.pausada;  // invierte el valor (true pasa a false y viceversa)
    guardarEstado();
    aplicarEstado();
}
// ===== VOLVER A LA CONFIGURACIÓN ORIGINAL =====
function restablecer() {
    estado = { ...estadoInicial };
    guardarEstado();
    aplicarEstado();
}
// ===== EVENTOS =====
controles.addEventListener('input', leerControles);  // cualquier cambio en los controles
btnPausa.addEventListener('click', alternarPausa);
btnRestablecer.addEventListener('click', restablecer);
// ===== INICIO: se ejecuta al cargar o refrescar la página =====
aplicarEstado();