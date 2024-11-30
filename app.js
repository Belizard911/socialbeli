document.addEventListener('DOMContentLoaded', function() {
  const postsContainer = document.getElementById('posts');

  const posts = [
    { id: 1, content: 'Привет, мир!', likes: 0, liked: false, comments: [] },
    { id: 2, content: 'Это мой первый пост.', likes: 0, liked: false, comments: [] },
    { id: 3, content: 'Мне нравится эта новая платформа SocialBeli!', likes: 0, liked: false, comments: [] }
  ];

  const likeIconDefault = 'https://img.icons8.com/?size=100&id=100513&format=png&color=000000';
  const likeIconActive = 'https://img.icons8.com/?size=100&id=80137&format=png&color=000000';

  function loadPosts() {
    postsContainer.innerHTML = '';
    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');

      const postContent = document.createElement('p');
      postContent.textContent = post.content;

      const actionsElement = document.createElement('div');
      actionsElement.classList.add('actions');

      const likeButton = document.createElement('button');
      likeButton.classList.add('like-icon');
      likeButton.innerHTML = `<img src="${post.liked ? likeIconActive : likeIconDefault}" alt="Лайк"> (${post.likes})`;
      likeButton.onclick = () => likePost(post.id);

      const commentButton = document.createElement('button');
      commentButton.innerHTML = `<img src="https://img.icons8.com/?size=15&id=11895&format=png&color=000000" alt="Комментировать"> Комментировать`;
      commentButton.onclick = () => commentPost(post.id);

      actionsElement.appendChild(likeButton);
      actionsElement.appendChild(commentButton);

      postElement.appendChild(postContent);
      postElement.appendChild(actionsElement);
      postsContainer.appendChild(postElement);
    });
  }

  window.addPost = function() {
    const textarea = document.querySelector('#new-post textarea');
    const content = textarea.value.trim();
    if (content) {
      posts.push({ id: posts.length + 1, content, likes: 0, liked: false, comments: [] });
      textarea.value = '';
      loadPosts();
    }
  };

  window.likePost = function(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
      post.liked = !post.liked;
      post.likes += post.liked ? 1 : -1;
      loadPosts();
    }
  };

  window.commentPost = function(postId) {
    const comment = prompt('Введите ваш комментарий:');
    if (comment) {
      const post = posts.find(p => p.id === postId);
      if (post) {
        post.comments.push(comment);
        alert('Комментарий добавлен!');
      }
    }
  };

  window.editProfile = function() {
    alert('Функция редактирования профиля будет реализована позже!');
  };

  window.toggleForms = function() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
    registerForm.style.display = registerForm.style.display === 'none' ? 'block' : 'none';
  };

  window.register = function() {
    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value.trim();
    if (username && password) {
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      alert('Регистрация успешна! Теперь вы можете войти.');
      toggleForms();
    } else {
      alert('Пожалуйста, заполните все поля.');
    }
  };

  window.login = function() {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    if (username === storedUsername && password === storedPassword) {
      document.getElementById('auth-container').style.display = 'none';
      document.getElementById('main-container').style.display = 'block';
      loadPosts();
    } else {
      alert('Неправильное имя пользователя или пароль.');
    }
  };

  window.logout = function() {
    document.getElementById('auth-container').style.display = 'block';
    document.getElementById('main-container').style.display = 'none';
  };

  window.showSection = function(sectionId) {
    const sections = document.querySelectorAll('main section');
    sections.forEach(section => {
      section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
  };

  loadPosts();
  showSection('feed'); // Показать "Лента" по умолчанию
});