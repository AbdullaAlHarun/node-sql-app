// Backend API URL
const API_URL = 'https://node-sql-l75undl3c-abdulla-al-haruns-projects.vercel.app/api';

// Handle login form submission
document.querySelector('#loginForm')?.addEventListener('submit', async function (e) {
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
            mode: 'cors' // Ensure CORS support
        });

        if (!response.ok) {
            throw new Error('Invalid email or password');
        }

        const data = await response.json();

        // Store JWT token and user info in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        alert('Login successful!');
        window.location.href = 'home.html';

    } catch (error) {
        console.error('Error:', error);
        alert('Login failed. Please check your credentials.');
    }
});

// Fetch user data after login
function fetchUsers() {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('You need to log in first.');
        window.location.href = 'login.html';
        return;
    }

    fetch(`${API_URL}/users`, {
        headers: {
            'Authorization': `Bearer ${token}`,  // Send token in Authorization header
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return response.json();
    })
    .then(data => {
        console.log('Users:', data);
        displayUsers(data);
    })
    .catch(err => {
        console.error(err);
        alert('Error fetching users, please log in again.');
        window.location.href = 'login.html';
    });
}

// Display user list on home page
function displayUsers(users) {
    const userContainer = document.querySelector('#userList');
    if (userContainer) {
        userContainer.innerHTML = '';  // Clear existing content
        users.forEach(user => {
            const userItem = document.createElement('li');
            userItem.textContent = `${user.name} - ${user.email}`;
            userContainer.appendChild(userItem);
        });
    }
}

// Logout function
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    alert('Logged out successfully');
    window.location.href = 'login.html';
}

// Attach logout function to logout button
document.querySelector('#logoutBtn')?.addEventListener('click', logout);

// Run fetchUsers() on home page load
document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.includes('home.html')) {
        fetchUsers();
    }
});
