// Mostrar nombre real del usuario registrado
const currentUser = localStorage.getItem("currentUser") || "Usuario";
document.getElementById("userNameDisplay").textContent = currentUser;
document.getElementById("welcomeGreeting").textContent = `¡Hola, ${currentUser}! 👋`;

let selectedMood = null;
let selectedFactor = "Carga académica";
let selectedSleep = "7";

// Seleccionar ánimo
document.querySelectorAll(".mood-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
        document.querySelectorAll(".mood-btn").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        selectedMood = btn.getAttribute("data-value");
    });
});

// Seleccionar factor
document.querySelectorAll("#factorGroup .chip-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll("#factorGroup .chip-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedFactor = btn.getAttribute("data-factor");
    });
});

// Seleccionar sueño
document.querySelectorAll("#sleepGroup .chip-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll("#sleepGroup .chip-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedSleep = btn.getAttribute("data-sleep");
    });
});

// Guardar registro rotativo por día de la semana (L, M, X, J, V, S, D)
document.getElementById("saveSurveyBtn").addEventListener("click", () => {
    if (!selectedMood) {
        alert("Por favor selecciona cómo te sientes hoy.");
        return;
    }

    let history = JSON.parse(localStorage.getItem("moodHistory")) || {};
    const daysOrder = ["L", "M", "X", "J", "V", "S", "D"];
    
    // Encuentra el siguiente día disponible para la demostración
    let currentDayIndex = Object.keys(history).length % daysOrder.length;
    let assignedDay = daysOrder[currentDayIndex];

    history[assignedDay] = {
        mood: selectedMood,
        factor: selectedFactor,
        sleep: selectedSleep
    };

    localStorage.setItem("moodHistory", JSON.stringify(history));
    alert(`¡Registro guardado para el día ${assignedDay} exitosamente! Revisa tu Dashboard.`);
    window.location.href = "dashboard.html";
});