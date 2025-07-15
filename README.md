# 📊 Calculadora de Notas - VC Nota

Una aplicación web moderna y intuitiva para calcular la nota necesaria en el examen final para aprobar, basándose en las notas parciales y sus pesos respectivos.

## 🎯 Características

- **Cálculo automático**: Obtén resultados en tiempo real mientras ingresas tus notas
- **Notas dinámicas**: Agrega o elimina notas parciales según necesites
- **Pesos ajustables**: Distribuye los pesos de las notas con sliders intuitivos
- **Interfaz moderna**: Diseño responsivo y amigable
- **Recomendaciones interactivas**: Consejos de estudio al hacer click
- **Exportación de resultados**: Descarga tus cálculos en formato de texto
- **Formateo automático**: Los números enteros se convierten automáticamente a decimales (ej: 7 → 7.0)

## 🧮 Lógica de Cálculo

La aplicación utiliza la siguiente fórmula matemática:

```
Nota final = (Promedio ponderado de parciales × 0.6) + (Nota examen × 0.4)
```

Para calcular la nota necesaria en el examen:

```
Nota necesaria en examen = (Nota objetivo - (Promedio parcial × 0.6)) / 0.4
```

### Ejemplo de cálculo:

Si tienes:
- Nota 1: 4.9 (peso 35%)
- Nota 2: 5.7 (peso 30%)
- Nota 3: 7.0 (peso 35%)
- Nota objetivo: 4.0

**Cálculo:**
1. Promedio parcial = (4.9 × 0.35) + (5.7 × 0.30) + (7.0 × 0.35) = 5.875
2. Aporte parcial = 5.875 × 0.6 = 3.525
3. Nota necesaria = (4.0 - 3.525) / 0.4 = 1.19

**Resultado:** Necesitas 1.19 en el examen para aprobar con 4.0

## 🚀 Instalación y Uso

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- No requiere instalación de software adicional

### Pasos para usar
1. Abre `index.html` en tu navegador
2. Ingresa tus notas parciales en los campos correspondientes
3. Ajusta los pesos de cada nota usando los sliders
4. Establece tu nota objetivo final
5. La nota necesaria en el examen se calculará automáticamente

## 📁 Estructura del Proyecto

```
calculadora-notas/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript
└── README.md           # Documentación
```

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con gradientes y animaciones
- **JavaScript ES6+**: Lógica de cálculo y interactividad
- **Font Awesome**: Iconos y emojis
- **Google Fonts**: Tipografía Inter

## 🎨 Características de la Interfaz

### Diseño Responsivo
- Se adapta a diferentes tamaños de pantalla
- Layout de dos columnas en desktop
- Diseño de una columna en móviles

### Elementos Interactivos
- **Sliders de peso**: Ajusta los pesos de las notas con controles deslizantes
- **Botones de acción**: Agregar, eliminar, limpiar y exportar
- **Validación en tiempo real**: Los inputs se validan automáticamente
- **Recomendaciones clickeables**: Haz click en las tarjetas para obtener consejos específicos

### Estados Visuales
- **Éxito**: Verde cuando ya estás aprobado
- **Advertencia**: Rojo cuando es imposible alcanzar la nota
- **Información**: Azul cuando es posible alcanzar la nota objetivo

## 🔧 Funcionalidades Avanzadas

### Formateo Automático
- Los números enteros se convierten automáticamente a decimales
- Ejemplo: escribir "7" se convierte en "7.0"
- Acepta tanto comas como puntos como separadores decimales

### Redistribución de Pesos
- Al eliminar una nota, los pesos se redistribuyen automáticamente
- Los pesos siempre suman 100% entre las notas parciales
- Los sliders se ajustan en múltiplos de 5 para facilitar el uso

### Recomendaciones Inteligentes
- Click en "Estudia más" para obtener técnicas específicas
- Consejos aleatorios cada vez que haces click
- Métodos probados como Pomodoro, Feynman, etc.

## 📱 Compatibilidad

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Móviles (iOS Safari, Chrome Mobile)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**CEOAlmaloco**
- GitHub: [@CEOAlmaloco](https://github.com/CEOAlmaloco)

## 🙏 Agradecimientos

- Inspirado en la necesidad de los estudiantes de calcular notas de manera eficiente
- Diseño inspirado en las mejores prácticas de UX/UI modernas
- Lógica matemática basada en sistemas de evaluación académica chilenos

## 📞 Soporte

Si tienes alguna pregunta o encuentras un bug, por favor:

1. Revisa la consola del navegador (F12) para ver logs de debugging
2. Abre un issue en GitHub
3. Contacta al autor

---

**¡El éxito académico está en tus manos!** 🎓✨ 