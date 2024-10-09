import { HttpResponse, http } from "msw";

export default http.get(import.meta.env.API_URL + "/logout", () => {
  return HttpResponse.text("", { status: 200 });
});
