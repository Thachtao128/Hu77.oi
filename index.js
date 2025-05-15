const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const rollBtn = document.getElementById('rollBtn');
const resultDiv = document.getElementById('result');

const diceSize = 80;
const diceSpacing = 20;
const startX = 20;
const startY = 30;

function drawDice(x, y, number) {
  // vẽ hình viên xúc xắc vuông trắng
  ctx.fillStyle = '#fff';
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 3;
  ctx.fillRect(x, y, diceSize, diceSize);
  ctx.strokeRect(x, y, diceSize, diceSize);

  // vẽ các chấm tương ứng số xúc xắc
  ctx.fillStyle = '#000';

  // helper vẽ chấm nhỏ
  function drawDot(cx, cy) {
    const radius = 8;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  const cx = x + diceSize / 2;
  const cy = y + diceSize / 2;
  const offset = 20;

  switch (number) {
    case 1:
      drawDot(cx, cy);
      break;
    case 2:
      drawDot(x + offset, y + offset);
      drawDot(x + diceSize - offset, y + diceSize - offset);
      break;
    case 3:
      drawDot(cx, cy);
      drawDot(x + offset, y + offset);
      drawDot(x + diceSize - offset, y + diceSize - offset);
      break;
    case 4:
      drawDot(x + offset, y + offset);
      drawDot(x + diceSize - offset, y + offset);
      drawDot(x + offset, y + diceSize - offset);
      drawDot(x + diceSize - offset, y + diceSize - offset);
      break;
    case 5:
      drawDot(cx, cy);
      drawDot(x + offset, y + offset);
      drawDot(x + diceSize - offset, y + offset);
      drawDot(x + offset, y + diceSize - offset);
      drawDot(x + diceSize - offset, y + diceSize - offset);
      break;
    case 6:
      drawDot(x + offset, y + offset);
      drawDot(x + diceSize - offset, y + offset);
      drawDot(x + offset, cy);
      drawDot(x + diceSize - offset, cy);
      drawDot(x + offset, y + diceSize - offset);
      drawDot(x + diceSize - offset, y + diceSize - offset);
      break;
  }
}

function rollDice() {
  // random 3 viên xúc xắc (1-6)
  const dice = [
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
  ];
  return dice;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawGame(dice) {
  clearCanvas();
  for (let i = 0; i < dice.length; i++) {
    drawDice(startX + i * (diceSize + diceSpacing), startY, dice[i]);
  }
}

function showResult(dice) {
  const total = dice.reduce((a, b) => a + b, 0);
  let resultText = `Tổng: ${total} - `;

  // luật tài xỉu: 3 xúc xắc, tổng 11-17 là Tài, 4-10 là Xỉu, 3 hoặc 18 là "Lắc lại" (bỏ qua)
  if (total === 3 || total === 18) {
    resultText += "Lắc lại!";
  } else if (total >= 11 && total <= 17) {
    resultText += "TÀI 🎉";
  } else if (total >= 4 && total <= 10) {
    resultText += "XỈU 🎉";
  } else {
    resultText += "Không hợp lệ!";
  }

  resultDiv.textContent = resultText;
}

rollBtn.addEventListener('click', () => {
  const dice = rollDice();
  drawGame(dice);
  showResult(dice);
});

// khởi tạo vẽ xúc xắc ban đầu
drawGame([1, 1, 1]);
resultDiv.textContent = "Ấn Quay để bắt đầu!";
