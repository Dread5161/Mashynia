// Комплименты (15 вариантов)
const compliments = [
  "Ты сегодня неотразима! 🌟",
  "Твоя улыбка делает мир ярче! 😊",
  "Ты - само совершенство! 💖",
  "Твоя энергия заряжает позитивом! ⚡",
  "Ты выглядишь потрясающе! 🌸",
  "Твоя доброта согревает сердца! ❤️",
  "Ты - образец элегантности! 💃",
  "Твои глаза как звезды! ✨",
  "Ты вдохновляешь! 💪",
  "Ты - настоящая королева! 👑",
  "Твоя уверенность восхищает! 🔥",
  "Ты прекрасна внутри и снаружи!",
  "Ты делаешь мир лучше! 🌍",
  "Твоя утонченность бесподобна! 🦋",
  "Ты - настоящее сокровище! 💎"
];

// Музыкальный плеер (10 треков)
const songs = [
  { src: "assets/song1.mp3", vinyl: "assets/vinyl1.png" },
  { src: "assets/song2.mp3", vinyl: "assets/vinyl2.png" },
  { src: "assets/song3.mp3", vinyl: "assets/vinyl3.png" },
  { src: "assets/song4.mp3", vinyl: "assets/vinyl4.png" },
  { src: "assets/song5.mp3", vinyl: "assets/vinyl5.png" },
  { src: "assets/song6.mp3", vinyl: "assets/vinyl6.png" },
  { src: "assets/song7.mp3", vinyl: "assets/vinyl7.png" },
  { src: "assets/song8.mp3", vinyl: "assets/vinyl8.png" },
  { src: "assets/song9.mp3", vinyl: "assets/vinyl9.png" },
  { src: "assets/song10.mp3", vinyl: "assets/vinyl10.png" }
];

let currentSongIndex = Math.floor(Math.random() * songs.length);
const audio = new Audio(songs[currentSongIndex].src);
const vinyl = document.getElementById('vinyl');
const vinylImg = document.getElementById('vinyl-img');
const playButton = document.getElementById('play');

// Инициализация плеера
vinylImg.src = songs[currentSongIndex].vinyl;

// Автопрокрутка при загрузке
window.addEventListener('load', () => {
  const sidebar = document.querySelector('.sidebar');
  sidebar.scrollTop = sidebar.scrollHeight;
});

// Управление музыкой
playButton.addEventListener('click', togglePlay);
document.getElementById('next').addEventListener('click', nextTrack);
document.getElementById('prev').addEventListener('click', prevTrack);

// Переключение треков
function nextTrack() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updatePlayer();
}

function prevTrack() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  updatePlayer();
}

function updatePlayer() {
  audio.src = songs[currentSongIndex].src;
  vinylImg.src = songs[currentSongIndex].vinyl;
  audio.play();
  playButton.textContent = '⏸️';
  vinyl.style.animationPlayState = 'running';
}

// Play/Pause
function togglePlay() {
  if (audio.paused) {
    audio.play();
    playButton.textContent = '⏸️';
    vinyl.style.animationPlayState = 'running';
  } else {
    audio.pause();
    playButton.textContent = '▶️';
    vinyl.style.animationPlayState = 'paused';
  }
}

// Отправка сообщений
document.querySelectorAll('.send-button').forEach(button => {
  button.addEventListener('click', sendMessage);
});

// Обработка Enter
document.querySelectorAll('.message-input').forEach(input => {
  input.addEventListener('keypress', e => {
    if (e.key === 'Enter') sendMessage.call(e.target.nextElementSibling);
  });
});

function sendMessage() {
  const input = this.previousElementSibling;
  const dialog = this.closest('.main-window').querySelector('.dialog');
  
  if (input.value.trim()) {
    addMessage(input.value, 'outgoing', dialog);
    setTimeout(() => addCompliment(dialog), 500);
    input.value = '';
    dialog.scrollTop = dialog.scrollHeight;
  }
}

function addMessage(text, type, dialog) {
  const message = document.createElement('div');
  message.classList.add('message', type);
  message.innerHTML = `
    ${text}
    <div class="time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
  `;
  dialog.appendChild(message);
}

function addCompliment(dialog) {
  const compliment = compliments[Math.floor(Math.random() * compliments.length)];
  addMessage(compliment, 'incoming', dialog);
  dialog.scrollTop = dialog.scrollHeight;
}

// Переключение темы
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  themeToggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
});

// Переключение чатов
document.querySelectorAll('.chat').forEach(chat => {
  chat.addEventListener('click', function() {
    document.querySelectorAll('.chat').forEach(c => c.classList.remove('active'));
    this.classList.add('active');
    document.querySelectorAll('.main-window').forEach(w => w.classList.remove('active'));
    document.getElementById(this.dataset.chat).classList.add('active');
    
    const unread = this.querySelector('.unread');
    if (unread) {
      unread.style.opacity = '0';
      setTimeout(() => unread.remove(), 300);
    }
  });
});

// Сворачивание/разворачивание меню чатов
// Логика для сворачивания/разворачивания меню чатов
const toggleSidebar = document.getElementById('toggle-sidebar');
const sidebar = document.querySelector('.sidebar');

toggleSidebar.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

// Логика для отправки сообщений
document.querySelectorAll('.send-button').forEach(button => {
  button.addEventListener('click', sendMessage);
});

document.querySelectorAll('.message-input').forEach(input => {
  input.addEventListener('keypress', e => {
    if (e.key === 'Enter') sendMessage.call(e.target.nextElementSibling);
  });
});

function sendMessage() {
  const input = this.previousElementSibling;
  const dialog = this.closest('.main-window').querySelector('.dialog');
  
  if (input.value.trim()) {
    addMessage(input.value, 'outgoing', dialog);
    setTimeout(() => addCompliment(dialog), 500);
    input.value = '';
    dialog.scrollTop = dialog.scrollHeight;
  }
}

function addMessage(text, type, dialog) {
  const message = document.createElement('div');
  message.classList.add('message', type);
  message.innerHTML = `
    ${text}
    <div class="time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
  `;
  dialog.appendChild(message);
}

function addCompliment(dialog) {
  const compliment = compliments[Math.floor(Math.random() * compliments.length)];
  addMessage(compliment, 'incoming', dialog);
  dialog.scrollTop = dialog.scrollHeight;
}