import { HttpResponse, http } from "msw";

export default http.get(import.meta.env.VITE_API_URL + "/logout", () => {
  return HttpResponse.text("", { status: 200 });
});
