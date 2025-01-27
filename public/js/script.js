const API_URL = 'https://node-sql-l75undl3c-abdulla-al-haruns-projects.vercel.app/api/users/login';

document.querySelector('#loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Invalid email or password');
        }

        const data = await response.json();
        alert('Login successful!');
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = 'home.html';
    } catch (error) {
        console.error('Error:', error);
        alert('Login failed. Please check your credentials.');
    }
});
