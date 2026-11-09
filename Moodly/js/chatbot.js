const chatMessages = document.getElementById("chatMessages");
const chatOptions = document.getElementById("chatOptions");

// Mostrar nombre del usuario si está guardado
const currentUser = localStorage.getItem("currentUser");
if (currentUser && document.getElementById("userNameDisplayChat")) {
    document.getElementById("userNameDisplayChat").textContent = currentUser;
}

function addUserMessage(text) {
    const msgDiv = document.createElement("div");
    msgDiv.className = "message user-message";
    msgDiv.innerHTML = `<div class="message-bubble">${text}</div>`;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addBotMessage(text) {
    const msgDiv = document.createElement("div");
    msgDiv.className = "message bot-message";
    msgDiv.innerHTML = `
        <div class="bot-avatar">
            <img src="imagenes/chatbot.png" alt="Logo" class="chat-avatar-img">
        </div>
        <div class="message-bubble">${text}</div>
    `;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleFlow(type, buttonText) {
    addUserMessage(buttonText);
    chatOptions.innerHTML = ""; // Limpiar botones anteriores

    setTimeout(() => {
        if (type === 'estresada') {
            addBotMessage("Te entiendo perfectamente 💚. Para ayudarte a sentirte mejor ahora mismo, ¿qué te gustaría hacer?");
            chatOptions.innerHTML = `
                <button class="option-btn" data-type="respiracion">Hacer ejercicio de respiración</button>
                <button class="option-btn" data-type="tareas">Organizar mis tareas</button>
                <button class="option-btn" data-type="desahogo">Solo quiero desahogarme</button>
            `;
        } else if (type === 'respiracion') {
            addBotMessage("¡Excelente elección! 🧘‍♀️ Vamos a tomar 2 minutos para inhalar y exhalar despacio. ¿Empezamos?");
            chatOptions.innerHTML = `
                <button class="option-btn" data-type="iniciar_respiracion">Sí</button>
                <button class="option-btn" data-type="inicio">No por ahora</button>
            `;
        } else if (type === 'iniciar_respiracion') {
            addBotMessage("¡Genial! 💚 Busca una posición cómoda. Vamos a inhalar en 4 segundos, sostener 4 y exhalar en 4. Empezamos en 3, 2, 1...");
            chatOptions.innerHTML = `
                <button class="option-btn" data-type="inicio">Volver al inicio</button>
            `;
        } else if (type === 'triste') {
            addBotMessage("Siento que te sientas así. Recuerda que es válido tener días difíciles 💚. ¿Te gustaría escuchar un mensaje motivacional o probar una pausa activa?");
            chatOptions.innerHTML = `
                <button class="option-btn" data-type="motivacion">Mensaje motivacional</button>
                <button class="option-btn" data-type="inicio">Volver al inicio</button>
            `;
        } else if (type === 'motivacion') {
            addBotMessage("🌟 \"No importa lo lento que vayas, siempre y cuando no te detengas.\" Recuerda que cada pequeño paso cuenta y eres mucho más fuerte de lo que imaginas. ¡Tómate un respiro, lo estás haciendo increíble! 💚");
            chatOptions.innerHTML = `
                <button class="option-btn" data-type="inicio">Volver al inicio</button>
            `;
        } else if (type === 'bien') {
            addBotMessage("¡Me alegra muchísimo leer eso! 🎉 Sigue así y recuerda registrar tus avances en tu Dashboard.");
            chatOptions.innerHTML = `
                <button class="option-btn" data-type="inicio">Volver al inicio</button>
            `;
        } else if (type === 'tareas') {
            addBotMessage("¡Perfecto! Puedes ir a la sección <b>Tareas</b> en el menú superior para organizar tus entregas pendientes y exámenes.");
            chatOptions.innerHTML = `
                <button class="option-btn" data-type="inicio">Volver al inicio</button>
            `;
        } else if (type === 'desahogo') {
            addBotMessage("Te escucho atentamente... Escribir o reconocer lo que sientes es un gran paso. ¿Te sirve de ayuda dar un paseo corto o escuchar música?");
            chatOptions.innerHTML = `
                <button class="option-btn" data-type="inicio">Volver al inicio</button>
            `;
        } else {
            // Reiniciar al inicio por defecto
            addBotMessage("Hola 👋 Soy Moodly, tu compañero de bienestar. ¿Cómo te sientes hoy?");
            chatOptions.innerHTML = `
                <button class="option-btn" data-type="estresada">Cansada / Estresada</button>
                <button class="option-btn" data-type="triste">Triste / Desanimada</button>
                <button class="option-btn" data-type="bien">Bien / Tranquila</button>
            `;
        }
        attachButtonEvents();
    }, 500);
}

// Conectar eventos dinámicamente a los botones generados
function attachButtonEvents() {
    const buttons = chatOptions.querySelectorAll(".option-btn");
    buttons.forEach(btn => {
        btn.onclick = function() {
            const type = btn.getAttribute("data-type");
            const text = btn.textContent;
            handleFlow(type, text);
        };
    });
}

// Inicializar eventos para los primeros botones de la página
attachButtonEvents();