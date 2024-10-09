/* eslint-disable @conarti/feature-sliced/layers-slices */
import { HttpResponse, http } from "msw";
import mockLoginResponse from "./data/mockLoginResponse";

export default http.post(import.meta.env.VITE_API_URL + "/login", () => {
  return HttpResponse.json(mockLoginResponse);
});
