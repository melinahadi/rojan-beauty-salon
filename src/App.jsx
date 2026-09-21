import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./context/AuthProvider";
import router from "./routes/AppRoutes";
import ErrorBoundary from "./components/ErrorBoundary";
import OfflineBanner from "./components/OfflineBanner";

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <OfflineBanner />
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
