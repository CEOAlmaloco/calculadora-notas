// Variables globales
let notaCounter = 0;
let notas = [];

// Funciones principales de cálculo (traducidas del Python)
function calcularPromedioParcial(notas, pesos) {
    let promedio = 0;
    for (let i = 0; i < notas.length; i++) {
        promedio += notas[i] * pesos[i];
    }
    return promedio;
}

function calcularNotaExamenObjetivo(notaObjetivo, parcial, pesoParcial = 0.6, pesoExamen = 0.4) {
    const notaExamen = (notaObjetivo - (parcial * pesoParcial)) / pesoExamen;
    return notaExamen;
}

// Función para crear una nueva nota
function crearNotaItem(notaData = null) {
    notaCounter++;
    const notaId = `nota${notaCounter}`;
    const pesoId = `peso${notaCounter}`;
    
    const notaItem = document.createElement('div');
    notaItem.className = 'nota-item';
    notaItem.id = `nota-item-${notaCounter}`;
    
    const nota = notaData ? notaData.nota : '';
    const peso = notaData ? notaData.peso : 100 / Math.max(1, notas.length + 1);
    
    notaItem.innerHTML = `
        <div class="nota-header">
            <div class="nota-title">Nota ${notaCounter}</div>
            <button class="eliminar-btn" onclick="eliminarNota(${notaCounter})" title="Eliminar nota"></button>
        </div>
        <div class="nota-content">
            <input type="text" 
                   id="${notaId}" 
                   class="nota-input" 
                   value="${nota}" 
                   placeholder="0.0"
                   onfocus="limpiarInput(this)"
                   oninput="validarNotaInput(this, ${notaCounter})"
                   onblur="formatearNota(this)">
            <div class="nota-peso-section">
                <label for="${pesoId}">Peso de esta nota: <span id="peso-value-${notaCounter}">25</span>%</label>
                <input type="range" 
                       id="${pesoId}" 
                       min="5" 
                       max="50" 
                       step="5"
                       value="25" 
                       class="peso-slider"
                       oninput="actualizarPesoNota(${notaCounter})">
            </div>
        </div>
    `;
    
    return {
        element: notaItem,
        id: notaId,
        pesoId: pesoId,
        peso: peso
    };
}

// Función para limpiar el input cuando se enfoca
function limpiarInput(input) {
    if (input.value === '0' || input.value === '0.0') {
        input.value = '';
    }
}

// Función para validar y procesar el input de nota
function validarNotaInput(input, notaIndex) {
    let valor = input.value;

    // Reemplazar coma por punto
    valor = valor.replace(',', '.');

    // Permitir solo números y punto decimal
    valor = valor.replace(/[^0-9.]/g, '');

    // Si el usuario escribe dos dígitos sin punto, lo interpreta como decimal (ej: 50 => 5.0)
    if (/^\d{2}$/.test(valor)) {
        valor = valor[0] + '.' + valor[1];
    }

    // Asegurar que solo haya un punto decimal
    const puntos = valor.split('.').length - 1;
    if (puntos > 1) {
        valor = valor.replace(/\.+$/, ''); // Remover puntos extras al final
        const partes = valor.split('.');
        valor = partes[0] + '.' + partes.slice(1).join('');
    }

    // Limitar a un decimal
    if (valor.includes('.')) {
        const partes = valor.split('.');
        valor = partes[0] + '.' + partes[1].substring(0, 1);
    }

    // Validar rango
    const numero = parseFloat(valor);
    if (numero > 7.0) {
        valor = '7.0';
    }

    input.value = valor;

    // Calcular automáticamente si hay un valor válido
    if (valor && !isNaN(numero)) {
        calcular();
    }
}

