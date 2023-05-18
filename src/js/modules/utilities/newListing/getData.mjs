export function getData(){
    const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;
    const tagInput = document.querySelector("#tags").value;
    const mediaInput = document.querySelector("#media").value;
    const endDate = document.querySelector("#end-date").value;
    const tags = tagInput.split(", ") !== [''] ? tagInput.split(", ") : undefined;
    const media = mediaInput.split(", ") !== [''] ? mediaInput.split(", ") : undefined;
    
    const values = {
      title: title !== "" ? title : undefined,
      description: description !== "" ? description : undefined,
      tags: tags[0].length > 1 ? tags : undefined,
      media: media !== "" ? media : undefined,
      endsAt: endDate !== "" ? new Date(endDate) : undefined
    }
    const body = Object.fromEntries(Object.entries(values).filter(([key, val]) => val !== undefined))
  
    if(body.title && body.endsAt){
      return body;
    }else{
      return false;
    };
  }