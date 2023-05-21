/**
 * Creates and displays cards based on the provided data.
 * @param {Array<Object>} data - The data used to create the cards.
 * @param {number} [counter] - The counter value to limit the number of cards displayed.
 * @param {number} [index] - The starting index for creating cards.
 */

export function createCards(data, counter, index){
    const container = document.querySelector(".content-container");
    let count;
  
    if(!counter){
      count = data.length < 10 ? data.length : 10;
    }else{
      count = counter;
    }
  
    let i = index !== undefined ? index : 0;
  
    container.innerHTML = "";
    
    for(i; i < count; i++){
      const date = new Date(data[i].created);
      const posted = `${date.getDate()}/${date.getMonth() + 1}-${date.getFullYear()}`;
  
      container.innerHTML += `
      <div class = "card m-3 rounded w-50 mx-auto">
        <img src = "${data[i].media[0] || ''}" class = "image-height-fix" alt = "product image" onerror = "this.src = '../img/error.jpg'">
        <a href = "spesific.html?id=${data[i].id}" class = "unset">
          <div class = "text-dark bg-info" data-id = "${data[i].id}">
            <h2 class = "card-title text-primary">${data[i].title}</h2>
            <p class = "card-text">Posted:</p>
            <p class = "card-text">${posted}</p>
            <p class = "card-text">Current highest bid:</p>
            <p class = "card-text">${data[i].bids.length > 0 ? data[i].bids[data[i].bids.length -1]?.amount + " Credits" : "0 bids"}</p>
          </div>
        </a>
      </div>
      `
    }
    if(count < data.length){
      count += 20;
  
      container.innerHTML += `
      <button id = "load" class = "btn btn-primary w-50 mx-auto my-3 d-block">Load more</button>
      `
      const loadButton = document.querySelector("#load");
  
      loadButton.addEventListener("click", (e)=>{
        loadButton.remove();
        createCards(data, count, i);
      })
    }
  }