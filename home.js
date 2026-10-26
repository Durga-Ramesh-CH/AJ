/**
 * Home Page Logic
 * Interactive features for Mental Munda
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check Authentication
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  if (isLoggedIn !== 'true') {
    // If not authenticated, redirect to login page
    window.location.href = 'index.html';
    return;
  }

  // Floating background particles
  createFloatingParticles();

  // Welcome celebration confetti on arrival
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#ff4b72', '#ff758c', '#ffd1dc', '#ffffff']
    });
  }

  // Handle Logout
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      sessionStorage.clear();
      window.location.href = 'index.html';
    });
  }

  // Interactive Runaway "NO" Button
  setupRunawayButton();

  // Interactive "YES" Button
  const yesBtn = document.getElementById('yes-btn');
  const loveResponseAlert = document.getElementById('love-response-alert');
  if (yesBtn && loveResponseAlert) {
    yesBtn.addEventListener('click', () => {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ff4b72', '#ff2a5f', '#ff8099', '#7928ca']
      });

      loveResponseAlert.classList.remove('d-none');
      loveResponseAlert.innerHTML = `
        <div class="alert alert-success d-flex align-items-center rounded-4 border-0 shadow-sm animate__animated animate__zoomIn" style="background-color: #ffe5ec; color: #a30b42;">
          <span class="fs-2 me-3">💍💖</span>
          <div>
            <h5 class="fw-bold mb-1 serif-font">I Knew It! 🥰</h5>
            <p class="mb-0 small">Nani Bava loves his Mental Munda even more! To infinity and beyond! ✨</p>
          </div>
        </div>
      `;
    });
  }

  // Reasons Why You're Special Generator
  setupReasonGenerator();

  // Digital Mood Envelopes ("Open When..." Letters)
  setupMoodLetters();

  // Our Memory Calendar & Timeline
  setupMemoryCalendar();

  // Click-to-spawn-heart everywhere on screen
  setupScreenClickHearts();
});

// Runaway "NO" button logic
function setupRunawayButton() {
  const noBtn = document.getElementById('no-btn');
  const container = document.getElementById('runaway-zone');
  if (!noBtn || !container) return;

  const playfulMessages = [
    "No way! 😜",
    "Nice try Mental Munda! 😂",
    "Wrong button silly! 💕",
    "You can't escape my love! 🏃‍♂️",
    "Error 404: 'No' Not Found! 🤖",
    "Arey Mental Munda, click YES! 🥰"
  ];

  let msgIndex = 0;

  function moveButton() {
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const maxX = containerRect.width - btnRect.width - 20;
    const maxY = containerRect.height - btnRect.height - 20;

    const randomX = Math.max(10, Math.floor(Math.random() * maxX));
    const randomY = Math.max(10, Math.floor(Math.random() * maxY));

    noBtn.style.position = 'absolute';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;

    msgIndex = (msgIndex + 1) % playfulMessages.length;
    noBtn.innerText = playfulMessages[msgIndex];
  }

  noBtn.addEventListener('mouseenter', moveButton);
  noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveButton();
  });
  noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveButton();
  });
}

// ===================================================
// 10 Reasons You're Special Feature
// ===================================================
function setupReasonGenerator() {
  const nextReasonBtn = document.getElementById('next-reason-btn');
  const viewDiscoveredBtn = document.getElementById('view-discovered-btn');
  const resetReasonsBtn = document.getElementById('reset-reasons-btn');
  
  const reasonDisplay = document.getElementById('reason-display');
  const reasonNumberBadge = document.getElementById('reason-number-badge');
  const reasonNewBadge = document.getElementById('reason-new-badge');
  
  const discoveredCounterBadge = document.getElementById('discovered-counter-badge');
  const discoveredPercentageText = document.getElementById('discovered-percentage-text');
  const reasonsProgressBar = document.getElementById('reasons-progress-bar');
  const unlockedBtnCount = document.getElementById('unlocked-btn-count');
  const modalUnlockedCount = document.getElementById('modal-unlocked-count');
  const milestoneAlert = document.getElementById('milestone-alert');
  const discoveredReasonsList = document.getElementById('discovered-reasons-list');

  const viewDiscoveredModalEl = document.getElementById('viewDiscoveredModal');
  const viewDiscoveredModal = viewDiscoveredModalEl ? bootstrap.Modal.getOrCreateInstance(viewDiscoveredModalEl) : null;

  if (!nextReasonBtn || !reasonDisplay) return;

  // Curated 10 Reasons Why You're Special
  const reasons10 = [
    "When you put on a bottu, your face looks extra cute, ra bangaram. 🥹❤️ I don't know how to explain it, but that little bottu makes me fall for you all over again. You look like my little princess.",
    "Your cute cute matalu are my favorite thing in the world. Even your smallest words make me smile like a little kid. Sometimes, I don't even need a reason to be happy. Just talking to you is enough, ra bangaram.",
    "I love our arguments too, mental munda! 😂❤️ Sometimes we fight, sometimes we get angry, but at the end of the day, you are still my favorite person. Even our little fights become beautiful memories for me",
    "The silly things you do, your funny reactions, and your unexpected dialogues make my day so much better. With you, even a boring day becomes a comedy show. You are my personal entertainer, ra mental munda!",
    "Your smile is my weakness, ra bangaram. ❤️ The moment you smile, my mood changes automatically. ",
    "When you get angry and start scolding me, sometimes I feel like laughing because you look so cute. ",
    "With you, I can be childish, silly, emotional, and completely myself. I don't always need perfect words or a reason to talk to you.",
    "Because no one in this entire universe makes my heart flutter the way you do. 🦋",
    "Because having your hand in mine makes me feel like the luckiest guy alive. 🍀🤝",
    "Because I love you unconditionally, endlessly, and with every beat of my heart—today, tomorrow, and Untill you get engagement💖💍"
  ];

  // Retrieve or initialize discovered indices
  let discoveredIndices = [];
  try {
    const saved = localStorage.getItem('discovered_reasons_10_indices');
    discoveredIndices = saved ? JSON.parse(saved) : [0];
    if (!Array.isArray(discoveredIndices) || discoveredIndices.length === 0) {
      discoveredIndices = [0];
    }
    // Filter to ensure only valid indices (0 to 9)
    discoveredIndices = discoveredIndices.filter(i => i >= 0 && i < reasons10.length);
    if (discoveredIndices.length === 0) discoveredIndices = [0];
  } catch (e) {
    discoveredIndices = [0];
  }

  let discoveredSet = new Set(discoveredIndices);
  let activeReasonIndex = discoveredIndices[discoveredIndices.length - 1] || 0;

  // Update progress bar and counter UI
  function updateProgressUI() {
    const count = discoveredSet.size;
    const percentage = Math.min(100, Math.round((count / reasons10.length) * 100));

    if (discoveredCounterBadge) {
      discoveredCounterBadge.textContent = `${count} / ${reasons10.length} Reasons`;
    }
    if (discoveredPercentageText) {
      discoveredPercentageText.textContent = `${percentage}% Unlocked`;
    }
    if (reasonsProgressBar) {
      reasonsProgressBar.style.width = `${percentage}%`;
      reasonsProgressBar.setAttribute('aria-valuenow', percentage);
    }
    if (unlockedBtnCount) {
      unlockedBtnCount.textContent = count;
    }
    if (modalUnlockedCount) {
      modalUnlockedCount.textContent = count;
    }

    // Milestone celebrations
    if (milestoneAlert) {
      if (count === 10) {
        milestoneAlert.classList.remove('d-none');
        milestoneAlert.innerHTML = `
          <div class="alert alert-success d-flex align-items-center rounded-4 border-0 shadow-sm p-3 mb-0" style="background-color: #d1e7dd; color: #0f5132;">
            <span class="fs-1 me-3">🎉👑💖</span>
            <div>
              <h5 class="fw-bold mb-1 serif-font">ALL 10 REASONS UNLOCKED!</h5>
              <p class="mb-0 small">You discovered all 10 reasons, Mental Munda! But the truth is... Nani Bava's love for you has a million more reasons! 🥰✨</p>
            </div>
          </div>
        `;
      } else if (count === 5) {
        milestoneAlert.classList.remove('d-none');
        milestoneAlert.innerHTML = `
          <div class="alert alert-info rounded-4 border-0 p-2 mb-0 small text-center">
            🌟 <strong>Milestone:</strong> Halfway there! 5 reasons unlocked! You are irreplaceable, Mental Munda! 💕
          </div>
        `;
      } else {
        milestoneAlert.classList.add('d-none');
      }
    }
  }

  // Display a reason smoothly
  function renderReason(index, isNew) {
    activeReasonIndex = index;

    // Fade out
    reasonDisplay.style.opacity = '0';

    setTimeout(() => {
      reasonDisplay.textContent = `"${reasons10[index]}"`;
      reasonDisplay.style.opacity = '1';

      if (reasonNumberBadge) {
        reasonNumberBadge.textContent = `Reason #${index + 1} of ${reasons10.length}`;
      }

      if (reasonNewBadge) {
        if (isNew) {
          reasonNewBadge.classList.remove('d-none');
        } else {
          reasonNewBadge.classList.add('d-none');
        }
      }
    }, 200);
  }

  // Pick and reveal a random reason
  function revealRandomReason() {
    let pickedIndex;
    let isNew = false;

    // Find undiscovered indices
    const allIndices = Array.from({ length: reasons10.length }, (_, i) => i);
    const undiscovered = allIndices.filter(i => !discoveredSet.has(i));

    if (undiscovered.length > 0) {
      // 75% chance to reveal an undiscovered reason, 25% chance for any random reason
      const shouldPickNew = Math.random() < 0.75;
      if (shouldPickNew) {
        pickedIndex = undiscovered[Math.floor(Math.random() * undiscovered.length)];
      } else {
        pickedIndex = Math.floor(Math.random() * reasons10.length);
      }
    } else {
      // All 10 already discovered, pick any random reason
      pickedIndex = Math.floor(Math.random() * reasons10.length);
    }

    // If never discovered before, mark it as new
    if (!discoveredSet.has(pickedIndex)) {
      discoveredSet.add(pickedIndex);
      isNew = true;
      localStorage.setItem('discovered_reasons_10_indices', JSON.stringify([...discoveredSet]));
      updateProgressUI();

      // Celebration confetti for new discovery!
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#ff4b72', '#ff758c', '#ffd1dc', '#7928ca']
        });
      }
    } else {
      // Small sprinkle
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 15,
          spread: 35,
          origin: { y: 0.8 },
          colors: ['#ffccd5', '#ffffff']
        });
      }
    }

    renderReason(pickedIndex, isNew);
  }

  // Initialize UI
  updateProgressUI();
  renderReason(activeReasonIndex, false);

  // Next reason button click
  nextReasonBtn.addEventListener('click', revealRandomReason);

  // View All Discovered Modal
  if (viewDiscoveredBtn) {
    viewDiscoveredBtn.addEventListener('click', () => {
      if (!discoveredReasonsList) return;

      const sorted = Array.from(discoveredSet).sort((a, b) => a - b);
      
      discoveredReasonsList.innerHTML = sorted.map(idx => `
        <div class="list-group-item border rounded-3 p-3 mb-2 shadow-sm bg-white">
          <div class="d-flex align-items-center justify-content-between mb-1">
            <span class="badge bg-danger-subtle text-danger rounded-pill px-3 py-1 fw-bold">
              Reason #${idx + 1}
            </span>
            <small class="text-muted"><i class="bi bi-check2-circle text-success me-1"></i>Unlocked</small>
          </div>
          <p class="romantic-font fs-3 text-dark mb-0 mt-2" style="line-height: 1.4;">
            "${reasons10[idx]}"
          </p>
        </div>
      `).join('');

      if (viewDiscoveredModal) {
        viewDiscoveredModal.show();
      }
    });
  }

  // Reset Progress
  if (resetReasonsBtn) {
    resetReasonsBtn.addEventListener('click', () => {
      if (confirm("Would you like to reset your discovered reasons counter and explore them all over again, Mental Munda? 💕")) {
        discoveredSet = new Set([0]);
        localStorage.setItem('discovered_reasons_10_indices', JSON.stringify([0]));
        updateProgressUI();
        renderReason(0, false);
      }
    });
  }
}


// Click anywhere on screen to create a flying heart
function setupScreenClickHearts() {
  document.addEventListener('click', (e) => {
    // Avoid interfering with buttons
    if (e.target.closest('button') || e.target.closest('a') || e.target.closest('input')) {
      return;
    }

    const heart = document.createElement('span');
    heart.innerText = ['❤️', '💖', '💕', '✨', '🌸'][Math.floor(Math.random() * 5)];
    heart.style.position = 'fixed';
    heart.style.left = `${e.clientX - 10}px`;
    heart.style.top = `${e.clientY - 10}px`;
    heart.style.fontSize = '1.4rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.style.transition = 'all 0.9s cubic-bezier(0.18, 0.89, 0.32, 1.28)';
    heart.style.opacity = '1';

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.style.transform = `translateY(-60px) scale(1.4)`;
      heart.style.opacity = '0';
    }, 10);

    setTimeout(() => {
      heart.remove();
    }, 950);
  });
}

// Background floating particle generator
function createFloatingParticles() {
  const container = document.getElementById('floating-hearts-bg');
  if (!container) return;

  const icons = ['❤️', '💖', '💕', '✨', '🌸', '🍓', '🧸', '💌'];
  
  function addParticle() {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.innerText = icons[Math.floor(Math.random() * icons.length)];
    
    const randomLeft = Math.random() * 95;
    const randomDuration = 8 + Math.random() * 8;
    const randomSize = 1 + Math.random() * 1.5;
    
    particle.style.left = `${randomLeft}vw`;
    particle.style.animationDuration = `${randomDuration}s`;
    particle.style.fontSize = `${randomSize}rem`;
    
    container.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, randomDuration * 1000);
  }

  for (let i = 0; i < 15; i++) {
    setTimeout(addParticle, i * 300);
  }

  setInterval(addParticle, 1200);
}

// ===================================================
// Digital Mood Envelopes ("Open When..." Letters)
// ===================================================
function setupMoodLetters() {
  const defaultMoodLetters = {
    sad: {
      title: "Open When You're Sad 🌧️",
      badge: "Comfort & Warmth 🌧️",
      subtitle: "For the gloomy days when you need to be reminded how loved you are.",
      body: `My sweetest Mental Munda,

I wish I could be right there beside you right this second to hold you tight and make whatever is hurting you disappear.

Take a slow, deep breath, sweetie. It's completely okay to feel down or overwhelmed sometimes, but never forget that you are the most precious person in my world. Whatever made you sad today is only a temporary passing cloud.

Place your hand over your heart—feel that rhythm? That’s your Nani Bava’s love beating right along with you. You are strong, you are deeply cherished, and you never have to carry any sorrow alone.

Wrap up in your favorite cozy blanket, drink some water, and send me a text or call me right now. I'm always right here waiting for you.

Always holding your hand,
Your Nani Bava ❤️`
    },
    miss_me: {
      title: "Open When You Miss Me 🥺",
      badge: "Close At Heart 🫂",
      subtitle: "Because distance means nothing when you mean everything.",
      body: `My dearest Mental Munda,

If you are missing me right now, guess what? 99% of my day is spent missing you and waiting to talk to you too!

Whenever that heavy, lonely feeling hits, look at your screen or look up at the sky tonight—I am thinking of you at that exact same heartbeat. Close your eyes for five seconds and imagine me hugging you tight from behind, resting my chin on your shoulder, and whispering that everything is going to be okay.

Every mile and every hour between us is just proof of how irreplaceable you are in my life.

Pick up your phone and call me or send me a sweet voice note right now! Hearing your cute voice will make my whole day.

Forever missing my girl,
Your Nani Bava 💕`
    },
    bored: {
      title: "Open When You're Bored 🥱",
      badge: "Anti-Boredom Mission 🎯",
      subtitle: "Official emergency boredom protocol prescribed by Nani Bava!",
      body: `Arey my crazy Mental Munda! Bored already? 😜

Boredom is strictly prohibited in our universe! Here is your official 3-step mission:

1. 📸 Snap the goofiest, weirdest selfie you can make right now and send it to me (no filter allowed!).
2. 🎶 Turn on our favorite song, close your eyes, and pretend we're dancing together like crazy people.
3. 🍦 Text me the secret password: "ICE CREAM EMERGENCY" and plan our next fun date!

Remember, you have a Nani Bava who is completely crazy about you—you are never allowed to be bored! Now smile and go complete your mission!

Your partner-in-crime,
Nani Bava 🧸✨`
    },
    laugh: {
      title: "Open When You Need a Laugh 🤪",
      badge: "100% Giggles 😂",
      subtitle: "Guaranteed to bring back that gorgeous million-dollar smile!",
      body: `To the one and only Mental Munda,

Do you know why they call you 'Mental Munda'? Because you're crazily adorable, dangerously dramatic, and the sweetest troublemaker on Earth! 😂

Remember: If anyone ever tells you that you're crazy, just look at them and say: "Excuse me, my Nani Bava fell in love with all of this madness on purpose!"

A quick reminder:
• You are 50% sweetness, 50% drama, and 100% mine.
• Even when you're giving me your cute angry pout, you look like an angry kitten.

Now wipe that serious look off your face and give me that gorgeous, heart-melting smile right now!

With endless love and giggles,
Your Nani Bava 😜❤️`
    },
    surprise: {
      title: "Open When You Want a Surprise 🎁",
      badge: "Golden Love Ticket ✨",
      subtitle: "You officially unlocked an exclusive romantic treat!",
      body: `✨🎉 SURPRISE, MY MENTAL MUNDA! 🎉✨

Congratulations! You have unlocked an official, non-expiring Nani Bava Love Voucher!

🎟️ YOUR REDEEMABLE PERKS:
• 1 Late-Night Ice Cream & Food Run entirely on my bill! 🍨
• Unlimited warm hugs, tight cuddles, and forehead kisses anytime you ask. 💋
• 1 Full Day where you get to win EVERY single argument and I say "Yes, Mental Munda, you're 100% right!" 🥰
• 1 Long drive listening to your favorite playlist with the windows rolled down. 🚗💨

📌 How to redeem: Take a screenshot of this letter right now and send it to me on WhatsApp with the text "SURPRISE CLAIMED!"

I love you to the moon and back, my princess.

Forever & always yours,
Your Nani Bava 💖💍`
    }
  };

  let activeMoodKey = 'sad';
  const modalEl = document.getElementById('moodLetterModal');
  const letterModal = modalEl ? bootstrap.Modal.getOrCreateInstance(modalEl) : null;

  const modalTitle = document.getElementById('moodLetterModalLabel');
  const modalBadge = document.getElementById('modal-mood-badge');
  const modalSubtitle = document.getElementById('modal-mood-subtitle');
  const letterBody = document.getElementById('modal-letter-body');

  const readMode = document.getElementById('letter-read-mode');
  const editMode = document.getElementById('letter-edit-mode');
  const editTextarea = document.getElementById('edit-letter-textarea');
  const toggleEditBtn = document.getElementById('toggle-edit-btn');
  const saveLetterBtn = document.getElementById('save-letter-btn');
  const cancelEditBtn = document.getElementById('cancel-edit-btn');
  const resetDefaultBtn = document.getElementById('reset-default-btn');

  // Helper to get active letter content
  function getMoodLetterText(key) {
    const saved = localStorage.getItem('custom_mood_letter_' + key);
    if (saved && saved.trim()) {
      return saved;
    }
    return defaultMoodLetters[key] ? defaultMoodLetters[key].body : '';
  }

  // Open letter function
  function openEnvelope(moodKey) {
    if (!defaultMoodLetters[moodKey]) return;
    activeMoodKey = moodKey;

    const moodData = defaultMoodLetters[moodKey];
    modalTitle.textContent = moodData.title;
    modalBadge.textContent = moodData.badge;
    modalSubtitle.textContent = moodData.subtitle;
    letterBody.textContent = getMoodLetterText(moodKey);

    // Ensure we start in read mode
    readMode.classList.remove('d-none');
    editMode.classList.add('d-none');
    toggleEditBtn.innerHTML = '<i class="bi bi-pencil me-1"></i> Edit This Letter ✏️';

    // Confetti effect on opening
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#ff4b72', '#ff99af', '#ffd1dc', '#ffffff']
      });
    }

    if (letterModal) {
      letterModal.show();
    }
  }

  // Attach click listeners to cards and buttons
  document.querySelectorAll('.mood-card, .open-mood-btn').forEach((elem) => {
    elem.addEventListener('click', (e) => {
      // Find mood from element or closest parent
      const moodKey = elem.getAttribute('data-mood') || elem.closest('.mood-card')?.getAttribute('data-mood');
      if (moodKey) {
        openEnvelope(moodKey);
      }
    });
  });

  // Toggle Edit Mode
  if (toggleEditBtn) {
    toggleEditBtn.addEventListener('click', () => {
      const isEditing = !editMode.classList.contains('d-none');
      if (isEditing) {
        // Switch back to read mode
        editMode.classList.add('d-none');
        readMode.classList.remove('d-none');
        toggleEditBtn.innerHTML = '<i class="bi bi-pencil me-1"></i> Edit This Letter ✏️';
      } else {
        // Switch to edit mode
        editTextarea.value = getMoodLetterText(activeMoodKey);
        readMode.classList.add('d-none');
        editMode.classList.remove('d-none');
        toggleEditBtn.innerHTML = '<i class="bi bi-eye me-1"></i> Preview Letter 👁️';
      }
    });
  }

  // Cancel Edit
  if (cancelEditBtn) {
    cancelEditBtn.addEventListener('click', () => {
      editMode.classList.add('d-none');
      readMode.classList.remove('d-none');
      toggleEditBtn.innerHTML = '<i class="bi bi-pencil me-1"></i> Edit This Letter ✏️';
    });
  }

  // Save Custom Letter
  if (saveLetterBtn) {
    saveLetterBtn.addEventListener('click', () => {
      const customText = editTextarea.value.trim();
      if (!customText) return;

      localStorage.setItem('custom_mood_letter_' + activeMoodKey, customText);
      letterBody.textContent = customText;

      // Switch back to read mode
      editMode.classList.add('d-none');
      readMode.classList.remove('d-none');
      toggleEditBtn.innerHTML = '<i class="bi bi-pencil me-1"></i> Edit This Letter ✏️';

      // Celebration burst on saving
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 75,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#28a745', '#ff4b72', '#ffd1dc']
        });
      }
    });
  }

  // Reset to Original Default Letter
  if (resetDefaultBtn) {
    resetDefaultBtn.addEventListener('click', () => {
      localStorage.removeItem('custom_mood_letter_' + activeMoodKey);
      const defaultText = defaultMoodLetters[activeMoodKey].body;
      editTextarea.value = defaultText;
      letterBody.textContent = defaultText;
    });
  }
}

// ===================================================
// Our Memory Calendar & Timeline Feature
// ===================================================
function setupMemoryCalendar() {
  // Elements for Days Met Counter
  const metDaysEl = document.getElementById('met-days');
  const metHoursEl = document.getElementById('met-hours');
  const metMinsEl = document.getElementById('met-mins');
  const metSecsEl = document.getElementById('met-secs');
  const firstMetSubtitle = document.getElementById('first-met-subtitle');

  // Elements for Countdown Timer
  const countdownDaysEl = document.getElementById('countdown-days');
  const countdownHoursEl = document.getElementById('countdown-hours');
  const countdownMinsEl = document.getElementById('countdown-mins');
  const countdownSecsEl = document.getElementById('countdown-secs');
  const countdownTitleEl = document.getElementById('countdown-title');
  const countdownSubtitleEl = document.getElementById('countdown-subtitle');

  // Modal & Form Elements
  const editDatesModalEl = document.getElementById('editDatesModal');
  const editDatesModal = editDatesModalEl ? bootstrap.Modal.getOrCreateInstance(editDatesModalEl) : null;
  const editStartDateBtn = document.getElementById('edit-start-date-btn');
  const editCountdownDateBtn = document.getElementById('edit-countdown-date-btn');
  const editDatesForm = document.getElementById('edit-dates-form');
  const inputMetDate = document.getElementById('input-met-date');
  const inputCountdownTitle = document.getElementById('input-countdown-title');
  const inputCountdownDate = document.getElementById('input-countdown-date');

  // Default Dates Setup (stored in localStorage)
  // Default first met date: ~1 year ago
  const defaultMetDate = new Date();
  defaultMetDate.setFullYear(defaultMetDate.getFullYear() - 1);
  const defaultMetISO = defaultMetDate.toISOString().split('T')[0];

  // Default next milestone: 45 days from today
  const defaultCountdownDate = new Date();
  defaultCountdownDate.setDate(defaultCountdownDate.getDate() + 45);
  const defaultCountdownISO = defaultCountdownDate.toISOString().split('T')[0];

  let storedMetDate = localStorage.getItem('couple_met_date') || defaultMetISO;
  let storedCountdownDate = localStorage.getItem('couple_countdown_date') || defaultCountdownISO;
  let storedCountdownTitle = localStorage.getItem('couple_countdown_title') || "Our Next Big Anniversary 💍";

  // Pre-fill input dates
  if (inputMetDate) inputMetDate.value = storedMetDate;
  if (inputCountdownTitle) inputCountdownTitle.value = storedCountdownTitle;
  if (inputCountdownDate) inputCountdownDate.value = storedCountdownDate;

  // Live Timer Update
  function updateCounters() {
    const now = new Date();

    // 1. Days Since We First Met
    const metTime = new Date(storedMetDate + 'T00:00:00');
    const diffMet = Math.max(0, now - metTime);

    const mDays = Math.floor(diffMet / (1000 * 60 * 60 * 24));
    const mHours = Math.floor((diffMet / (1000 * 60 * 60)) % 24);
    const mMins = Math.floor((diffMet / (1000 * 60)) % 60);
    const mSecs = Math.floor((diffMet / 1000) % 60);

    if (metDaysEl) metDaysEl.textContent = String(mDays).padStart(2, '0');
    if (metHoursEl) metHoursEl.textContent = String(mHours).padStart(2, '0');
    if (metMinsEl) metMinsEl.textContent = String(mMins).padStart(2, '0');
    if (metSecsEl) metSecsEl.textContent = String(mSecs).padStart(2, '0');

    if (firstMetSubtitle) {
      firstMetSubtitle.textContent = `Since ${new Date(storedMetDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
    }

    // 2. Countdown to Next Milestone
    const targetCountdown = new Date(storedCountdownDate + 'T00:00:00');
    const diffCountdown = targetCountdown - now;

    if (countdownTitleEl) countdownTitleEl.textContent = storedCountdownTitle;

    if (diffCountdown <= 0) {
      if (countdownDaysEl) countdownDaysEl.textContent = "00";
      if (countdownHoursEl) countdownHoursEl.textContent = "00";
      if (countdownMinsEl) countdownMinsEl.textContent = "00";
      if (countdownSecsEl) countdownSecsEl.textContent = "00";
      if (countdownSubtitleEl) countdownSubtitleEl.textContent = "Milestone Reached! Happy Celebration! 🎉💖";
    } else {
      const cDays = Math.floor(diffCountdown / (1000 * 60 * 60 * 24));
      const cHours = Math.floor((diffCountdown / (1000 * 60 * 60)) % 24);
      const cMins = Math.floor((diffCountdown / (1000 * 60)) % 60);
      const cSecs = Math.floor((diffCountdown / 1000) % 60);

      if (countdownDaysEl) countdownDaysEl.textContent = String(cDays).padStart(2, '0');
      if (countdownHoursEl) countdownHoursEl.textContent = String(cHours).padStart(2, '0');
      if (countdownMinsEl) countdownMinsEl.textContent = String(cMins).padStart(2, '0');
      if (countdownSecsEl) countdownSecsEl.textContent = String(cSecs).padStart(2, '0');

      if (countdownSubtitleEl) {
        countdownSubtitleEl.textContent = `Target: ${targetCountdown.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
      }
    }
  }

  // Initial call and 1-second interval
  updateCounters();
  setInterval(updateCounters, 1000);

  // Open Edit Dates Modal
  function openEditDates() {
    if (inputMetDate) inputMetDate.value = storedMetDate;
    if (inputCountdownTitle) inputCountdownTitle.value = storedCountdownTitle;
    if (inputCountdownDate) inputCountdownDate.value = storedCountdownDate;
    if (editDatesModal) editDatesModal.show();
  }

  if (editStartDateBtn) editStartDateBtn.addEventListener('click', openEditDates);
  if (editCountdownDateBtn) editCountdownDateBtn.addEventListener('click', openEditDates);

  // Handle Edit Dates Form Submit
  if (editDatesForm) {
    editDatesForm.addEventListener('submit', (e) => {
      e.preventDefault();
      storedMetDate = inputMetDate.value;
      storedCountdownTitle = inputCountdownTitle.value.trim() || "Our Next Big Milestone 💍";
      storedCountdownDate = inputCountdownDate.value;

      localStorage.setItem('couple_met_date', storedMetDate);
      localStorage.setItem('couple_countdown_title', storedCountdownTitle);
      localStorage.setItem('couple_countdown_date', storedCountdownDate);

      updateCounters();
      if (editDatesModal) editDatesModal.hide();

      if (typeof confetti === 'function') {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      }
    });
  }

  // ===================================================
  // Special Date Reminders Grid
  // ===================================================
  const specialDates = [
    { title: "🎂 Mental Munda's Birthday", subtitle: "The day the prettiest girl arrived on Earth", dateBadge: "April 27th", tag: "Annual Celebration 🌸" },
    { title: "💬 The Day We First Spoke", subtitle: "That day started our journey.", dateBadge: "September 22nd", tag: "Destiny Day ✨" },
    { title: "💖 Meeting You For The First Time", subtitle: "My heart raced the exact second I saw you", dateBadge: "October 2nd", tag: "Endless Love 🌙" },
    { title: "🍦 Late Night Ice Cream", subtitle: "Sweet cravings and holding your hand under the stars", dateBadge: "Late Night", tag: "Sweet Moments 🌙" }
  ];

  const specialDatesGrid = document.getElementById('special-dates-grid');
  if (specialDatesGrid) {
    specialDatesGrid.innerHTML = specialDates.map(item => `
      <div class="col-sm-6 col-lg-3">
        <div class="special-date-card p-3 h-100 text-center d-flex flex-column justify-content-between">
          <div>
            <span class="badge bg-danger-subtle text-danger rounded-pill px-3 py-1 mb-2 fw-semibold">${item.dateBadge}</span>
            <h6 class="fw-bold text-dark mb-1">${item.title}</h6>
            <p class="text-muted small mb-0">${item.subtitle}</p>
          </div>
          <div class="mt-2 pt-2 border-top border-light-subtle">
            <small class="text-danger fw-medium">${item.tag}</small>
          </div>
        </div>
      </div>
    `).join('');
  }

  // ===================================================
  // Memory of the Day & Timeline
  // ===================================================
  const initialMemories = [
    {
      id: 1,
      title: "The Day We First Spoke",
      date: "Day 1 of Our Journey",
      story: "It started with a casual conversation, but from that very first message, I felt a spark that I had never felt before in my life. You made my heart race instantly.",
      photo: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600&auto=format&fit=crop",
      caption: "Where our story began ✨"
    },
    {
      id: 2,
      title: "The Paradise Movie",
      date: "Our First Date",
      story: "Sitting next to you in that dark cinema, watching 'The Paradise', felt like a dream. It wasn't just a movie—it was the day my whole world shifted, and I knew I had found my own paradise right beside you.",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnHpNdLWpl3034Ld0rDLTEBR6Q8OU5Ao6u1FHD-Hx9mpK5-Is9vphS6u3E&s=10",
      caption: "In a crowded theater, my eyes were only on you."
    },
    {
      id: 3,
      title: "Sharing Mandi Food Together",
      date: "An Unforgettable Memory",
      story: "Sharing that Mandi meal together is a memory etched deeply into my heart. It wasn't just about the food—it was about laughing with you, sharing the moment, and realizing how deeply happy you make me.",
      photo: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop",
      caption: "A meal etched into my heart forever."
    },
    {
      id: 4,
      title: "Late Night Ice Cream & Sweet Moments",
      date: "A Night to Remember",
      story: "Meeting you at night and giving you that ice cream is a moment I will never forget. Watching you smile under the night lights while holding your hand made everything feel like magic.",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM7ZqVTQJkJ2sxODymKJUyvOgAYlpHgH3fp0wPkv3WeA&s=10",
      caption: "Our favorite golden hour 🌅"
    }
  ];

  let coupleMemories = [];
  try {
    const saved = localStorage.getItem('couple_memories');
    coupleMemories = saved ? JSON.parse(saved) : initialMemories;
  } catch (err) {
    coupleMemories = initialMemories;
  }

  // Memory of the Day Setup
  const motdImg = document.getElementById('motd-img');
  const motdTitle = document.getElementById('motd-title');
  const motdDate = document.getElementById('motd-date');
  const motdStory = document.getElementById('motd-story');
  const motdCaption = document.getElementById('motd-caption');
  const shuffleMotdBtn = document.getElementById('shuffle-motd-btn');
  const motdPolaroid = document.getElementById('motd-polaroid');

  let currentMotdIndex = 0;

  function displayMotd(index) {
    if (coupleMemories.length === 0) return;
    currentMotdIndex = index % coupleMemories.length;
    const mem = coupleMemories[currentMotdIndex];

    if (motdTitle) motdTitle.textContent = mem.title;
    if (motdDate) motdDate.textContent = mem.date;
    if (motdStory) motdStory.textContent = mem.story;
    if (motdCaption) motdCaption.textContent = `"${mem.caption || mem.title}"`;
    if (motdImg) motdImg.src = mem.photo || "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop";
  }

  // Initialize MOTD
  displayMotd(0);

  // Shuffle MOTD
  if (shuffleMotdBtn) {
    shuffleMotdBtn.addEventListener('click', () => {
      const nextIndex = (currentMotdIndex + 1) % coupleMemories.length;
      displayMotd(nextIndex);

      if (typeof confetti === 'function') {
        confetti({
          particleCount: 30,
          spread: 50,
          origin: { y: 0.7 },
          colors: ['#ff4b72', '#ffccd5', '#ffffff']
        });
      }
    });
  }

  // View Photo Modal setup
  const viewPhotoModalEl = document.getElementById('viewPhotoModal');
  const viewPhotoModal = viewPhotoModalEl ? bootstrap.Modal.getOrCreateInstance(viewPhotoModalEl) : null;
  const viewPhotoImg = document.getElementById('view-photo-img');
  const viewPhotoTitle = document.getElementById('view-photo-title');
  const viewPhotoDate = document.getElementById('view-photo-date');
  const viewPhotoCaption = document.getElementById('view-photo-caption');

  function openPhotoModal(photoUrl, title, date, caption) {
    if (viewPhotoImg) viewPhotoImg.src = photoUrl;
    if (viewPhotoTitle) viewPhotoTitle.textContent = title;
    if (viewPhotoDate) viewPhotoDate.textContent = date;
    if (viewPhotoCaption) viewPhotoCaption.textContent = caption ? `"${caption}"` : '';
    if (viewPhotoModal) viewPhotoModal.show();
  }

  if (motdPolaroid) {
    motdPolaroid.addEventListener('click', () => {
      const mem = coupleMemories[currentMotdIndex];
      openPhotoModal(mem.photo, mem.title, mem.date, mem.story);
    });
  }

  // Render Timeline
  const timelineContainer = document.getElementById('memory-timeline-container');

  function renderTimeline() {
    if (!timelineContainer) return;

    timelineContainer.innerHTML = coupleMemories.map((mem, idx) => `
      <div class="timeline-item">
        <div class="timeline-dot">💖</div>
        <div class="timeline-content">
          <div class="glass-card p-4 d-inline-block text-start w-100 shadow-sm" style="max-width: 520px;">
            <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
              <span class="badge bg-danger-subtle text-danger rounded-pill px-3 py-1 fw-bold">
                Chapter #${idx + 1}
              </span>
              <span class="text-muted small fw-semibold">${mem.date}</span>
            </div>
            
            <h5 class="serif-font fw-bold text-dark mb-2">${mem.title}</h5>
            
            <!-- Polaroid Preview -->
            <div class="polaroid-frame my-3 cursor-pointer timeline-polaroid" data-index="${idx}" style="max-width: 250px; cursor: pointer;">
              <div class="washi-tape"></div>
              <div class="polaroid-img-wrapper" style="height: 160px;">
                <img src="${mem.photo}" alt="${mem.title}">
              </div>
              <div class="polaroid-caption">${mem.caption || mem.title}</div>
            </div>

            <p class="text-muted romantic-font fs-4 mb-0" style="line-height: 1.6;">
              ${mem.story}
            </p>
          </div>
        </div>
      </div>
    `).join('');

    // Attach click listener on timeline polaroids
    document.querySelectorAll('.timeline-polaroid').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.getAttribute('data-index'), 10);
        const m = coupleMemories[idx];
        if (m) {
          openPhotoModal(m.photo, m.title, m.date, m.story);
        }
      });
    });
  }

  renderTimeline();

  // Add Memory Modal logic
  const addMemoryModalEl = document.getElementById('addMemoryModal');
  const addMemoryModal = addMemoryModalEl ? bootstrap.Modal.getOrCreateInstance(addMemoryModalEl) : null;
  const addMemoryBtn = document.getElementById('add-memory-btn');
  const timelineAddMemoryBtn = document.getElementById('timeline-add-memory-btn');
  const addMemoryForm = document.getElementById('add-memory-form');

  const inputMemoryTitle = document.getElementById('input-memory-title');
  const inputMemoryDate = document.getElementById('input-memory-date');
  const inputMemoryStory = document.getElementById('input-memory-story');
  const inputMemoryPhoto = document.getElementById('input-memory-photo');

  function openAddMemory() {
    if (addMemoryForm) addMemoryForm.reset();
    if (inputMemoryPhoto) {
      inputMemoryPhoto.value = "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop";
    }
    if (addMemoryModal) addMemoryModal.show();
  }

  if (addMemoryBtn) addMemoryBtn.addEventListener('click', openAddMemory);
  if (timelineAddMemoryBtn) timelineAddMemoryBtn.addEventListener('click', openAddMemory);

  // Preset buttons
  document.querySelectorAll('.photo-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const url = btn.getAttribute('data-url');
      if (inputMemoryPhoto && url) {
        inputMemoryPhoto.value = url;
      }
    });
  });

  // Handle Add Memory submit
  if (addMemoryForm) {
    addMemoryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newTitle = inputMemoryTitle.value.trim();
      const newDate = inputMemoryDate.value.trim();
      const newStory = inputMemoryStory.value.trim();
      const newPhoto = inputMemoryPhoto.value.trim() || "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop";

      if (!newTitle || !newStory) return;

      const newMem = {
        id: Date.now(),
        title: newTitle,
        date: newDate || "A Beautiful Day",
        story: newStory,
        photo: newPhoto,
        caption: newTitle
      };

      coupleMemories.push(newMem);
      localStorage.setItem('couple_memories', JSON.stringify(coupleMemories));

      renderTimeline();
      displayMotd(coupleMemories.length - 1);

      if (addMemoryModal) addMemoryModal.hide();

      if (typeof confetti === 'function') {
        confetti({
          particleCount: 80,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#ff4b72', '#7928ca', '#ffd1dc']
        });
      }
    });
  }
}




