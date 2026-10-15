//------------------------------------------//
//--|referencias_a_los_elementos_del_html|--//
//------------------------------------------//
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
const CLAVE = 'animacion_estado';
const estadoInicial = {
    forma: 'circulo',
    movimiento: 'horizontal',
    color: '#e4572e',
    duracion: 3,
    pausada: false
};
//-----------------------------//
//--|leer_el_estado_guardado|--//
//-----------------------------//
function leerEstado() {
    try {
        const guardado = localStorage.getItem(CLAVE);
        return guardado ? { ...estadoInicial, ...JSON.parse(guardado) } : { ...estadoInicial };
    } catch (error) {
        return { ...estadoInicial };
    }
}
let estado = leerEstado();
function guardarEstado() {
    localStorage.setItem(CLAVE, JSON.stringify(estado));
}
//-------------------------------------//
//--|aplicar_el_estado_a_la_pantalla|--//
//-------------------------------------//
function aplicarEstado() {
    figura.className = `figura forma-${estado.forma} mov-${estado.movimiento}`;
    escenario.style.setProperty('--color', estado.color);
    escenario.style.setProperty('--duracion', estado.duracion + 's');
    escenario.classList.toggle('pausada', estado.pausada);
    btnPausa.textContent = estado.pausada ? 'Reanudar' : 'Pausar';
    duracionTexto.textContent = estado.duracion + ' s';
    selectForma.value = estado.forma;
    selectMovimiento.value = estado.movimiento;
    inputColor.value = estado.color;
    inputDuracion.value = estado.duracion;
}
//--------------------------------------------//
//--|leer_los_controles_y_actualizar_estado|--//
//--------------------------------------------//
function leerControles() {
    estado.forma = selectForma.value;
    estado.movimiento = selectMovimiento.value;
    estado.color = inputColor.value;
    estado.duracion = parseFloat(inputDuracion.value);
    guardarEstado();
    aplicarEstado();
}
//------------------------------------//
//--|pausar_o_reanudar_la_animacion|--//
//------------------------------------//
function alternarPausa() {
    estado.pausada = !estado.pausada;
    guardarEstado();
    aplicarEstado();
}
function restablecer() {
    estado = { ...estadoInicial };
    guardarEstado();
    aplicarEstado();
}
//----------------------------------------//
//--|eventos_de_los_controles_y_botones|--//
//----------------------------------------//
controles.addEventListener('input', leerControles);
btnPausa.addEventListener('click', alternarPausa);
btnRestablecer.addEventListener('click', restablecer);
aplicarEstado();