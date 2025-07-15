# 📊 Calculadora de Notas - VC Nota

Una calculadora web moderna y fácil de usar para determinar la nota que necesitas en el examen final para aprobar una asignatura.

## ✨ Características

- **Interfaz moderna y responsiva**: Diseño atractivo que funciona en cualquier dispositivo
- **Cálculos precisos**: Implementa la misma lógica que tu código Python original
- **Validación en tiempo real**: Verifica que los datos ingresados sean válidos
- **Visualización de progreso**: Barra de progreso que muestra qué tan cerca estás del objetivo
- **Exportación de resultados**: Guarda tus resultados en un archivo de texto
- **Configuración flexible**: Personaliza pesos y nota objetivo según tu universidad

## 🚀 Cómo usar

1. **Abre el archivo `index.html`** en tu navegador web
2. **Ingresa tus notas parciales** (valores entre 1.0 y 7.0)
3. **Configura los pesos** de cada nota (deben sumar 100%)
4. **Establece la nota objetivo** que quieres alcanzar
5. **Ajusta los pesos** de parciales vs examen final
6. **Haz clic en "Calcular"** para ver los resultados

## 📋 Ejemplo de uso

Con las notas por defecto:
- Nota 1: 7.0 (peso: 10%)
- Nota 2: 4.9 (peso: 25%)
- Nota 3: 5.7 (peso: 30%)
- Nota 4: 2.0 (peso: 35%)
- Nota objetivo: 4.0
- Peso parciales: 60%
- Peso examen: 40%

**Resultado**: Necesitas aproximadamente 3.85 en el examen final para aprobar.

## 🔧 Funciones incluidas

### Funciones principales (traducidas del Python original):

```javascript
// Calcula el promedio ponderado de las notas parciales
function calcularPromedioParcial(notas, pesos)

// Calcula la nota necesaria en el examen para alcanzar el objetivo
function calcularNotaExamenObjetivo(notaObjetivo, parcial, pesoParcial, pesoExamen)
```

### Funciones adicionales:

- **Validación automática**: Verifica que los pesos sumen 100%
- **Actualización en tiempo real**: Los pesos se ajustan automáticamente
- **Exportación**: Guarda resultados en archivo de texto
- **Limpieza**: Restaura valores por defecto

## 🎨 Características del diseño

- **Gradientes modernos**: Fondo con degradado atractivo
- **Animaciones suaves**: Transiciones y efectos hover
- **Responsive design**: Se adapta a móviles y tablets
- **Validación visual**: Los campos cambian de color según su validez
- **Estados de resultado**: Diferentes colores según la viabilidad

## 📱 Compatibilidad

- ✅ Chrome (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Móviles y tablets

## 🛠️ Tecnologías utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con Flexbox y Grid
- **JavaScript ES6+**: Lógica de cálculo y interactividad
- **Google Fonts**: Tipografía Inter

## 📁 Estructura de archivos

```
VC_Nota/
├── index.html      # Página principal
├── styles.css      # Estilos y diseño
├── script.js       # Lógica de cálculo
└── README.md       # Este archivo
```

## 🎯 Estados de resultado

- **🟢 Verde**: Ya estás aprobado, no necesitas nada en el examen
- **🔵 Azul**: Es posible alcanzar la nota objetivo
- **🔴 Rojo**: Es imposible, necesitarías más de 7.0

## 💡 Consejos de uso

1. **Verifica los pesos**: Asegúrate de que sumen exactamente 100%
2. **Usa valores reales**: Ingresa las notas que realmente obtuviste
3. **Ajusta la configuración**: Los pesos pueden variar según tu universidad
4. **Exporta los resultados**: Guarda tus cálculos para referencia futura

## 🔄 Actualizaciones futuras

- [ ] Soporte para más de 4 notas parciales
- [ ] Historial de cálculos
- [ ] Modo oscuro
- [ ] Calculadora de GPA
- [ ] Integración con sistemas universitarios

---

**Desarrollado con ❤️ para estudiantes**

¿Tienes alguna sugerencia o encontraste un error? ¡No dudes en contactarme! 