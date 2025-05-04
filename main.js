function logSleep(sleepType) {
  if (!canLogToday()) {
    alert("今日はもう記録済みだよ。明日8時以降にまた来てね！");
    return;
  }

  const prevStage = parseInt(localStorage.getItem("evolutionStage") || "1", 10);
  let delta = 0;
  if (sleepType === "寝た") delta = 2;
  else if (sleepType === "ちょっと寝た") delta = 1;
  else if (sleepType === "寝てない") delta = -1;

  let suyado = parseInt(localStorage.getItem("suyado") || "20", 10);
  suyado = Math.max(0, Math.min(50, suyado + delta)); // 上限50
  localStorage.setItem("suyado", suyado);
  localStorage.setItem("lastLogTime", new Date().toISOString());

  const nowStage = getStage(suyado);
  if (nowStage > prevStage) {
    // 進化演出ページへ！
    location.href = "evolution.html";
  } else {
    // 通常どおりトークページへ
    location.href = "talk.html";
  }
}
