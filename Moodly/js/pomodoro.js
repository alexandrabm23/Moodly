const currentUser = localStorage.getItem("currentUser") || "Usuario";
document.getElementById("userNameDisplayPomodoro").textContent = currentUser;

let timer = 25 * 60;
let interval = null;
const timerText = document.getElementById("timerText");
const startBtn = document.getElementById("startPomodoroBtn");
const resetBtn = document.getElementById("resetPomodoroBtn");

function updateDisplay() {
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;
    timerText.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

startBtn.addEventListener("click", () => {
    if (interval) return;
    startBtn.textContent = "Pausar";
    interval = setInterval(() => {
        if (timer > 0) {
            timer--;
            updateDisplay();
        } else {
            clearInterval(interval);
            alert("¡Tiempo Pomodoro cumplido! Tómate una pausa.");
        }
    }, 1000);
});

resetBtn.addEventListener("click", () => {
    clearInterval(interval);
    interval = null;
    timer = 25 * 60;
    startBtn.textContent = "Iniciar";
    updateDisplay();
});