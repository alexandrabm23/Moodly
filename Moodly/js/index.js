const modalLogin = document.getElementById("loginModal");
const modalRegister = document.getElementById("registerModal");
const openLoginBtn = document.getElementById("openLogin");
const openLoginHero = document.getElementById("openLoginHero");
const closeLoginBtn = document.getElementById("closeLogin");
const closeRegisterBtn = document.getElementById("closeRegister");
const openRegisterLink = document.getElementById("openRegisterLink");

const formLogin = document.getElementById("formLogin");
const formRegister = document.getElementById("formRegister");
const loginError = document.getElementById("loginError");

// Abrir/Cerrar modales
openLoginBtn.addEventListener("click", () => modalLogin.style.display = "flex");
openLoginHero.addEventListener("click", () => modalLogin.style.display = "flex");
closeLoginBtn.addEventListener("click", () => modalLogin.style.display = "none");
closeRegisterBtn.addEventListener("click", () => modalRegister.style.display = "none");

openRegisterLink.addEventListener("click", (e) => {
    e.preventDefault();
    modalLogin.style.display = "none";
    modalRegister.style.display = "flex";
});

// Registrar cuenta guardando en localStorage
formRegister.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("regName").value;
    const lastName = document.getElementById("regLastName").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    const user = { name, lastName, email, password };
    localStorage.setItem("moodlyUser", JSON.stringify(user));

    alert("¡Cuenta creada con éxito! Ahora inicia sesión.");
    modalRegister.style.display = "none";
    modalLogin.style.display = "flex";
});

// Iniciar sesión con validación de error
formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = document.getElementById("loginEmail").value;
    const passInput = document.getElementById("loginPassword").value;

    const savedUser = JSON.parse(localStorage.getItem("moodlyUser"));

    // Si hay usuario guardado y coincide, o si usas credenciales genéricas
    if (savedUser && savedUser.email === emailInput && savedUser.password === passInput) {
        localStorage.setItem("currentUser", savedUser.name);
        window.location.href = "app.html";
    } else if (emailInput === "admin@upc.edu.pe" && passInput === "12345") {
        localStorage.setItem("currentUser", "Valeria");
        window.location.href = "app.html";
    } else {
        // Muestra mensaje de error exacto solicitado
        loginError.style.display = "block";
    }
}); 