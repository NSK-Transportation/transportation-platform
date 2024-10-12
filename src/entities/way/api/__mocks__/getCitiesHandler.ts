/* eslint-disable @conarti/feature-sliced/layers-slices */
import { HttpResponse, http } from "msw";
import mockCitiesResponse from "./data/mockCitiesResponse";

export default http.get(import.meta.env.VITE_API_URL + "/cities", () => {
  return HttpResponse.json(mockCitiesResponse);
});
