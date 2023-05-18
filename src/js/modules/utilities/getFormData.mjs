export function getFormData(type) {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const name = document.querySelector("#username").value;
    const avatar = document.querySelector("#avatar").value;
    const confirm = document.querySelector("#password-confirm").value;
  
    let body;
  
    if (type === "register") {
      body = { name, email, password, confirm, avatar };
    } else {
      body = { email, password };
    }
  
    return body;
  }