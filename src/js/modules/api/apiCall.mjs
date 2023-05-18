import * as urls from "./urls.mjs";
export async function apiCall(method, endpoint, body, offset) {
  //Set url
  let url = urls[endpoint] || endpoint;

  if (offset) {
    url += `&offset=${offset}`;
  }

  //Set base options
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  //Add authorization if the user is logged in
  if (window.localStorage.getItem("token")) {
    const token = JSON.parse(window.localStorage.getItem("token"));

    options.headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  //Add the body object if it's required for the endpoint
  if (body) {
    options.body = JSON.stringify(body);
  }

  //Make the api call
  try {
    const response = await fetch(url, options);
    const result = await response.json();

    return result;
  } catch (e) {
    console.log(e);
    return e;
  }
}