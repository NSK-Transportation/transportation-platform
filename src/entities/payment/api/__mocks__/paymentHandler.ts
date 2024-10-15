import { HttpResponse, http } from "msw";
import mockPaymentResponse from "./data/mockPaymentResponse";

export default http.post(import.meta.env.VITE_API_URL + "/payment", () => {
  return HttpResponse.json(mockPaymentResponse);
});
