export function auth(status){
    const container = document.querySelector(".status-container");
  
    if(!status){
     container.innerHTML = `
     <div class = "error-container text-danger text-center fs-1 fs-bold m-5">
      <h1>You need to be logged in to view this content</h1>
     </div>
     `;
    }
  }