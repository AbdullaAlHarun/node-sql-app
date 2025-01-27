const API_URL = 'https://node-sql-hxl7yb1i9-abdulla-al-haruns-projects.vercel.app/api';

// Fetch all posts and display them on home.html
async function fetchPosts() {
  const response = await fetch(`${API_URL}/posts`);
  const posts = await response.json();

  const postsContainer = document.getElementById('posts');
  postsContainer.innerHTML = '';

  posts.forEach(post => {
    postsContainer.innerHTML += `
      <div class="bg-white p-4 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold">${post.title}</h3>
        <p class="text-gray-600">${post.content}</p>
      </div>
    `;
  });
}

// Create a new post
document.getElementById('createPostForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content })
  });

  window.location.href = 'home.html';
});

document.addEventListener('DOMContentLoaded', fetchPosts);
