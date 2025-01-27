// Selecciona el botón de menú hamburguesa y el contenedor del menú de navegación
const menuToggle = document.querySelector('.p-hamburger-icon'); // Asegúrate de usar la clase correcta
const navMenu = document.querySelector('.hamburger-menu');

// Función para verificar el tamaño de la pantalla y ajustar visibilidad
const checkScreenSize = () => {
  const isMobile = window.innerWidth <= 728; // Pantallas menores o iguales a 728px
  if (isMobile) {
    menuToggle.style.display = 'block'; // Mostrar el ícono en móviles
  } else {
    menuToggle.style.display = 'none'; // Ocultar el ícono en pantallas grandes
    navMenu.classList.remove('open'); // Asegurarse de que el menú esté cerrado
  }
};

// Llama la función cuando la página se cargue
window.addEventListener('load', checkScreenSize);

// Agrega un event listener para el cambio de tamaño de la ventana
window.addEventListener('resize', checkScreenSize);

// Evento de clic para alternar la clase 'open' en el menú
menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});