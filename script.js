/**
 * Calculadora de Notas - VC Nota
 * 
 * Esta aplicación calcula la nota necesaria en el examen final para aprobar,
 * basándose en las notas parciales y sus pesos respectivos.
 * 
 * Lógica de cálculo:
 * - Nota final = (Promedio ponderado de parciales × 0.6) + (Nota examen × 0.4)
 * - Nota necesaria en examen = (Nota objetivo - (Promedio parcial × 0.6)) / 0.4
 * 
 * @author CEOAlmaloco
 * @version 1.0.0
 */

// Variables globales
let notaCounter = 0; // Contador para generar IDs únicos de notas
let notas = []; // Array que almacena las referencias a las notas

/**
 * Calcula el promedio ponderado de las notas parciales
 * @param {Array} notas - Array de notas numéricas
 * @param {Array} pesos - Array de pesos decimales (deben sumar 1)
 * @returns {number} Promedio ponderado
 */
function calcularPromedioParcial(notas, pesos) {
    console.log('🔢 Calculando promedio parcial:', { notas, pesos });
    let promedio = 0;
    for (let i = 0; i < notas.length; i++) {
        promedio += notas[i] * pesos[i];
    }
    console.log('📊 Promedio parcial calculado:', promedio);
    return promedio;
}

/**
 * Calcula la nota necesaria en el examen final para alcanzar la nota objetivo
 * @param {number} notaObjetivo - Nota final que se quiere alcanzar
 * @param {number} parcial - Promedio ponderado de las notas parciales
 * @param {number} pesoParcial - Peso de las parciales en la nota final (0.6)
 * @param {number} pesoExamen - Peso del examen en la nota final (0.4)
 * @returns {number} Nota necesaria en el examen
 */
function calcularNotaExamenObjetivo(notaObjetivo, parcial, pesoParcial = 0.6, pesoExamen = 0.4) {
    console.log('🎯 Calculando nota necesaria en examen:', {
        notaObjetivo,
        parcial,
        pesoParcial,
        pesoExamen
    });
    
    const notaExamen = (notaObjetivo - (parcial * pesoParcial)) / pesoExamen;
    console.log('📈 Nota necesaria en examen calculada:', notaExamen);
    return notaExamen;
}

/**
 * Crea un nuevo elemento de nota en la interfaz
 * @param {Object} notaData - Datos opcionales de la nota (nota, peso)
 * @returns {Object} Objeto con el elemento DOM y metadatos
 */
