import { apiCall } from "./apiCall.mjs";
export async function fetchAll(endpoint) {
  let offset = 0;
  let data;
  let response = [];

  for (let i = 0; i < 10; i++) {
    data = await apiCall("get", endpoint, null, offset);
    offset += 100;

    for (let i = 0; i < data.length; i++) {
      response.push(data[i]);
    }

    if (data.length < 100) {
      console.log(`Ending at ${response.length} results, api called ${i + 1} times`);
      return response;
    }
  }
}