// nav menu toggle
document.getElementById('menuToggle').onclick = () => {
  document.querySelector('nav').classList.toggle('responsive');
};

// slider
let idx = 0;
const slides = document.querySelector('.slides');
const total = document.querySelectorAll('.slide').length;
const updateSlider = () => {
  const w = document.querySelector('.slide').clientWidth;
  slides.style.transform = `translateX(-${idx * w}px)`;
};
document.getElementById('next').onclick = () => { idx = (idx + 1) % total; updateSlider(); };
document.getElementById('prev').onclick = () => { idx = (idx - 1 + total) % total; updateSlider(); };

// form validation
document.getElementById('contactForm').onsubmit = e => {
  e.preventDefault();
  const email = e.target.email.value;
  const message = e.target.message.value.trim();
  const feedback = document.getElementById('formFeedback');
  if (!/.+@.+\..+/.test(email)) {
    feedback.textContent = 'Please enter a valid email.';
    return;
  }
  if (message.length < 10) {
    feedback.textContent = 'Message too short.';
    return;
  }
  feedback.textContent = 'Thanks, message sent!';
  e.target.reset();
};

// Fetch and display GitHub repositories
const githubProjects = document.getElementById('github-projects');
if (githubProjects) {
  fetch('https://api.github.com/users/ksanthiana/repos?sort=updated')
    .then(response => response.json())
    .then(repos => {
      githubProjects.innerHTML = '';
      repos.slice(0, 6).forEach(repo => {
        const div = document.createElement('div');
        div.className = 'repo-card';
        div.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description ? repo.description : 'No description'}</p>
          <a href="${repo.html_url}" target="_blank" class="project-btn">View on GitHub</a>
        `;
        githubProjects.appendChild(div);
      });
      if (repos.length === 0) {
        githubProjects.innerHTML = '<p>No repositories found.</p>';
      }
    })
    .catch(() => {
      githubProjects.innerHTML = '<p>Could not load repositories.</p>';
    });
}

// Contact Form Validation (simple)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.onsubmit = e => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const feedback = document.getElementById('formFeedback');
    if (!email || !message) {
      feedback.textContent = "Please fill in all fields.";
      feedback.style.color = "red";
      return;
    }
    feedback.textContent = "Thank you for your message!";
    feedback.style.color = "green";
    contactForm.reset();
  };
}

// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.onclick = () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
      themeToggle.textContent = '☀️';
    } else {
      localStorage.setItem('theme', 'light');
      themeToggle.textContent = '🌙';
    }
  };
  // On load, set theme from localStorage
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
  }
}
