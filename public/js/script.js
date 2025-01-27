const API_URL = 'https://node-sql-l75undl3c-abdulla-al-haruns-projects.vercel.app/api/users';

// Handle login
document.getElementById('login-form')?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!email || !password) {
    alert('Please fill in all fields');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Login failed. Please check your credentials.');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);  // Store JWT token
    alert('Login successful!');
    window.location.href = 'home.html';  // Redirect to home page
  } catch (error) {
    console.error('Error:', error.message);
    alert(error.message);
  }
});