function crearNotaItem(notaData = null) {
    notaCounter++;
    const notaId = `nota${notaCounter}`;
    const pesoId = `peso${notaCounter}`;
    
    console.log('➕ Creando nueva nota:', { notaId, pesoId, notaData });
    
    const notaItem = document.createElement('div');
    notaItem.className = 'nota-item';
    notaItem.id = `nota-item-${notaCounter}`;
    
    const nota = notaData ? notaData.nota : '';
    const peso = notaData ? notaData.peso : 100 / Math.max(1, notas.length + 1);
    
    notaItem.innerHTML = `
        <div class="nota-header">
            <div class="nota-title">Nota ${notaCounter}</div>
            <button class="eliminar-btn" onclick="eliminarNota(${notaCounter})" title="Eliminar nota">🗑️</button>
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

/**
 * Limpia el input cuando se enfoca (quita el 0 inicial)
 * @param {HTMLInputElement} input - Elemento input a limpiar
 */
function limpiarInput(input) {
    console.log('🧹 Limpiando input:', input.value);
    if (input.value === '0' || input.value === '0.0') {
        input.value = '';
    }
}

/**
 * Valida y procesa el input de nota en tiempo real
 * @param {HTMLInputElement} input - Elemento input a validar
 * @param {number} notaIndex - Índice de la nota
 */
function validarNotaInput(input, notaIndex) {
    let valor = input.value;
    console.log(`📝 Validando nota ${notaIndex}:`, valor);

    // Reemplazar coma por punto
    valor = valor.replace(',', '.');

    // Permitir solo números y punto decimal
    valor = valor.replace(/[^0-9.]/g, '');

    // Si el usuario escribe dos dígitos sin punto, lo interpreta como decimal (ej: 50 => 5.0)
    if (/^\d{2}$/.test(valor)) {
        valor = valor[0] + '.' + valor[1];
        console.log(`🔄 Convirtiendo ${valor} a formato decimal`);
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
        console.log('⚠️ Nota limitada a 7.0');
    }

    input.value = valor;

    // Calcular automáticamente si hay un valor válido
    if (valor && !isNaN(numero)) {
        console.log(`✅ Nota ${notaIndex} válida:`, valor);
        calcular();
    }
}

/**
 * Formatea la nota cuando pierde el foco (agrega .0 si es entero)
 * @param {HTMLInputElement} input - Elemento input a formatear
 */
function formatearNota(input) {
    const valor = parseFloat(input.value);
    console.log('🎨 Formateando nota:', input.value, '→', valor);
    
    if (isNaN(valor) || valor === 0) {
        input.value = '';
        console.log('🗑️ Input vacío');
    } else {
        // Solo formatear si el valor es mayor a 7.0 o si el usuario no ha terminado de escribir
        if (valor > 7.0) {
            input.value = '7.0';
            console.log('📏 Nota limitada a 7.0');
        } else if (input.value.includes('.')) {
            // Si ya tiene punto decimal, mantener el formato original
            input.value = valor.toFixed(1);
            console.log('🔧 Formato decimal mantenido:', input.value);
        } else {
            // Si es un número entero, agregar .0 automáticamente
            input.value = valor.toFixed(1);
            console.log('✨ Entero convertido a decimal:', input.value);
        }
    }
}

/**
 * Actualiza el peso de una nota específica y recalcula
 * @param {number} notaIndex - Índice de la nota
 */
function actualizarPesoNota(notaIndex) {
    const pesoSlider = document.getElementById(`peso${notaIndex}`);
    const pesoValue = document.getElementById(`peso-value-${notaIndex}`);
    
    if (pesoSlider && pesoValue) {
        const peso = parseInt(pesoSlider.value);
        pesoValue.textContent = peso;
        console.log(`⚖️ Peso de nota ${notaIndex} actualizado:`, peso + '%');
        
        // Calcular automáticamente
        calcular();
    }
}

/**
 * Función para actualizar la barra de progreso (mantenida por compatibilidad)
 * @param {number} notaIndex - Índice de la nota
 */
function actualizarNotaProgress(notaIndex) {
    // Esta función se mantiene por compatibilidad pero ya no hace nada
    // ya que quitamos las barras de progreso
    console.log('📊 Función de progreso deshabilitada para nota:', notaIndex);
}

/**
 * Agrega una nueva nota a la interfaz
 */
function agregarNota() {
    console.log('➕ Agregando nueva nota');
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
    console.log('✅ Nueva nota agregada exitosamente');
}

/**
 * Verifica si necesitamos agregar scroll interno al contenedor de notas
 */
function verificarScroll() {
    const notasContainer = document.getElementById('notasContainer');
    const notaItems = document.querySelectorAll('.nota-item');
    
    if (notaItems.length > 5) {
        notasContainer.classList.add('has-scroll');
        console.log('📜 Scroll habilitado (más de 5 notas)');
    } else {
        notasContainer.classList.remove('has-scroll');
        console.log('📜 Scroll deshabilitado (5 o menos notas)');
    }
}

/**
 * Elimina una nota específica y redistribuye los pesos
 * @param {number} notaIndex - Índice de la nota a eliminar
 */
function eliminarNota(notaIndex) {
    console.log('🗑️ Eliminando nota:', notaIndex);
    
    const notaItem = document.getElementById(`nota-item-${notaIndex}`);
    if (notaItem) {
        console.log('✅ Elemento encontrado, eliminando del DOM');
        notaItem.remove();

        // Remover de la lista de notas
        const notasAntes = notas.length;
        notas = notas.filter(n => n.id !== `nota${notaIndex}`);
        console.log(`📊 Notas en array: ${notasAntes} → ${notas.length}`);

        // Renumerar las notas restantes
        renumerarNotas();

        // Redistribuir pesos automáticamente
        redistribuirPesosNotas();

        // Verificar scroll
        verificarScroll();
    } else {
        console.log('❌ Elemento no encontrado');
    }
}

/**
 * Redistribuye automáticamente los pesos de las notas restantes
 */
function redistribuirPesosNotas() {
    console.log('⚖️ Redistribuyendo pesos automáticamente');
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
    
    console.log('✅ Pesos redistribuidos:', pesos);
    
    // Calcular automáticamente
    calcular();
}

/**
 * Renumera las notas después de eliminar una
 */
function renumerarNotas() {
    console.log('🔄 Renumerando notas');
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
    console.log('✅ Notas renumeradas exitosamente');
}

/**
 * Obtiene los valores de todos los inputs y los valida
 * @returns {Object} Objeto con notas, pesos, nota objetivo y configuración
 */
function obtenerValores() {
    const notasValores = [];
    const pesosValores = [];
    
    // Obtener notas y pesos
    const notaInputs = document.querySelectorAll('.nota-input');
    const pesoSliders = document.querySelectorAll('.peso-slider');
    
    console.log('📊 Obteniendo valores:');
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

/**
 * Muestra los resultados del cálculo en la interfaz
 * @param {number} notaExamen - Nota necesaria en el examen
 * @param {number} promedioParcial - Promedio ponderado de las parciales
 * @param {number} notaObjetivo - Nota objetivo final
 */
function mostrarResultados(notaExamen, promedioParcial, notaObjetivo) {
    const notaNecesariaElement = document.getElementById('notaNecesaria');
    const statusElement = document.getElementById('resultStatus');
    const statusTextElement = document.getElementById('statusText');
    
    console.log('📊 Mostrando resultados:');
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
    
    console.log('  notaAMostrar final:', notaAMostrar);
    
    // Mostrar nota necesaria grande
    notaNecesariaElement.textContent = notaAMostrar.toFixed(2);
    
    // Aplicar clases de estado
    statusElement.className = `result-status ${statusClass}`;
    statusTextElement.textContent = statusMessage;
}

/**
 * Función principal de cálculo que coordina todo el proceso
 */
function calcular() {
    console.log('🧮 Iniciando cálculo principal');
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
        
        console.log('📈 Resultados del cálculo:');
        console.log('  Notas:', valores.notas);
        console.log('  Pesos:', valores.pesos);
        console.log('  Promedio parcial:', promedioParcial);
        console.log('  Nota examen calculada:', notaExamen);
        console.log('  Nota objetivo:', valores.notaObjetivo);
        
        // Mostrar resultados
        mostrarResultados(notaExamen, promedioParcial, valores.notaObjetivo);
        
    } catch (error) {
        console.error('❌ Error en el cálculo:', error);
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

/**
 * Valida inputs en tiempo real
 * @param {HTMLInputElement} input - Elemento input a validar
 */
function validarInput(input) {
    const valor = parseFloat(input.value);
    const min = parseFloat(input.min);
    const max = parseFloat(input.max);
    
    if (valor < min || valor > max) {
        input.style.borderColor = '#f56565';
        console.log('❌ Input inválido:', valor);
    } else {
        input.style.borderColor = '#48bb78';
        console.log('✅ Input válido:', valor);
    }
}

/**
 * Limpia completamente el formulario y restaura valores por defecto
 */
function limpiarFormulario() {
    console.log('🧹 Limpiando formulario completo');
    
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
    
    console.log('✅ Formulario limpiado exitosamente');
}

/**
 * Exporta los resultados a un archivo de texto
 */
function exportarResultados() {
    console.log('📤 Exportando resultados');
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
    
    console.log('✅ Resultados exportados exitosamente');
}

/**
 * Muestra recomendaciones específicas al hacer click en "Estudia más"
 */
function mostrarRecomendacionesEstudio() {
    const recomendaciones = [
        {
            titulo: "📚 Técnicas de Estudio Efectivas",
            consejos: [
                "Usa el método Pomodoro: 25 min de estudio + 5 min de descanso",
                "Crea mapas mentales para conectar conceptos",
                "Practica con ejercicios similares a los del examen",
                "Enseña lo que aprendiste a alguien más (método Feynman)"
            ]
        },
        {
            titulo: "⏰ Organización del Tiempo",
            consejos: [
                "Planifica sesiones de 2-3 horas máximo por día",
                "Estudia en el mismo horario todos los días",
                "Prioriza los temas que más peso tienen en la evaluación",
                "Deja tiempo para repaso la noche anterior al examen"
            ]
        },
        {
            titulo: "🎯 Enfoque en Temas Clave",
            consejos: [
                "Identifica los conceptos fundamentales del curso",
                "Revisa los apuntes de las clases más importantes",
                "Practica con exámenes anteriores si están disponibles",
                "Concentra el 80% del tiempo en el 20% de temas más importantes"
            ]
        }
    ];
    
    const recomendacionAleatoria = recomendaciones[Math.floor(Math.random() * recomendaciones.length)];
    
    let mensaje = `🎓 ${recomendacionAleatoria.titulo}\n\n`;
    recomendacionAleatoria.consejos.forEach(consejo => {
        mensaje += `• ${consejo}\n`;
    });
    
    alert(mensaje);
    console.log('💡 Mostrando recomendaciones de estudio:', recomendacionAleatoria.titulo);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando Calculadora de Notas');
    
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
    
    // Agregar funcionalidad a las recomendaciones
    const recomendacionCards = document.querySelectorAll('.recomendacion-card');
    recomendacionCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            const titulo = this.querySelector('h3').textContent;
            if (titulo === 'Estudia más') {
                mostrarRecomendacionesEstudio();
            } else {
                console.log('💡 Click en recomendación:', titulo);
                // Aquí puedes agregar más funcionalidades para otras recomendaciones
            }
        });
    });
    
    console.log('✅ Calculadora de Notas inicializada exitosamente');
}); 