const currentUser = localStorage.getItem("currentUser") || "Usuario";
document.getElementById("userNameDisplayDashboard").textContent = currentUser;

const history = JSON.parse(localStorage.getItem("moodHistory")) || {};

// Pintar barras del gráfico según los datos guardados
Object.keys(history).forEach(day => {
    const data = history[day];
    const barElement = document.getElementById(`bar-${day}`);
    if (barElement) {
        // Altura proporcional al estado de ánimo (1 al 5)
        let heightPercent = data.mood * 20; 
        barElement.style.height = `${heightPercent}%`;
        
        if (data.mood >= 4) barElement.style.backgroundColor = "#48a97c"; // Verde
        else if (data.mood == 3) barElement.style.backgroundColor = "#eab308"; // Amarillo
        else barElement.style.backgroundColor = "#ef4444"; // Rojo
    }

    // Actualizar tarjetas de estadísticas con el último registro
    document.getElementById("statSleep").textContent = `${data.sleep} horas`;
    document.getElementById("statFactor").textContent = data.factor;
});