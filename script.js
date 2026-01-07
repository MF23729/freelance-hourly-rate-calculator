function calculateRate() {
  const resultEl = document.getElementById("result");

  const incomeEl = document.getElementById("income");
  const hoursEl = document.getElementById("hours");
  const feeEl = document.getElementById("fee");
  const weeksEl = document.getElementById("weeks");

  // 清理旧的错误样式
  [incomeEl, hoursEl, feeEl, weeksEl].forEach((el) => el.classList.remove("input-error"));

  const incomeRaw = incomeEl.value.trim();
  const hoursRaw = hoursEl.value.trim();
  const feeRaw = feeEl.value.trim();
  const weeksRaw = weeksEl.value.trim();

  // 结果区只在触发计算时显示
  resultEl.style.display = "block";

  // 1) 必填
  if (!incomeRaw || !hoursRaw || !feeRaw || !weeksRaw) {
    if (!incomeRaw) incomeEl.classList.add("input-error");
    if (!hoursRaw) hoursEl.classList.add("input-error");
    if (!feeRaw) feeEl.classList.add("input-error");
    if (!weeksRaw) weeksEl.classList.add("input-error");

    resultEl.innerText = "Please fill in all fields.";
    return;
  }

  const income = Number(incomeRaw);
  const hours = Number(hoursRaw);
  const feePercent = Number(feeRaw);
  const weeks = Number(weeksRaw);

  // 2) 必须是有效数字
  if (![income, hours, feePercent, weeks].every(Number.isFinite)) {
    resultEl.innerText = "Please enter valid numbers.";
    return;
  }

  // 3) 合理范围（同时高亮对应输入框）
  if (income <= 0) {
    incomeEl.classList.add("input-error");
    resultEl.innerText = "Monthly income goal must be greater than 0.";
    return;
  }
  if (hours <= 0) {
    hoursEl.classList.add("input-error");
    resultEl.innerText = "Weekly working hours must be greater than 0.";
    return;
  }
  if (weeks < 1 || weeks > 6) {
    weeksEl.classList.add("input-error");
    resultEl.innerText = "Weeks per month must be between 1 and 6.";
    return;
  }
  if (feePercent < 0 || feePercent >= 100) {
    feeEl.classList.add("input-error");
    resultEl.innerText = "Platform fee must be between 0 and 99.9.";
    return;
  }

  // 4) 计算
  const fee = feePercent / 100;
  const monthlyHours = hours * weeks;
  const hourlyRate = income / (monthlyHours * (1 - fee));

  // 更“工具站化”的结果文案（短、直接）
  resultEl.innerText =
    `Required hourly rate: $${hourlyRate.toFixed(2)} ` +
    `(to earn $${income.toFixed(0)}/month after fees)`;
}

/* 点击按钮 */
document.getElementById("calculateBtn").addEventListener("click", calculateRate);

/* 回车键触发计算 */
["income", "hours", "fee", "weeks"].forEach((id) => {
  document.getElementById(id).addEventListener("keydown", (e) => {
    if (e.key === "Enter") calculateRate();
  });
});

/* 页面加载时隐藏结果区 */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("result").style.display = "none";
});
