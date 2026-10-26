# 💖 Mental Munda & Nani Bava - Love Portal

A romantic, interactive web application built with **HTML5, CSS3, Bootstrap 5, and JavaScript** created to impress your girlfriend.

---

## 🔑 Login Credentials

| Field | Required Input |
| :--- | :--- |
| **Username** | `Mental Munda` |
| **Password** | `Nani Bava` |

> *Note:* The verification handles case-insensitivity and extra spacing so mobile autocorrect won't prevent logging in.

---

## ✨ Features

1. **Secret Login Portal (`index.html`)**:
   - Floating romantic background particles (hearts, stars, sparkles).
   - Glassmorphism frosted-glass card design.
   - Show / Hide password eye toggle.
   - Subtle "Need a hint?" expandable clue.
   - Playful shake animation on invalid credentials.
   - Confetti blast & smooth transition upon entering `Mental Munda` and `Nani Bava`.

2. **Personalized Home Page (`home.html`)**:
   - Authentication check (protects the page and redirects back if not logged in).
   - Sticky responsive romantic navigation bar with lock/logout button.
   - **Hero Greeting** dedicated specifically to "Mental Munda" from "Nani Bava".
   - **Digital "Open When..." Mood Envelopes 💌**:
     - *Open when you're sad* 🌧️
     - *Open when you miss me* 🥺
     - *Open when you're bored* 🥱
     - *Open when you need a laugh* 🤪
     - *Open when you want a surprise* 🎁
     - Realistic wax seals, pastel envelope styling, and confetti animation on opening.
     - Handwritten parchment stationery modal displaying the letter.
     - **In-browser Editor ("Edit This Letter ✏️")**: Allows Nani Bava to personalize or write his own custom messages directly in the browser, with instant persistent saving (`localStorage`) and a one-click reset to original.
   - **Our Memory Calendar ✨**:
     - **Days Since We First Met 💕**: Real-time ticking counter showing Days, Hours, Minutes, and Seconds together with customizable start date.
     - **Upcoming Milestone Countdown ⏳**: Live countdown timer ticking down to your next anniversary, date, or her birthday.
     - **Memory of the Day 🌟**: Rotating spotlight card featuring your favorite memories, with an interactive "Shuffle Memory 🎲" button and celebration confetti.
     - **Special-Date Reminders**: Highlight cards for key milestones (Her Birthday, First Day Spoke, First Midnight Call, Anniversary).
     - **Photo Memories & Story Timeline 📸**: Vertical timeline of chapters with polaroid photo frames, washi tape styling, and click-to-enlarge modal.
     - **Record New Memories ➕**: Built-in modal allowing you to add new memories (Title, Date, Story, Photo presets or custom image URLs) persisted in `localStorage`.
   - **Interactive Love Letter 💌**: A heartfelt handwritten letter.
   - **Playful Love Game 🎮**: "Do you love your Nani Bava?" featuring a hilarious runaway "NO" button that dodges the cursor/touch and a "YES" button that unleashes celebration confetti!
   - **10 Reasons You're Special 💖**:
     - Carefully curated collection of **10 most touching, authentic, and playful reasons** why Nani Bava adores his Mental Munda.
     - **Discovery Counter & Animated Progress Bar**: Tracks how many unique reasons she has discovered so far (e.g. `4 / 10 Reasons (40%)`), with persistent saving in `localStorage`.
     - **Random Reason Generator**: Every button tap reveals a random reason with a `🌟 New Discovery!` badge and confetti celebration.
     - **Milestone Banners**: Celebratory rewards at 5 reasons (halfway) and all 10 reasons unlocked.
     - **View Discovered Modal 📖**: Allows her to view a list of all reasons she has unlocked so far.
     - **Reset Progress ↺**: Option to reset and rediscover all 10 reasons from scratch.
   - **Click Anywhere for Hearts**: Tapping or clicking anywhere generates floating hearts at your fingertips!

---

## 🚀 How to Run

You can open the web app in either of two ways:

### Option 1: Direct File Open
Double-click [index.html](file:///d:/prac2/Moon/index.html) or right-click and choose **Open with > Chrome / Edge / Firefox / Safari**.

### Option 2: Local Web Server (Optional)
Run the following command in PowerShell / Terminal:
```bash
python -m http.server 8000
```
Then visit: `http://localhost:8000`
