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
  timeDisplay.textContent = `0.000 s`;
  heightDisplay.textContent = `0.00 m`;
  document.body.classList.remove("red");
  document.body.classList.add("green");
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
    startTimer();
    running = true;
  }
}

document.body.addEventListener("touchstart", handleTouchStart);
document.body.addEventListener("touchend", handleTouchEnd);
document.body.addEventListener("mousedown", handleTouchStart);
document.body.addEventListener("mouseup", handleTouchEnd);

// 페이지 처음 열 때 초록색으로 초기화
document.body.classList.add("green");

function updateTime() {
  const elapsed = (performance.now() - startTime) / 1000;
  timeDisplay.textContent = `${elapsed.toFixed(3)} s`;

  const t = elapsed / 2; // 최고점 도달 시간
  const height = 0.5 * 9.81 * t * t;
  heightDisplay.textContent = `${height.toFixed(2)} m`;
}
