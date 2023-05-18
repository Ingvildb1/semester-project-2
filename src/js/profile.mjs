import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import { loggedIn } from "./modules/utilities/loggedIn.mjs";
import {apiCall} from "./modules/api/apiCall.mjs";
import * as urls from "./modules/api/urls.mjs";
import {buildProfile} from "./modules/utilities/html/buildProfile.mjs";
import { createCards } from "./modules/utilities/html/cardsHtml.mjs";
import { search } from "./modules/utilities/search.mjs";
import { auth } from "./modules/utilities/unauthorized.mjs";
import { createListing } from "./modules/utilities/newListing/createListing.mjs";


//Check if the user is logged in
const status = loggedIn();
auth(status);

if(status){
  //Search function 

  const data = await apiCall("get", "listings");
  search(data);

  createListing();
  
  //check if page should display logged in user's profile or another user's profile
  const query = new URLSearchParams(document.location.search);
  let name = query.get("name")
  const edit = name ? false : true;

  if(!name){
    const user = JSON.parse(window.localStorage.getItem("user"));
    name = user.name
  }

  //Get profile object from api
  const profileEndpoint = urls.profile + name + "/listings?_bids=true";
  const profile = await apiCall("get", urls.profile + name)
  const profileListings = await apiCall("get", profileEndpoint);

  //Build profile info and profile listings
  const title = document.querySelector("title");
  title.innerHTML += `${name}'s profile`;
  
  buildProfile(profile, edit);
  createCards(profileListings);

}else{
  const loader = document.querySelectorAll(".loader");
  loader.forEach((e)=>{
    e.remove();
  })
}