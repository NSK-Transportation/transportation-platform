import { QueryClient, QueryClientProvider } from "react-query";
import { FormProvider } from "./providers";
import { Router } from "./routers";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FormProvider>
        <Router />
      </FormProvider>
    </QueryClientProvider>
  );
}

export default App;
