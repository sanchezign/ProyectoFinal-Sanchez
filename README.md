# Proyecto Final - Tienda Online Simulada

Proyecto final del curso de JavaScript en CoderHouse.  
Simulador interactivo de Tienda Online que consume una API remota (Fake Store API), usa bibliotecas externas (Bootstrap para estilos, SweetAlert2 para alertas), e incorpora interactividad asíncrona con fetch, eventos y DOM manipulation. Cumple con todos los requisitos de la consigna: consumo de API, bibliotecas, asincronía, etc.

![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow)  
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-blueviolet)  
![SweetAlert2](https://img.shields.io/badge/SweetAlert2-10-orange)  
![API](https://img.shields.io/badge/Fake%20Store%20API-REST-green)

## Objetivos cumplidos

- Consumo de API remota (Fake Store API) para obtener productos dinámicamente.
- Bibliotecas externas: Bootstrap para responsive design y estilos, SweetAlert2 para alertas interactivas.
- Interactividad asíncrona: Fetch para cargar productos, eventos para agregar al carrito, y manejo de errores.
- Manipulación del DOM: Actualización dinámica de la lista de productos y carrito.
- Código modular y limpio: Separación en funciones para carga de data, carrito y UI.

## Instrucciones de instalación y uso (paso a paso)

1. **Clonar el repositorio**  
   ```bash
   git clone https://github.com/tu-usuario/ProyectoFinal-Sanchez.git
   cd ProyectoFinal-Sanchez

2. Abrir el proyecto en VS Code (recomendado para desarrollo)
Abre la carpeta con code .

3. Instalar extensiones recomendadas (opcional pero útil)
Live Server (para servir localmente y evitar problemas con CORS en fetch).
Busca "Live Server" en Extensions de VS Code e instala.

4. Ejecutar el proyecto
Abre index.html directamente en un navegador (Chrome/Firefox).
O usa Live Server: Click derecho en index.html → "Open with Live Server" (levanta un server local en http://127.0.0.1:5500).

5. Probar la tienda
La página carga productos de la API automáticamente.
Agrega al carrito, ve alertas con SweetAlert2, y disfruta la interactividad.


Tecnologías usadas

HTML5: Estructura de la página y elementos interactivos.
CSS3 con Bootstrap: Estilos responsive, grids y componentes (botones, modales).
JavaScript (ES6+): Lógica principal, fetch asíncrono, eventos DOM, localStorage para carrito persistente.
API: Fake Store API para datos reales de productos.

Notas finales

El proyecto es responsive y funciona en móvil/desktop.
Manejo de errores: Si la API falla, muestra alertas con SweetAlert2.
Código comentado y modular para fácil comprensión.
Si hay problemas con fetch (CORS), usa Live Server.

   


