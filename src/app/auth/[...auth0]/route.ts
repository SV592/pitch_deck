import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      redirect_uri: 'http://localhost:3000/auth/callback',
      scope: 'openid profile email' // Requesting user profile information
    },
    returnTo: '/'
  })
});