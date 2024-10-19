import { HttpResponse, delay, http } from "msw";
import mockGetRefundResponse from "./data/mockGetRefundResponse";
import mockPostRefundResponse from "./data/mockPostRefundResponse";

export const refundHandler = [
  http.get(import.meta.env.VITE_API_URL + "/refund", async () => {
    await delay(2000);
    return HttpResponse.json(mockGetRefundResponse);
  }),

  http.post(import.meta.env.VITE_API_URL + "/refund", async () => {
    await delay(2000);
    return HttpResponse.json(mockPostRefundResponse);
  }),
];
