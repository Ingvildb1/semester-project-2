export function showRegister() {
    const username = document.querySelector(".username");
    const avatar = document.querySelector(".avatar");
    const confirm = document.querySelector(".pass-confirm");
    const submitButton = document.querySelector("#submit-button");
    const loginButton = document.querySelector("#login-button");
    const registerButton = document.querySelector("#register-button");
    const closeButton = document.querySelector("#back-button");
    const title = document.querySelector("h1");
  
    if (title.innerHTML === "Log in") {
      title.innerHTML = "Register";
    } else {
      title.innerHTML = "Log in";
    }
  
    closeButton.classList.toggle("hidden");
    registerButton.classList.toggle("hidden");
    loginButton.classList.toggle("hidden");
    submitButton.classList.toggle("hidden");
    confirm.classList.toggle("hidden");
    avatar.classList.toggle("hidden");
    username.classList.toggle("hidden");
  }