// Selecciona el botón de menú hamburguesa y el contenedor del menú de navegación
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

// Verifica el tamaño de la pantalla
const checkScreenSize = () => {
  const isMobile = window.innerWidth <= 912; // Puedes ajustar este valor para considerar otras pantallas, como tablets
  if (isMobile) {
    menuToggle.style.display = 'block'; // Muestra el botón de menú en móviles
  } else {
    menuToggle.style.display = 'none'; // Oculta el botón de menú en pantallas grandes
    navMenu.classList.remove('active'); // Si se está mostrando el menú, lo oculta en pantallas grandes
  }
};

// Llama la función cuando la página se cargue
checkScreenSize();

// Agrega un event listener para el cambio de tamaño de la ventana
window.addEventListener('resize', checkScreenSize);

// Añade un evento de clic al botón para alternar la clase 'active' en el menú
menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});