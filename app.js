const startButton = document.querySelector('#start-button');
const codeElement = document.querySelector('#gcode');
const errorElement = document.querySelector('#error-state');
const dataset = Array.isArray(window.GCODE_DATASET) ? window.GCODE_DATASET : [];
const SPIN_DURATION = 7000;

function randomIndex(except = -1) {
  if (dataset.length < 2) return 0;
  let index;
  do {
    index = Math.floor(Math.random() * dataset.length);
  } while (index === except);
  return index;
}

function startDraw() {
  if (!dataset.length) {
    errorElement.textContent = 'ไม่พบชุดข้อมูล G-code';
    errorElement.hidden = false;
    return;
  }

  startButton.hidden = true;
  codeElement.hidden = false;
  const startedAt = performance.now();
  let currentIndex = -1;

  function spin() {
    const elapsed = performance.now() - startedAt;
    if (elapsed >= SPIN_DURATION) {
      const winnerIndex = randomIndex(currentIndex);
      codeElement.textContent = dataset[winnerIndex].gcode;
      codeElement.setAttribute('aria-live', 'polite');
      codeElement.classList.remove('is-spinning');
      return;
    }

    currentIndex = randomIndex(currentIndex);
    codeElement.textContent = dataset[currentIndex].gcode;
    codeElement.classList.add('is-spinning');

    const progress = elapsed / SPIN_DURATION;
    const delay = 45 + (900 * progress ** 3.2);
    window.setTimeout(spin, Math.min(delay, SPIN_DURATION - elapsed));
  }

  codeElement.setAttribute('aria-live', 'off');
  spin();
}

startButton.addEventListener('click', startDraw, { once: true });
