import { handleAuth, handleLogin, handleLogout } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      redirect_uri: 'http://localhost:3000/api/auth/callback',
      scope: 'openid profile email'
    },
    returnTo: '/'
  }),
  logout: handleLogout({
    returnTo: '/login',
  }),
});