// Función para formatear la nota cuando pierde el foco
function formatearNota(input) {
    const valor = parseFloat(input.value);
    if (isNaN(valor) || valor === 0) {
        input.value = '';
    } else {
        // Solo formatear si el valor es mayor a 7.0 o si el usuario no ha terminado de escribir
        if (valor > 7.0) {
            input.value = '7.0';
        } else if (input.value.includes('.')) {
            // Si ya tiene punto decimal, mantener el formato original
            input.value = valor.toFixed(1);
        } else {
            // Si es un número entero, mantenerlo como está
            input.value = valor.toString();
        }
    }
}

// Función para actualizar el peso de una nota específica
function actualizarPesoNota(notaIndex) {
    const pesoSlider = document.getElementById(`peso${notaIndex}`);
    const pesoValue = document.getElementById(`peso-value-${notaIndex}`);
    
    if (pesoSlider && pesoValue) {
        const peso = parseInt(pesoSlider.value);
        pesoValue.textContent = peso;
        
        // Calcular automáticamente
        calcular();
    }
}

// Función para actualizar la barra de progreso de una nota específica (mantenida por compatibilidad)
function actualizarNotaProgress(notaIndex) {
    // Esta función se mantiene por compatibilidad pero ya no hace nada
    // ya que quitamos las barras de progreso
}

// Función para agregar una nueva nota
function agregarNota() {
    const notasContainer = document.getElementById('notasContainer');
    const nuevaNota = crearNotaItem();
    
    notasContainer.appendChild(nuevaNota.element);
    notas.push({
        id: nuevaNota.id,
        pesoId: nuevaNota.pesoId,
        peso: nuevaNota.peso
    });
    
    // Actualizar peso de la nueva nota
    actualizarPesoNota(notaCounter);
    
    // Verificar si necesitamos agregar scroll
    verificarScroll();
    
    // Enfocar el nuevo input
    document.getElementById(nuevaNota.id).focus();
}

// Función para verificar si necesitamos agregar scroll
function verificarScroll() {
    const notasContainer = document.getElementById('notasContainer');
    const notaItems = document.querySelectorAll('.nota-item');
    
    if (notaItems.length > 5) {
        notasContainer.classList.add('has-scroll');
    } else {
        notasContainer.classList.remove('has-scroll');
    }
}

// Función para eliminar una nota
function eliminarNota(notaIndex) {
    console.log('DEBUG - Eliminando nota:', notaIndex);
    
    const notaItem = document.getElementById(`nota-item-${notaIndex}`);
    if (notaItem) {
        console.log('DEBUG - Elemento encontrado, eliminando del DOM');
        notaItem.remove();

        // Remover de la lista de notas
        const notasAntes = notas.length;
        notas = notas.filter(n => n.id !== `nota${notaIndex}`);
        console.log(`DEBUG - Notas en array: ${notasAntes} → ${notas.length}`);

        // Renumerar las notas restantes
        renumerarNotas();

        // Redistribuir pesos automáticamente
        redistribuirPesosNotas();

        // Verificar scroll
        verificarScroll();
    } else {
        console.log('DEBUG - Elemento no encontrado');
    }
}

// Nueva función para redistribuir pesos automáticamente
function redistribuirPesosNotas() {
    const pesoSliders = document.querySelectorAll('.peso-slider');
    const pesoValues = document.querySelectorAll('.nota-peso-section span');
    const cantidad = pesoSliders.length;
    if (cantidad === 0) return;
    // Distribuir en múltiplos de 5 para mantener el step
    let pesoBase = Math.floor(100 / cantidad / 5) * 5;
    let pesos = Array(cantidad).fill(pesoBase);
    let suma = pesoBase * cantidad;
    let i = 0;
    // Ajustar los pesos para que sumen exactamente 100
    while (suma < 100) {
        pesos[i % cantidad] += 5;
        suma += 5;
        i++;
    }
    while (suma > 100) {
        pesos[i % cantidad] -= 5;
        suma -= 5;
        i++;
    }
    // Asignar los nuevos valores a los sliders y spans
    pesoSliders.forEach((slider, idx) => {
        slider.value = pesos[idx];
        pesoValues[idx].textContent = pesos[idx];
    });
    // Calcular automáticamente
    calcular();
}

