// Mostrar nombre de usuario
const currentUser = localStorage.getItem("currentUser") || "Usuario";
if (document.getElementById("userNameDisplayTareas")) {
    document.getElementById("userNameDisplayTareas").textContent = currentUser;
}

const modalTask = document.getElementById("taskModal");
const openTaskBtn = document.getElementById("openTaskModalBtn");
const closeTaskBtn = document.getElementById("closeTaskModal");
const formAddTask = document.getElementById("formAddTask");
const tasksListContainer = document.getElementById("tasksListContainer");

// Abrir y cerrar modal de nueva tarea
openTaskBtn.addEventListener("click", () => modalTask.style.display = "flex");
closeTaskBtn.addEventListener("click", () => modalTask.style.display = "none");
window.addEventListener("click", (e) => {
    if (e.target === modalTask) modalTask.style.display = "none";
});

// Obtener tareas guardadas o cargar ejemplos iniciales
function getTasks() {
    return JSON.parse(localStorage.getItem("moodlyTasks")) || [
        { id: 1, name: "Cálculo II Examen", date: "15 Oct", completed: true },
        { id: 2, name: "Entregar Proyecto de Física", date: "15 Oct", completed: false },
        { id: 3, name: "Entregar V Examen", date: "15 Oct", completed: false },
        { id: 4, name: "Entregar Proyecto", date: "15 Oct", completed: false }
    ];
}

function saveTasks(tasks) {
    localStorage.setItem("moodlyTasks", JSON.stringify(tasks));
}

// Renderizar tareas en pantalla
function renderTasks() {
    const tasks = getTasks();
    tasksListContainer.innerHTML = "";

    if (tasks.length === 0) {
        tasksListContainer.innerHTML = `<p style="text-align: center; color: #6b7280; padding: 20px;">No hay tareas pendientes. ¡Agrega una con el botón +!</p>`;
        return;
    }

    tasks.forEach(task => {
        const taskDiv = document.createElement("div");
        taskDiv.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskDiv.innerHTML = `
            <div class="task-info">
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}">
                <div class="task-text">
                    <h4>${task.name}</h4>
                    <span>📅 ${task.date}</span>
                </div>
            </div>
            <button class="delete-task-btn" data-id="${task.id}">🗑️</button>
        `;
        tasksListContainer.appendChild(taskDiv);
    });

    attachTaskEvents();
}

// Agregar nueva tarea desde el formulario
formAddTask.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("taskName").value;
    const date = document.getElementById("taskDate").value;

    const tasks = getTasks();
    const newTask = {
        id: Date.now(),
        name,
        date,
        completed: false
    };

    tasks.push(newTask);
    saveTasks(tasks);

    document.getElementById("taskName").value = "";
    document.getElementById("taskDate").value = "";
    modalTask.style.display = "none";
    renderTasks();
});

// Manejar eventos de completar o eliminar tarea
function attachTaskEvents() {
    // Checkbox de completar
    document.querySelectorAll(".task-checkbox").forEach(box => {
        box.addEventListener("change", (e) => {
            const id = Number(e.target.getAttribute("data-id"));
            let tasks = getTasks();
            tasks = tasks.map(t => t.id === id ? { ...t, completed: e.target.checked } : t);
            saveTasks(tasks);
            renderTasks();
        });
    });

    // Botón eliminar
    document.querySelectorAll(".delete-task-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = Number(e.target.getAttribute("data-id"));
            let tasks = getTasks();
            tasks = tasks.filter(t => t.id !== id);
            saveTasks(tasks);
            renderTasks();
        });
    });
}

// Cargar al iniciar
renderTasks();