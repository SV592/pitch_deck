# Auth0 Setup Guide

## Issue Resolution

The JWE decryption error you encountered was caused by manually trying to decrypt the Auth0 access token using the `jose` library. The `@auth0/nextjs-auth0` SDK handles token encryption/decryption automatically when properly configured.

## Changes Made

1. **Removed manual JWE decryption** from `/api/generate-deck/route.ts`
2. **Created centralized Auth0 configuration** in `src/app/auth0-config.ts`
3. **Updated Auth0 routes** to use the centralized configuration
4. **Simplified token handling** - the SDK now handles everything automatically

## Environment Variables Required

Create a `.env.local` file in your project root with the following variables:

```env
# Auth0 Configuration
AUTH0_SECRET='use [openssl rand -hex 32] to generate a 32 bytes value'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://YOUR_DOMAIN'
AUTH0_CLIENT_ID='your_client_id'
AUTH0_CLIENT_SECRET='your_client_secret'
AUTH0_AUDIENCE='your_api_identifier'

# Backend URL
BACKEND_URL='http://localhost:3001'
```

## How to Generate AUTH0_SECRET

Run this command in your terminal to generate a secure 32-byte secret:

```bash
openssl rand -hex 32
```

## Auth0 Dashboard Configuration

1. Go to your Auth0 Dashboard
2. Navigate to Applications > Your App
3. Configure the following settings:
   - **Allowed Callback URLs**: `http://localhost:3000/api/auth/callback`
   - **Allowed Logout URLs**: `http://localhost:3000`
   - **Allowed Web Origins**: `http://localhost:3000`
4. Copy the Client ID and Client Secret to your `.env.local` file
5. Set your Domain as the AUTH0_ISSUER_BASE_URL

## API Configuration

If you're using Auth0 APIs, make sure to:
1. Create an API in your Auth0 Dashboard
2. Set the identifier as your AUTH0_AUDIENCE
3. Configure the appropriate scopes

## Testing

After setting up the environment variables:
1. Restart your development server
2. Try logging in through your application
3. Test the `/api/generate-deck` endpoint

The JWE decryption error should now be resolved, and the Auth0 SDK will handle all token management automatically. 