// Función para renumerar las notas después de eliminar
function renumerarNotas() {
    const notaItems = document.querySelectorAll('.nota-item');
    notaItems.forEach((item, index) => {
        const notaTitle = item.querySelector('.nota-title');
        const eliminarBtn = item.querySelector('.eliminar-btn');
        const notaInput = item.querySelector('.nota-input');
        const pesoSlider = item.querySelector('.peso-slider');
        const pesoValue = item.querySelector('.nota-peso-section span');
        
        const newIndex = index + 1;
        notaTitle.textContent = `Nota ${newIndex}`;
        eliminarBtn.onclick = () => eliminarNota(newIndex);
        
        // Actualizar el ID del input
        const oldId = notaInput.id;
        const newId = `nota${newIndex}`;
        notaInput.id = newId;
        notaInput.onfocus = () => limpiarInput(notaInput);
        notaInput.oninput = () => validarNotaInput(notaInput, newIndex);
        notaInput.onblur = () => formatearNota(notaInput);
        
        // Actualizar ID del slider de peso
        const oldPesoId = pesoSlider.id;
        const newPesoId = `peso${newIndex}`;
        pesoSlider.id = newPesoId;
        pesoSlider.oninput = () => actualizarPesoNota(newIndex);
        
        // Actualizar ID del valor del peso
        pesoValue.id = `peso-value-${newIndex}`;
        
        // Actualizar en la lista de notas
        const notaIndex = notas.findIndex(n => n.id === oldId);
        if (notaIndex !== -1) {
            notas[notaIndex].id = newId;
            notas[notaIndex].pesoId = newPesoId;
        }
    });
}

// Función para obtener los valores de los inputs
function obtenerValores() {
    const notasValores = [];
    const pesosValores = [];
    
    // Obtener notas y pesos
    const notaInputs = document.querySelectorAll('.nota-input');
    const pesoSliders = document.querySelectorAll('.peso-slider');
    
    console.log('DEBUG - obtenerValores:');
    console.log('  Cantidad de notaInputs encontrados:', notaInputs.length);
    console.log('  Cantidad de pesoSliders encontrados:', pesoSliders.length);
    
    // Calcular peso total de los sliders
    let pesoTotal = 0;
    pesoSliders.forEach((slider, idx) => {
        const peso = parseInt(slider.value);
        pesoTotal += peso;
        console.log(`  Slider ${idx + 1}: ${peso}%`);
    });
    console.log('  Peso total:', pesoTotal);
    
    // Los pesos de los sliders ya suman 100%, solo los convertimos a decimales
    notaInputs.forEach((input, index) => {
        const nota = parseFloat(input.value) || 0;
        const pesoSlider = pesoSliders[index];
        
        console.log(`  Nota ${index + 1}: ${nota} (input: "${input.value}")`);
        
        if (nota < 0 || nota > 7.0) {
            throw new Error(`La nota ${index + 1} debe estar entre 0.0 y 7.0.`);
        }
        
        const pesoRelativo = parseInt(pesoSlider.value);
        const pesoDecimal = pesoRelativo / 100; // Convertir porcentaje a decimal
        
        console.log(`  Peso ${index + 1}: ${pesoRelativo}% → ${pesoDecimal.toFixed(4)}`);
        
        notasValores.push(nota);
        pesosValores.push(pesoDecimal);
    });
    
    if (notasValores.length === 0) {
        throw new Error('Debes agregar al menos una nota parcial.');
    }
    
    // Obtener configuración
    const notaObjetivo = parseFloat(document.getElementById('notaObjetivo').value);
    
    if (isNaN(notaObjetivo)) {
        throw new Error('Por favor, ingresa una nota objetivo válida.');
    }
    
    if (notaObjetivo < 1.0 || notaObjetivo > 7.0) {
        throw new Error('La nota objetivo debe estar entre 1.0 y 7.0.');
    }
    
    console.log('  Nota objetivo:', notaObjetivo);
    console.log('  Notas finales:', notasValores);
    console.log('  Pesos finales:', pesosValores);
    
    return {
        notas: notasValores,
        pesos: pesosValores,
        notaObjetivo,
        pesoParcial: 0.6, // Fijo 60%
        pesoExamen: 0.4   // Fijo 40%
    };
}

