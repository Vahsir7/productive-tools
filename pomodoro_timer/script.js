// script.js
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const progressCircle = document.querySelector('.progress-ring__circle');
const timerContainer = document.querySelector('.timer-container');
const minutesInput = document.getElementById('minutesInput');
const setTimerButton = document.getElementById('setTimer');
const themeToggle = document.getElementById('themeToggle');

let startTime = 25 * 60; // Default to 25 minutes
let timerInterval;

function updateTimerDisplay() {
  const minutes = Math.floor(startTime / 60);
  const seconds = startTime % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (startTime > 0) {
      startTime--;
      updateTimerDisplay();
      updateProgressRing();

      // Check if 2 minutes left and add heartbeat effect
      if (startTime === 2 * 60) {
        timerContainer.classList.add('active');
      }
    } else {
      clearInterval(timerInterval);
      timerContainer.classList.remove('active');
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerContainer.classList.remove('active');
}

function resetTimer() {
  clearInterval(timerInterval);
  startTime = parseInt(minutesInput.value, 10) * 60 || 25 * 60; // Reset to input value or default
  updateTimerDisplay();
  resetProgressRing();
  timerContainer.classList.remove('active');
}

function updateProgressRing() {
  const totalSeconds = parseInt(minutesInput.value, 10) * 60 || 25 * 60; // Get total seconds from input or default
  const progress = ((totalSeconds - startTime) / totalSeconds) * 440;
  progressCircle.style.strokeDashoffset = 440 - progress;
}

function resetProgressRing() {
  progressCircle.style.strokeDashoffset = 440;
}

// Event Listeners for Timer
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
setTimerButton.addEventListener('click', () => {
  const minutes = parseInt(minutesInput.value, 10) || 25; // Get minutes from input or default to 25
  startTime = minutes * 60;
  updateTimerDisplay();
  resetProgressRing();
});

// Theme Switching
themeToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-theme');
});


updateTimerDisplay();
