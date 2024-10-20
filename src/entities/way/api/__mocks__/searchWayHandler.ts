import { HttpResponse, http } from "msw";
import mockWayResponse from "./data/mockWayResponse";

export default http.get(import.meta.env.VITE_API_URL + "/ways", () => {
  return HttpResponse.json(mockWayResponse);
});
