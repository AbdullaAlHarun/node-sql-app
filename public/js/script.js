const API_URL = 'https://node-sql-l75undl3c-abdulla-al-haruns-projects.vercel.app/api';

document.querySelector('#loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
            mode: 'cors'  // Important to include
        });

        if (!response.ok) {
            throw new Error('Invalid email or password');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        alert('Login successful!');
        window.location.href = 'home.html';

    } catch (error) {
        console.error('Error:', error);
        alert('Login failed. Please check your credentials.');
    }
});
