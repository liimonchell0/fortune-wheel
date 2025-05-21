const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
const center = width / 2;

const prizes = [
  "10 ПТС", "Пусто", "20 ПТС", "5 ПТС",
  "Пусто", "30 ПТС", "15 ПТС", "Пусто",
  "50 ПТС", "Пусто", "5 ПТС", "Пусто",
  "20 ПТС", "Пусто", "10 ПТС", "Пусто"
];

const numSectors = prizes.length;
const anglePerSector = (2 * Math.PI) / numSectors;
let rotation = 0;
let isSpinning = false;

function drawWheel() {
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < numSectors; i++) {
    const angle = rotation + i * anglePerSector;
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.arc(center, center, center - 10, angle, angle + anglePerSector);
    ctx.fillStyle = i % 2 === 0 ? "#FFC107" : "#FF5722";
    ctx.fill();
    ctx.stroke();

    // текст
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(angle + anglePerSector / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#000";
    ctx.font = "14px Arial";
    ctx.fillText(prizes[i], center - 20, 5);
    ctx.restore();
  }

  // стрелка
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.moveTo(center - 10, 10);
  ctx.lineTo(center + 10, 10);
  ctx.lineTo(center, 40);
  ctx.closePath();
  ctx.fill();
}

function spinWheel() {
  if (isSpinning) return;
  isSpinning = true;

  let spin = 0;
  const target = Math.random() * Math.PI * 10 + Math.PI * 5;

  const animate = () => {
    spin += (target - spin) * 0.1;
    rotation += 0.05;
    if (spin >= target - 0.01) {
      isSpinning = false;
      rotation = rotation % (2 * Math.PI);
      showResult();
      return;
    }
    drawWheel();
    requestAnimationFrame(animate);
  };

  animate();
}

function showResult() {
  const index = Math.floor(((2 * Math.PI - rotation + Math.PI / 2) % (2 * Math.PI)) / anglePerSector);
  alert(`Вы выиграли: ${prizes[index]}`);
}

canvas.addEventListener("click", spinWheel);
drawWheel();
