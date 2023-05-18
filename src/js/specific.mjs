import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import { loggedIn } from "./modules/utilities/loggedIn.mjs";
import { apiCall } from "./modules/api/apiCall.mjs";
import * as urls from "./modules/api/urls.mjs";
import { specificHtml } from "./modules/utilities/html/specificHtml.mjs";
import { makeBid } from "./modules/api/makeBids.mjs";
import { search } from "./modules/utilities/search.mjs";
import { createListing } from "./modules/utilities/newListing/createListing.mjs";
import { tooltip } from "./modules/utilities/tooltips.mjs";


tooltip();

createListing();

//Check if the user is logged in and make adjustments
const signedIn = loggedIn();

//Search function 
const data = await apiCall("get", "listings");
search(data);

//Get listing id
const queryString = new URLSearchParams(window.location.search);
const id = queryString.get("id");

//Create the endpoint and call the api
const endpoint = urls.listing + id + "?&_bids=true&_seller=true";

const result = await apiCall("get", endpoint);

//Build the page
const title = document.querySelector("title");
title.innerHTML += `${result.title}`;

const status = specificHtml(result);

//Add event listener on bid form
const user = JSON.parse(window.localStorage.getItem("user"));

const bidForm = document.querySelector("#bid-form");

if(!status){
  bidForm.remove();
}

if(signedIn){

  bidForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const bid = document.querySelector("#bid").value;
    const newResult = await makeBid(result);
    
    if (newResult) {
      result.bids.push({amount: Number(bid), bidderName: user.name});
      console.log(result);
      specificHtml(result);
      
      const bidStatus = document.querySelector(".bid-status");  
      bidStatus.classList.remove("hidden");
      bidStatus.classList.remove("text-danger");
      bidStatus.classList.add("text-success");
      bidStatus.innerHTML = "Success!";
    }
  });
}else{
  bidForm.remove();
}