import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import { fetchAll } from "./modules/api/fetchAll.mjs";
import { removeEnded } from "./modules/filters/removeEnded.mjs";
import { createCards } from "./modules/utilities/html/cardsHtml.mjs";
import { loggedIn } from "./modules/utilities/loggedIn.mjs";
import { tooltip } from "./modules/utilities/tooltips.mjs";
import { search } from "./modules/utilities/search.mjs";
import { createListing } from "./modules/utilities/newListing/createListing.mjs";

//init tooltips

tooltip();

loggedIn();

createListing();

const query = document.location.search;
const params = new URLSearchParams(query);
const source = params.get("searchTerm")

const result = await fetchAll("activeListings");
const data = removeEnded(result);

if(source){
  console.log("Search")
  const searchResult = JSON.parse(window.localStorage.getItem("search"));
  console.log(searchResult)
  createCards(searchResult)
}else{
  console.log("All")
  createCards(data);
};

search(result);




