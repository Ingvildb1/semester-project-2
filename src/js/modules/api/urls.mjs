export const baseUrl = "https://api.noroff.dev/api/v1";
export const listings = baseUrl + "/auction/listings?_seller=true&_bids=true&sort=created&sortOrder=desc";
export const activeListings = baseUrl + "/auction/listings?_seller=true&_bids=true&sort=created&sortOrder=desc&_active=true";
export const listing = baseUrl + "/auction/listings/";
export const register = baseUrl + "/auction/auth/register";
export const login = baseUrl + "/auction/auth/login";
export const profile = baseUrl + "/auction/profiles/";