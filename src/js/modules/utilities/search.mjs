import { searchFilter } from "../filters/searchFilter.mjs";

/**
 * Performs a search based on the provided data.
 * @param {Array<Object>} data - The data to perform the search on.
 */

export function search(data) {
  const form = document.querySelector("form");
  const input = document.querySelector("#search");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const searchTerm = input.value;
    console.log(searchTerm)
    const result = searchFilter(searchTerm, data);
    console.log(result)
    window.localStorage.removeItem("search");
    window.localStorage.setItem("search", JSON.stringify(result));
    if(window.location.pathname === "/semester-project-2/index.html" || window.location.pathname === "/"){
      window.location.href = `pages/listings.html?searchTerm=${searchTerm}`;
    }else{
      window.location.href = `listings.html?searchTerm=${searchTerm}`;
    }
  });
}