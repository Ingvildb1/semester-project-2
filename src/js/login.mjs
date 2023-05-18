import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import { showRegister } from "./modules/utilities/showRegister.mjs";
import { getFormData } from "./modules/utilities/getFormData.mjs";
import validate from "./modules/utilities/validate.mjs";
import { apiCall } from "./modules/api/apiCall.mjs";
import { search } from "./modules/utilities/search.mjs";


const data = await apiCall("get", "listings")
search(data);

//Check if the user was sent trough the register button
const queryString = document.location.search;
if (queryString.includes("page=register")) {
  showRegister();
}

// Form work
const form = document.querySelector("#login");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (e.submitter.dataset.action === "register-open" || e.submitter.dataset.action === "close-register") {
    
    showRegister();
  } else if (e.submitter.dataset.action === "register-send") {
    const body = getFormData("register");
    const valid = validate(body, "register");
    if (valid) {
      delete body.confirm;
      const result = await apiCall("post", "register", body, null);
      console.log(result);
      const statusText = document.querySelector(".status");
      statusText.classList.remove("hidden");
      if (result.id) {
        statusText.innerHTML = "Success";
        statusText.classList.add("text-success");
        statusText.classList.remove("text-danger");
        showRegister();
      } else {
        statusText.innerHTML = result.errors[0].message;
        statusText.classList.add("text-danger");
      }
    }
  } else {
    const body = getFormData();
    const valid = validate(body);
    if (valid) {
      const result = await apiCall("post", "login", body, null);
      console.log(result);
      if (result.accessToken) {
        const token = result.accessToken;
        delete result.accessToken;
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(result));
        window.location.href = "../index.html";
      } else {
        const statusText = document.querySelector(".status");
        statusText.classList.remove("hidden");
        statusText.classList.add("text-danger");
        statusText.innerHTML = result.errors[0].message;
      }
    }
  }
});