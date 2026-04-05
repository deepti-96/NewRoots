import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import "./index.css";

if (!window.location.hash) {
  window.location.hash = "#/";
}

// Auth0 redirect callback needs to strip code/state from URL
const onRedirectCallback = () => {
  // After Auth0 redirects back, just go to hash root
  window.history.replaceState({}, document.title, window.location.pathname + "#/");
};

createRoot(document.getElementById("root")!).render(
  <Auth0Provider
    domain="dev-p248ayy0xaycz1lz.us.auth0.com"
    clientId="V7rf7lgchZ9QmHPpKlJA8hYbzWAOqbnE"
    authorizationParams={{
      redirect_uri: window.location.origin + window.location.pathname,
    }}
    onRedirectCallback={onRedirectCallback}
    cacheLocation="memory"
  >
    <App />
  </Auth0Provider>
);
