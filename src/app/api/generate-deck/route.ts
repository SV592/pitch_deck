import { getAccessToken, withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';

export const POST = withApiAuthRequired(async function generateDeck(req: NextRequest) {
  try {
    // Try to get session first
    const session = await getSession();

    // Try to get access token for the specific audience
    const { accessToken } = await getAccessToken();

    if (!accessToken) {
      throw new Error("No access token found.");
    }
    
    // Try to get a fresh token by making a request to Auth0
    let finalToken = accessToken;
    try {
      console.log("Attempting to get fresh token...");
      console.log("session?.refreshToken:", session?.refreshToken);
      const refreshResponse = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          client_id: process.env.AUTH0_CLIENT_ID!,
          client_secret: process.env.AUTH0_CLIENT_SECRET!,
          refresh_token: session?.refreshToken || '',
        }),
      });
      
      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();
        if (refreshData.access_token) {
          finalToken = refreshData.access_token;
        }
      } else {
        // Log the status and response text for debugging 400 errors
        console.error("Failed to get fresh token:", refreshResponse.status, await refreshResponse.text());
      }
    } catch (refreshError: any) {
      console.error("Error refreshing token:", refreshError.message);
    }
    
    const body = await req.json();
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
    
    const response = await fetch(`${backendUrl}/decks/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${finalToken}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      let errorMessage = `Backend error: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage += `, message: ${errorData.message || 'Unknown error'}`;
      } catch (parseError) {
        const errorText = await response.text();
        errorMessage += `, response: ${errorText}`;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error in /api/generate-deck route:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      cause: error.cause
    });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});