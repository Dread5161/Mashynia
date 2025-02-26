// Автоматическая прокрутка вниз при загрузке
window.addEventListener('load', () => {
  const sidebar = document.querySelector('.sidebar');
  sidebar.scrollTop = sidebar.scrollHeight;

  // Дополнительная проверка через небольшой таймаут
  setTimeout(() => {
    sidebar.scrollTop = sidebar.scrollHeight;
  }, 50);
});

// Музыкальный плеер
const songs = [
  "assets/song1.mp3",
  "assets/song2.mp3",
  "assets/song3.mp3"
];
let currentSongIndex = 0;
const audio = new Audio(songs[currentSongIndex]);
const vinyl = document.getElementById('vinyl');
const playButton = document.getElementById('play');

// Воспроизведение/пауза
playButton.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playButton.textContent = '⏸️';
    vinyl.style.animationPlayState = 'running';
  } else {
    audio.pause();
    playButton.textContent = '▶️';
    vinyl.style.animationPlayState = 'paused';
  }
});

// Следующий трек
document.getElementById('next').addEventListener('click', () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  audio.src = songs[currentSongIndex];
  audio.play();
  playButton.textContent = '⏸️';
  vinyl.style.animationPlayState = 'running';
});

// Предыдущий трек
document.getElementById('prev').addEventListener('click', () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  audio.src = songs[currentSongIndex];
  audio.play();
  playButton.textContent = '⏸️';
  vinyl.style.animationPlayState = 'running';
});

// Переключение чатов
document.querySelectorAll('.chat').forEach(chat => {
  chat.addEventListener('click', function() {
    document.querySelectorAll('.chat').forEach(c => c.classList.remove('active'));
    this.classList.add('active');
    document.querySelectorAll('.main-window').forEach(window => {
      window.classList.remove('active');
    });
    const chatId = this.dataset.chat;
    document.getElementById(chatId).classList.add('active');
    const unread = this.querySelector('.unread');
    if (unread) {
      unread.style.opacity = '0';
      setTimeout(() => unread.remove(), 300);
    }
  });
});