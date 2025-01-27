document.querySelector('#loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }

    try {
        const response = await fetch('https://node-sql-hxl7yb1i9-abdulla-al-haruns-projects.vercel.app/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include'  // Ensures cookies are sent if needed
        });

        if (!response.ok) {
            throw new Error('Invalid email or password');
        }

        const data = await response.json();
        alert(data.message);

        // Store session and redirect
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = 'home.html';

    } catch (error) {
        console.error('Error:', error);
        alert('Login failed. Please check your credentials.');
    }
});
