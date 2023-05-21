import { apiCall } from "../../api/apiCall.mjs";
import * as urls from "../../api/urls.mjs";
import { loggedIn } from "../loggedIn.mjs";
export async function buildProfile(data, edit){
  const container = document.querySelector(".profile-container");

  container.innerHTML = `
  <div class = "w-100 text-center my-3">
    <h1>${data.name}</h1>
  </div>
  <div class = "w-50 mx-auto m-3 profile-image-container position-relative ">
    <img src = "${data.avatar}" class = "rounded-circle w-100 profile-image" alt = "User's profile image" onerror = "this.src = '/img/error.jpg'">
  </div>
  <div class = "d-flex justify-content-between mx-4">
    <div class = "credits">
      <p>Credits:</p>
      <p>${data.credits}</p>
    </div>
    <div class = "wins">
      <p>Auctions Won:</p>
      <p>${data.wins.length}</p>
    </div>
    </div>
  </div>
  `
  if(edit){
    const profileImageContainer = document.querySelector(".profile-image-container");

    profileImageContainer.innerHTML += `<button type = "button"class = "btn edit-btn bg-success text-center text-dark position-absolute bottom-0 end-10" data-bs-toggle="modal" data-bs-target="#modal"><span class="material-symbols-outlined">
    Edit Avatar</button>
    <div class="modal fade" id="modal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="modal-title">Update avatar</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class = "avatar-form">
              <label for = "avatar-input" class = "form-label">New avatar url:</label>
              <input id = "avatar-input" class = "form-control" >
              <div id="status-message" class="form-text fs-5 hidden"></div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary submit-avatar">Save changes</button>
          </div>
        </div>
      </div>
    </div>`

    const form = document.querySelector(".avatar-form");
    const submitButton = document.querySelector(".submit-avatar");
    const input = document.querySelector("#avatar-input");
    const statusMessage = document.querySelector("#status-message")

    form.addEventListener("submit", async (e)=>{
      e.preventDefault();

      const body = {
        avatar: input.value
      };
      const endpoint = urls.profile + data.name + "/media";

      const result = await apiCall("put", endpoint, body);
      if(result.errors){
        statusMessage.innerHTML = result.errors[0].message;
        statusMessage.classList.remove("hidden");
        statusMessage.classList.remove("text-success");
        statusMessage.classList.add("text-danger");
      }else{
        statusMessage.innerHTML = "Success!";
        statusMessage.classList.remove("hidden");
        statusMessage.classList.add("text-success");
        statusMessage.classList.remove("text-danger");

        buildProfile(result, edit);
        window.localStorage.setItem("user", JSON.stringify(result));
        document.querySelector(".modal-backdrop").remove();
        loggedIn();
      }
    });
    submitButton.addEventListener("click", async (e)=>{
      const body = {
        avatar: input.value
      };
      const endpoint = urls.profile + data.name + "/media";

      const result = await apiCall("put", endpoint, body);
      if(result.errors){
        statusMessage.innerHTML = result.errors[0].message;
        statusMessage.classList.remove("hidden");
        statusMessage.classList.remove("text-success");
        statusMessage.classList.add("text-danger");
      }else{
        statusMessage.innerHTML = "Success!";
        statusMessage.classList.remove("hidden");
        statusMessage.classList.add("text-success");
        statusMessage.classList.remove("text-danger");

        buildProfile(result, edit);
        window.localStorage.setItem("user", JSON.stringify(result));
        document.querySelector(".modal-backdrop").remove();
        loggedIn();
      }
    });
  }
};