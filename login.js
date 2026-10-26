/**
 * Romantic Login Script
 * Handles credentials check: 'Mental Munda' & 'Nani Bava'
 */

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const loginCard = document.getElementById('login-card');
  const alertContainer = document.getElementById('alert-container');
  const togglePasswordBtn = document.getElementById('toggle-password');
  const passwordIcon = document.getElementById('password-toggle-icon');
  const loginBtn = document.getElementById('login-btn');

  // Spawn floating background particles
  createFloatingParticles();

  // Toggle password visibility
  if (togglePasswordBtn) {
    togglePasswordBtn.addEventListener('click', () => {
      const isPassword = passwordInput.getAttribute('type') === 'password';
      passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
      passwordIcon.classList.toggle('bi-eye');
      passwordIcon.classList.toggle('bi-eye-slash');
    });
  }

  // Handle Form Submission
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Reset previous alert
    alertContainer.innerHTML = '';
    loginCard.classList.remove('shake-card');

    // Expected Credentials:
    // Username: 'Mental Munda'
    // Password: 'Nani Bava'
    const isUsernameCorrect = username.toLowerCase() === 'mental munda';
    const isPasswordCorrect = password.toLowerCase() === 'nani bava';

    if (isUsernameCorrect && isPasswordCorrect) {
      handleLoginSuccess();
    } else {
      handleLoginFailure(username, password);
    }
  });

  // Success Handler
  function handleLoginSuccess() {
    // Save authentication session
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('currentUser', 'Mental Munda');
    sessionStorage.setItem('partnerName', 'Nani Bava');

    // Button loading state
    loginBtn.disabled = true;
    loginBtn.innerHTML = `
      <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
      Unlocking our world... 💖
    `;

    // Confetti celebration
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ff4b72', '#ff758c', '#ffd1dc', '#7928ca', '#ffffff']
      });
      // Second burst
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 350);
    }

    // Success alert banner
    alertContainer.innerHTML = `
      <div class="alert alert-success d-flex align-items-center shadow-sm rounded-4 border-0" role="alert" style="background-color: #d1e7dd; color: #0f5132;">
        <i class="bi bi-heart-fill text-danger me-2 fs-5"></i>
        <div>
          <strong>Access Granted! ✨</strong> Welcome my sweet Mental Munda! Taking you to our special place... 🥰
        </div>
      </div>
    `;

    // Smooth redirect to home.html
    setTimeout(() => {
      window.location.href = 'home.html';
    }, 1500);
  }

  // Failure Handler
  function handleLoginFailure(enteredUser, enteredPass) {
    // Shake effect
    void loginCard.offsetWidth; // trigger reflow
    loginCard.classList.add('shake-card');

    let errorDetail = "Only <strong>Mental Munda</strong> and her <strong>Nani Bava</strong> can enter here! 🙈";
    
    if (enteredUser.toLowerCase() !== 'mental munda' && enteredPass.toLowerCase() === 'nani bava') {
      errorDetail = "Password is sweet! But who are you? Username must be your special nickname: <strong>Mental Munda</strong> 😜";
    } else if (enteredUser.toLowerCase() === 'mental munda' && enteredPass.toLowerCase() !== 'nani bava') {
      errorDetail = "Hello Mental Munda! 💕 But the password must be your favorite person: <strong>Nani Bava</strong>! 🥰";
    }

    alertContainer.innerHTML = `
      <div class="alert alert-danger d-flex align-items-center shadow-sm rounded-4 border-0 animate__animated animate__fadeIn" role="alert" style="background-color: #ffe5ec; color: #9c1c45;">
        <i class="bi bi-exclamation-heart-fill text-danger me-2 fs-5"></i>
        <div>
          ${errorDetail}
        </div>
      </div>
    `;
  }
});

// Create floating hearts & stars
function createFloatingParticles() {
  const container = document.getElementById('floating-hearts-bg');
  if (!container) return;

  const icons = ['❤️', '💖', '💕', '✨', '🌸', '🍓', '🧸', '💌'];
  
  function addParticle() {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.innerText = icons[Math.floor(Math.random() * icons.length)];
    
    const randomLeft = Math.random() * 95; // viewport width %
    const randomDuration = 7 + Math.random() * 8; // 7s to 15s
    const randomSize = 1 + Math.random() * 1.5; // rem
    
    particle.style.left = `${randomLeft}vw`;
    particle.style.animationDuration = `${randomDuration}s`;
    particle.style.fontSize = `${randomSize}rem`;
    
    container.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, randomDuration * 1000);
  }

  // Initial burst
  for (let i = 0; i < 15; i++) {
    setTimeout(addParticle, i * 300);
  }

  // Continuous generation
  setInterval(addParticle, 1200);
}
