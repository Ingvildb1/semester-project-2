import { apiCall } from "../../api/apiCall.mjs";
import * as urls from "../../api/urls.mjs";
import { getData } from "./getData.mjs";
export async function createListing(){
  const formSubmitter = document.querySelector("#new-listing-button");

  formSubmitter.addEventListener("click",async (e)=>{

    const body = getData();
    console.log(body);
    if(body){
      try{
        console.log("Fired")
        const result = await apiCall("post", "listing", body);
        console.log(result)
        if(result.id){
          if(window.location.pathname === "/"){
            window.location.href = `pages/spesific.html?id=${result.id}`;  
          }else{
            window.location.href = `../pages/spesific.html?id=${result.id}`;
          }
        }
      }catch(e){
        console.log(e);
      }
    }

  })
}