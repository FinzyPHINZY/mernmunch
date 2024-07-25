import { AppState, Auth0Provider, User } from "@auth0/auth0-react";

function Auth0ProviderWithNavigate({ children }: Props) {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;

  if (!domain || !clientId || !redirectUri) {
    throw new Error("ERROR: Failed to initialize auth");
  }

  const onRedirectCallback = (appState?: AppState, user?: User) => {};

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: redirectUri }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}

type Props = {
  children: React.ReactNode;
};

export default Auth0ProviderWithNavigate;
