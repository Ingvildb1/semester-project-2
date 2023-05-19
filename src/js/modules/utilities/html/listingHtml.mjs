import { timeDiff } from "../calcDiff.mjs";

export function listingHtml(data, container, type) {
    let end;
  
    if (type === "all") {
      end = data.length;
    } else {
      end = 10;
    }
    const contentContainer = document.querySelector(`.${container}`);
    contentContainer.classList.remove("justify-content-center");
    contentContainer.innerHTML = "";
  
    for (let i = 0; i < end; i++) {
      const date = new Date(data[i].created);
      const posted = `${date.getDate()}/${date.getMonth() + 1}-${date.getFullYear()}`;
  
      const remaining = timeDiff(data[i].endsAt);
  
      let text = data[i]?.description?.slice(0, 70) || "Description missing";
      text.length === 70 ? (text += "...") : text;
  
      contentContainer.innerHTML += `
      <div class="listing md-mw-50 bg-light my-3 d-flex flex-column justify-content-between" data-id = "${data[i].id}">
      <div id="carousel${type}${i}" class="carousel carousel-dark slide carousel-fade" data-bs-ride="carousel">
        <div class="carousel-inner${type}${i}">
  
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carousel${type}${i}" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carousel${type}${i}" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <div class="info mx-3">
        <h3 class="l-title text-center m-3">${data[i].title}</h3>
        <p class="date">Posted: ${posted}</p>
        <p class="l-description">
          ${text}
        </p>
      </div>
      <div class="bids d-flex justify-content-between mx-3">
        <div>
          <p class="m-0">Highest bid:</p>
          <p>${data[i].bids[data[i].bids.length - 1]?.amount || 0} Credits</p>
        </div>
        <div class="vr"></div>
        <div>
          <p class="m-0">${remaining}</p>
          <p>Left</p>
        </div>
      </div>
      <div data-id = "${data[i].id}">
        <a href = "pages/specific.html?id=${data[i].id}"class = "view btn btn-secondary w-100 rounded-0">View listing</a>
      </div>
      </div>
      `;
      if (data[i].media.length > 0) {
        const galleryContainer = document.querySelector(".carousel-inner" + type + i);
  
        data[i].media.forEach((e, index) => {
          if (index === 0) {
            galleryContainer.innerHTML += `
            <div class="carousel-item active">
              <img src=${e} class="d-block w-100 p-img" alt = "the product on auction" onerror = "this.src = '/media/pexels-ekaterina-bolovtsova-6077326.jpg'"/>
            </div>
            `;
          } else {
            galleryContainer.innerHTML += `
            <div class="carousel-item">
              <img src=${e} class="p-img d-block w-100" alt = "the product on auction" />
            </div>
            `;
          }
          if (data[i].media.length < 2) {
            const container = document.querySelector("#carousel" + type + i);
            const buttons = container.querySelectorAll("button");
            buttons.forEach((b) => {
              b.style.display = "none";
            });
          }
        });
      } else {
        const galleryContainer = document.querySelector("#carousel" + type + i);
        galleryContainer.style.display = "none";
      }
    }
  }