// Función para mostrar resultados
function mostrarResultados(notaExamen, promedioParcial, notaObjetivo) {
    const notaNecesariaElement = document.getElementById('notaNecesaria');
    const statusElement = document.getElementById('resultStatus');
    const statusTextElement = document.getElementById('statusText');
    
    console.log('DEBUG - mostrarResultados recibió:');
    console.log('  notaExamen:', notaExamen);
    console.log('  promedioParcial:', promedioParcial);
    console.log('  notaObjetivo:', notaObjetivo);
    
    // Determinar estado y mensaje
    let statusClass = '';
    let statusMessage = '';
    let notaAMostrar = notaExamen;
    
    if (notaExamen > 7.0) {
        statusClass = 'status-warning';
        statusMessage = '⚠️ Es imposible, necesitarías más de 7.0 en el examen';
        notaNecesariaElement.style.color = '#e53e3e';
        notaAMostrar = 7.0;
    } else if (notaExamen < 1.0) {
        statusClass = 'status-success';
        statusMessage = '✅ ¡Ya estás aprobado! Solo necesitas 1.0 (nota mínima) en el examen';
        notaNecesariaElement.style.color = '#38a169';
        notaAMostrar = 1.0;
    } else {
        statusClass = 'status-info';
        statusMessage = '✅ Es posible alcanzar la nota objetivo';
        notaNecesariaElement.style.color = '#667eea';
    }
    
    console.log('DEBUG - notaAMostrar final:', notaAMostrar);
    
    // Mostrar nota necesaria grande
    notaNecesariaElement.textContent = notaAMostrar.toFixed(2);
    
    // Aplicar clases de estado
    statusElement.className = `result-status ${statusClass}`;
    statusTextElement.textContent = statusMessage;
}

// Función principal de cálculo
function calcular() {
    try {
        // Obtener valores
        const valores = obtenerValores();
        
        // Calcular promedio parcial (ya con pesos decimales que suman 1)
        const promedioParcial = calcularPromedioParcial(valores.notas, valores.pesos);
        
        // Calcular nota necesaria en examen
        const notaExamen = calcularNotaExamenObjetivo(
            valores.notaObjetivo,
            promedioParcial,
            valores.pesoParcial,
            valores.pesoExamen
        );
        
        console.log('DEBUG - Notas:', valores.notas);
        console.log('DEBUG - Pesos:', valores.pesos);
        console.log('DEBUG - Promedio parcial:', promedioParcial);
        console.log('DEBUG - Nota examen calculada:', notaExamen);
        console.log('DEBUG - Nota objetivo:', valores.notaObjetivo);
        
        // Mostrar resultados
        mostrarResultados(notaExamen, promedioParcial, valores.notaObjetivo);
        
    } catch (error) {
        console.error('ERROR:', error);
        // Mostrar error en la interfaz en lugar de alert
        const statusElement = document.getElementById('resultStatus');
        const statusTextElement = document.getElementById('statusText');
        const notaNecesariaElement = document.getElementById('notaNecesaria');
        
        statusElement.className = 'result-status status-warning';
        statusTextElement.textContent = error.message;
        notaNecesariaElement.textContent = '0';
        notaNecesariaElement.style.color = '#667eea';
    }
}

// Función para validar inputs en tiempo real
function validarInput(input) {
    const valor = parseFloat(input.value);
    const min = parseFloat(input.min);
    const max = parseFloat(input.max);
    
    if (valor < min || valor > max) {
        input.style.borderColor = '#f56565';
    } else {
        input.style.borderColor = '#48bb78';
    }
}

