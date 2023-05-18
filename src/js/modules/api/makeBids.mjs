import { apiCall } from "./apiCall.mjs";
import * as urls from "./urls.mjs";
import { loggedIn } from "../utilities/loggedIn.mjs";
export async function makeBid(data) {
  const bid = document.querySelector("#bid").value;
  const bidStatus = document.querySelector(".bid-status");
  const currentContainer = document.querySelector(".bid-number");

  const amount = Number(bid);

  if (data.bids.length > 1 && Number(bid) < data.bids[data.bids.length - 1].amount) {
    bidStatus.classList.remove("hidden");
    bidStatus.innerHTML = "You're bid must be higher than the current highest bid";
    bidStatus.classList.add("text-danger");
    bidStatus.classList.remove("text-success");
    return false;
  } else {
    bidStatus.classList.add("hidden");
  }

  const endpoint = urls.listing + data.id + "/bids";
  const body = { amount };

  try {
    const result = await apiCall("post", endpoint, body, null);
    if (result.id) {
      const user = JSON.parse(window.localStorage.getItem("user")).name;
      const endpoint = urls.profile + user;
      const update = await apiCall("get", endpoint);
      window.localStorage.setItem("user", JSON.stringify(update));
      loggedIn();
      return result;
    } else {
      bidStatus.classList.remove("hidden");
      bidStatus.innerHTML = result.errors[0].message;
      bidStatus.classList.add("text-danger");
      bidStatus.classList.remove("text-success");
      return false;
    }
  } catch (e) {
    console.log(e);
    bidStatus.classList.remove("hidden");
    bidStatus.innerHTML = e.message;
    return false;
  }
}