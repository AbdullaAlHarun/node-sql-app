document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }

    try {
        const response = await fetch('https://node-sql-l75undl3c-abdulla-al-haruns-projects.vercel.app/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Login failed. Please check your credentials.');
        }

        const data = await response.json();

        // Store user data in local storage
        localStorage.setItem('user', JSON.stringify(data.user));

        alert('Login successful!');
        
        // Redirect to home page
        window.location.href = 'home.html';
    } catch (error) {
        alert(error.message);
    }
});