// Función para limpiar formulario
function limpiarFormulario() {
    // Limpiar notas
    const notasContainer = document.getElementById('notasContainer');
    notasContainer.innerHTML = '';
    notas = [];
    notaCounter = 0;
    
    // Restaurar valores por defecto
    document.getElementById('notaObjetivo').value = '4.0';
    
    // Limpiar resultados
    document.getElementById('notaNecesaria').textContent = '0';
    document.getElementById('resultStatus').className = 'result-status status-default';
    document.getElementById('statusText').textContent = 'Ingresa tus notas para calcular';
    
    // Agregar 4 notas iniciales con valor 0
    for (let i = 0; i < 4; i++) {
        agregarNota();
    }
}

// Función para exportar resultados
function exportarResultados() {
    const notaNecesaria = document.getElementById('notaNecesaria').textContent;
    const statusText = document.getElementById('statusText').textContent;
    
    if (notaNecesaria === '0') {
        alert('No hay resultados para exportar. Ingresa notas para calcular.');
        return;
    }
    
    const notaInputs = document.querySelectorAll('.nota-input');
    const pesoSliders = document.querySelectorAll('.peso-slider');
    let notasTexto = '';
    notaInputs.forEach((input, index) => {
        const peso = pesoSliders[index] ? pesoSliders[index].value : '25';
        notasTexto += `Nota ${index + 1}: ${input.value} (peso: ${peso}%)\n`;
    });
    
    const resultado = `
=== Calculadora de Notas - Resultados ===

${notasTexto}
Nota necesaria en examen: ${notaNecesaria}
Estado: ${statusText}

Pesos fijos: Parciales 60%, Final 40%

Fecha: ${new Date().toLocaleString('es-ES')}
    `;
    
    // Crear archivo de texto para descargar
    const blob = new Blob([resultado], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resultados_calculadora_notas.txt';
    a.click();
    URL.revokeObjectURL(url);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Botón agregar nota
    const agregarNotaBtn = document.getElementById('agregarNotaBtn');
    agregarNotaBtn.addEventListener('click', agregarNota);
    
    // Validación en tiempo real para inputs
    document.addEventListener('input', function(e) {
        if (e.target.id === 'notaObjetivo') {
            validarInput(e.target);
            calcular();
        }
    });
    
    // Agregar 4 notas iniciales con valor 0
    for (let i = 0; i < 4; i++) {
        agregarNota();
    }
    
    // Agregar botones adicionales
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    buttonContainer.style.cssText = `
        display: flex;
        gap: 15px;
        margin-top: 20px;
        justify-content: center;
    `;
    
    const limpiarBtn = document.createElement('button');
    limpiarBtn.textContent = 'Limpiar';
    limpiarBtn.className = 'calcular-btn';
    limpiarBtn.style.cssText = `
        background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
        flex: 1;
        max-width: 200px;
        padding: 16px 32px;
        color: white;
        border: none;
        border-radius: 12px;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 8px 25px rgba(72, 187, 120, 0.3);
    `;
    limpiarBtn.addEventListener('click', limpiarFormulario);
    
    const exportarBtn = document.createElement('button');
    exportarBtn.textContent = 'Exportar';
    exportarBtn.className = 'calcular-btn';
    exportarBtn.style.cssText = `
        background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%);
        flex: 1;
        max-width: 200px;
        padding: 16px 32px;
        color: white;
        border: none;
        border-radius: 12px;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 8px 25px rgba(237, 137, 54, 0.3);
    `;
    exportarBtn.addEventListener('click', exportarResultados);
    
    buttonContainer.appendChild(limpiarBtn);
    buttonContainer.appendChild(exportarBtn);
    
    // Insertar botones después de la sección de configuración
    const configSection = document.querySelector('.config-section');
    configSection.appendChild(buttonContainer);
}); 