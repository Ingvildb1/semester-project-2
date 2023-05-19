import { timeDiff } from "../calcDiff.mjs";
export function specificHtml(data) {
    const container = document.querySelector(".content-container");
  
    let date = new Date(data.created);
    const posted = `${date.getDate()}/${date.getMonth() + 1}-${date.getFullYear()}`;
  
    date = new Date(data.updated);
    const updated = `${date.getDate()}/${date.getMonth() + 1}-${date.getFullYear()}`;
  
    date = new Date(data.endsAt);
    let ends = `${date.getDate()}/${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    if (ends.length < 15) {
      ends = `${date.getDate()}/${date.getMonth() + 1}-${date.getFullYear()} 0${date.getHours()}:0${date.getMinutes()}`;
    }
    const remaining = timeDiff(data.endsAt);
    console.log(remaining )
  
    console.log(data);
    container.innerHTML = `
    <div class = "title">
      <h1 class = "text-center">${data.title}</h1>
    </div>
    <div class = "carousel-container ">
      <div id="carousel" class="carousel carousel-dark slide carousel-fade" data-bs-ride="carousel">
        <div class="carousel-inner  ">
  
        </div>
        
        <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    
    <div class="bids d-flex justify-content-between m-3">
      <div>
        <p class="m-1">Highest bid for this item:</p>
        <p><em class = "bid-number">${data.bids[data.bids.length - 1]?.amount || 0}</em> Total credits</p>
      </div>
      <div>
        <p class="m-1">${remaining}</p>
        <p>${remaining !== "Ended" ? "remaining" : ""}</p>
      </div>
    </div>
    <div class = "make-bid mx-auto"> 
      <form id = "bid-form">
        <label for = "bid" class = "hidden bid-status form-label my-1 w-50 mx-auto text-danger"></label>
        <input class = "form-control my-1 w-50 mx-auto" id = "bid" type = "number" name = "new-bid" placeholder = "000">
        <button class = "btn btn-primary w-50 mx-auto d-flex justify-content-center align-items-center">Make a bid now!</button>
      </form>
    </div>
    <div class="text-success">
     
    </div>
    <div class = "description mx-auto mb-5">
      <h2 class = "text-left">Description of this listing</h2>
      <p>${data.description !== null ? data.description : "The author of this post did not provide a description"}</p>
      <p class="date mx-2">Posted ${posted}</p>
      <div class = "tags text-white">
      </div>
      </div>
    <div class="text-success">
      <hr>
    </div>
    <div class = "title">
      <h2 class = "text-left my-3 mx-5">Requirements</h2>
    </div>
    <div class = "container">
      <div class = "seller-container row my-3">
        <div class = "seller-name mx-3 col">
          <p class = "p-0 m-0">Who is selling this:</p>
          <a href = "profile.html?name=${data.seller.name}" class = "fw-bold m-0 p-0">${data.seller.name}</a>
        </div>
        <div class = "seller-email mx-3 col">
          <p class = "p-0 m-0">Contact the seller:</p>
          <p class = "p-0 m-0 fw-bold">${data.seller.email}
        </div>
      </div>
      <div class = "created-container row my-3">
        <div class = "created mx-3 col">
          <p class = "p-0 m-0">Created:</p>
          <p class = "fw-bold m-0 p-0">${posted}</p>
        </div>
        <div class = "updated mx-3 col">
          <p class = "p-0 m-0">Last updated:</p>
          <p class = "p-0 m-0 fw-bold">${updated}</p>
        </div>
      </div>
      <div class = "row my-3">
        <div class = "ending mx-3 col">
          <p class = "p-0 m-0">This listing ends at:</p>
          <p class = "fw-bold m-0 p-0">${ends}</p>
        </div>
        <div class = "winning mx-3 col">
          <p class = "p-0 m-0">Who is the leading bidder:</p>
          <p class = "p-0 m-0 fw-bold">${data.bids[data.bids.length - 1]?.bidderName || ""}</p>
        </div>
      </div>
    </div>
    `;
  
    if (data.media.length > 0) {
      const galleryContainer = document.querySelector(".carousel-inner");
  
      data.media.forEach((e, index) => {
        if (index === 0) {
          galleryContainer.innerHTML += `
          <div class="carousel-item active">
            <img src=${e} class="d-block p-img mx-auto" alt = "the product on auction" onerror = "this.src = '/media/pexels-ekaterina-bolovtsova-6077326.jpg'"/>
          </div>
          `;
        } else {
          galleryContainer.innerHTML += `
          <div class="carousel-item ">
            <img src=${e} class="d-block p-img mx-auto" alt = "the product on auction" />
          </div>
          `;
        }
        if (data.media.length < 2) {
          const container = document.querySelector("#carousel");
          const buttons = container.querySelectorAll("button");
          buttons.forEach((b) => {
            b.style.display = "none";
          });
        }
      });
    } else {
      const galleryContainer = document.querySelector("#carousel");
      galleryContainer.style.display = "none";
    }
  
    const tagsContainer = document.querySelector(".tags");
  
    if (data.tags) {
      data.tags.forEach((e) => {
        tagsContainer.innerHTML += `<span class = "tag m-1 p-2 bg-primary">${e}</span>`;
      });
    }
    if(remaining === "Ended"){
      return false;
    }else{
      return true;
    }
  }

