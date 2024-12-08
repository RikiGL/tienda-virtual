    // Llamada a la API de login cuando se envíe el formulario
    document.getElementById('login-container').addEventListener('submit', async (event) => {
      event.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      // Hacer una solicitud POST al back-end para hacer login
      const response = await fetch('http://localhost:4000/api/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        alert('Login exitoso: ' + data.message);
      } else {
        alert('Error de login');
      }
    });