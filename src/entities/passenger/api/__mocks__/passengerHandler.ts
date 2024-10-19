import { HttpResponse, delay, http } from "msw";
import mockPassengerResponse from "./data/mockPassengerResponse";

export default http.get(import.meta.env.VITE_API_URL + "/passenger", async () => {
  await delay(2000);
  return HttpResponse.json(mockPassengerResponse);
});
