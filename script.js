let startTime = null;
let running = false;
let timerInterval = null;

const timeDisplay = document.getElementById("time");
const heightDisplay = document.getElementById("height");

function startTimer() {
  startTime = performance.now();
  timerInterval = setInterval(updateTime, 10);
  document.body.classList.remove("green");
  document.body.classList.add("red");
}

function stopTimer() {
  clearInterval(timerInterval);
  document.body.classList.remove("red");
  document.body.classList.add("green");
}

function reset() {
  timeDisplay.textContent = `0.000s`;
  heightDisplay.textContent = `0.00m`;
}

function handleTouchStart() {
  if (running) {
    stopTimer();
    running = false;
  }
}

function handleTouchEnd() {
  if (!running) {
    reset();
    setTimeout(() => {
      startTimer(); // reset 후 잠깐 딜레이 후 타이머 시작
      running = true;
    }, 50); // 50ms 정도 딜레이 후 시작
  }
}

document.body.addEventListener("touchstart", handleTouchStart);
document.body.addEventListener("touchend", handleTouchEnd);
document.body.addEventListener("mousedown", handleTouchStart);
document.body.addEventListener("mouseup", handleTouchEnd);

function updateTime() {
  const elapsed = (performance.now() - startTime) / 1000;
  timeDisplay.textContent = `${elapsed.toFixed(3)}s`;

  const t = elapsed / 2; // 최고점 도달 시간
  const height = 0.5 * 9.81 * t * t;
  heightDisplay.textContent = `${height.toFixed(2)}m`;
}
