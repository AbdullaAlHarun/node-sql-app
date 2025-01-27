const API_URL = 'https://node-sql-l75undl3c-abdulla-al-haruns-projects.vercel.app/api/users';

document.getElementById('login-form').addEventListener('submit', async function (event) {
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
            throw new Error('Login failed. Please check your credentials.');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);  // Store JWT token for further requests
        alert('Login successful!');
        
        // Redirect to home page after successful login
        window.location.href = 'home.html';
    } catch (error) {
        console.error('Error:', error.message);
        alert(error.message);
    }
});

// Logout functionality (used on home.html)
document.getElementById('logout-btn')?.addEventListener('click', () => {
    localStorage.removeItem('token');
    alert('Logged out successfully!');
    window.location.href = 'login.html';
});

// Protect pages from unauthorized access (used in home.html)
if (document.getElementById('posts')) {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You must be logged in to view this page');
        window.location.href = 'login.html';
    }
}
