const prizes = ["20 ПТС", "50 ПТС", "100 ПТС", "Пусто", "10 ПТС", "Пусто", "30 ПТС", "5 ПТС", "Пусто", "200 ПТС", "15 ПТС", "Пусто", "25 ПТС", "Пусто", "75 ПТС", "Пусто"];
const cooldownKey = "spinCooldown";

const spinButton = document.getElementById("spinButton");
const timerDisplay = document.getElementById("timer");

function getCooldownTime() {
  const lastSpin = localStorage.getItem(cooldownKey);
  if (!lastSpin) return 0;
  const week = 7 * 24 * 60 * 60 * 1000;
  return Math.max(0, week - (Date.now() - parseInt(lastSpin)));
}

function updateTimer() {
  const remaining = getCooldownTime();
  if (remaining <= 0) {
    timerDisplay.textContent = "Можно крутить!";
    spinButton.disabled = false;
  } else {
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
    timerDisplay.textContent = `До следующего вращения: ${hours}ч ${minutes}м ${seconds}с`;
    spinButton.disabled = true;
  }
}
setInterval(updateTimer, 1000);
updateTimer();

spinButton.addEventListener("click", () => {
  if (getCooldownTime() > 0) return;
  const prize = prizes[Math.floor(Math.random() * prizes.length)];
  alert("Вы выиграли: " + prize);
  localStorage.setItem(cooldownKey, Date.now());
});
