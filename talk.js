const suyado = parseInt(localStorage.getItem("suyado") || "20", 10);
const stage = suyado >= 50 ? 3 : suyado >= 35 ? 2 : 1;
const userName = localStorage.getItem("suyamonUserName") || "○○";
const shownKey = `shownLines_stage${stage}`;
const shownIndexes = JSON.parse(localStorage.getItem(shownKey) || "[]");

fetch("data/lines.json")
  .then(res => res.json())
  .then(data => {
    const lines = data[`stage${stage}`];
    const availableIndexes = lines
      .map((_, i) => i)
      .filter(i => !shownIndexes.includes(i));

    if (availableIndexes.length === 0) {
      typeWriter("今日はもうボクの言葉、全部言っちゃった…また明日ね", 0);
      return;
    }

    const randIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
    const selected = lines[randIndex].replace(/○○さん/g, `${userName}さん`);
    shownIndexes.push(randIndex);
    localStorage.setItem(shownKey, JSON.stringify(shownIndexes));

    typeWriter(selected, 0);
  });

function typeWriter(text, i) {
  const target = document.getElementById("dialogue-box");
  if (i === 0) target.textContent = "";
  if (i < text.length) {
    target.textContent += text.charAt(i);
    setTimeout(() => typeWriter(text, i + 1), 40);
  }
}

function updateProgress(stage, totalCount) {
    const shownKey = `shownLines_stage${stage}`;
    const shown = JSON.parse(localStorage.getItem(shownKey) || "[]");
    const percent = Math.floor((shown.length / totalCount) * 100);
    document.getElementById("progress-text").textContent = `読破率：${shown.length}/${totalCount}（${percent}%）`;
    document.getElementById("progress-bar").style.width = `${percent}%`;
  }
  