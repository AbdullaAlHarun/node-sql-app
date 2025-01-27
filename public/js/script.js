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
    const response = await fetch(`${API_URL}/login`, {  // Fixed the template literal syntax
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed. Please check your credentials.');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);  // Store JWT token for further requests
    alert('Login successful!');
    window.location.href = 'home.html';  // Redirect to home page
  } catch (error) {
    console.error('Error:', error.message);
    alert(error.message);
  }
});

// Handle registration
document.getElementById('register-form')?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!name || !email || !password) {
    alert('Please fill in all fields');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/register`, {  // Fixed the template literal syntax
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      throw new Error('Registration failed. Please try again.');
    }

    alert('Registration successful! You can now log in.');
    window.location.href = 'login.html';
  } catch (error) {
    console.error('Error:', error.message);
    alert(error.message);
  }
});

// Logout functionality
document.getElementById('logout-btn')?.addEventListener('click', () => {
  localStorage.removeItem('token');
  alert('Logged out successfully!');
  window.location.href = 'login.html';
});

// Fetch posts on home page
async function fetchPosts() {
  try {
    const response = await fetch('https://node-sql-l75undl3c-abdulla-al-haruns-projects.vercel.app/api/posts');

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const posts = await response.json();
    const postContainer = document.getElementById('posts');

    postContainer.innerHTML = posts.map(post => 
      `<div class="post">
        <h2>${post.title}</h2>
        <p>${post.content}</p>
      </div>`
    ).join('');
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    alert('Failed to load posts.');
  }
}

// Fetch posts if home page is loaded
if (document.getElementById('posts')) {
  fetchPosts();
}
