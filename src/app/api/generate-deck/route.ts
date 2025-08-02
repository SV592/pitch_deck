import { getAccessToken, withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';

export const POST = withApiAuthRequired(async function generateDeck(req: NextRequest) {
  try {
    // Debug environment variables
    console.log("Environment variables:", {
      AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
      AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
      AUTH0_SECRET: process.env.AUTH0_SECRET ? `${process.env.AUTH0_SECRET.substring(0, 10)}...` : 'NOT SET',
      BACKEND_URL: process.env.BACKEND_URL
    });

    // Try to get session first
    const session = await getSession();
    console.log("Session available:", !!session);
    if (session) {
      console.log("Session user:", session.user?.sub);
      console.log("Session access token available:", !!session.accessToken);
      if (session.accessToken) {
        console.log("Session access token (first 20 chars):", session.accessToken.substring(0, 20) + "...");
      }
    }

    // Try to get access token for the specific audience
    const { accessToken } = await getAccessToken();
    console.log("Next.js API Route (generate-deck): Access Token available:", !!accessToken);

    if (!accessToken) {
      throw new Error("No access token found.");
    }

    // Debug: Log token details (first 20 chars for security)
    console.log("Access Token (first 20 chars):", accessToken.substring(0, 20) + "...");
    console.log("Access Token length:", accessToken.length);
    
    // Try to get a fresh token by making a request to Auth0
    let finalToken = accessToken;
    try {
      console.log("Attempting to get fresh token...");
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
        console.log("Fresh token obtained:", {
          access_token: refreshData.access_token ? refreshData.access_token.substring(0, 20) + "..." : "none",
          token_type: refreshData.token_type,
        });
        if (refreshData.access_token) {
          finalToken = refreshData.access_token;
        }
      } else {
        console.log("Failed to get fresh token:", refreshResponse.status);
      }
    } catch (refreshError: any) {
      console.log("Error refreshing token:", refreshError.message);
    }
    
    const body = await req.json();
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
    
    // Test the auth endpoint first
    console.log("Testing auth endpoint...");
    try {
      const authTestResponse = await fetch(`${backendUrl}/api/test-auth`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${finalToken}`,
          'Accept': 'application/json',
        },
      });
      console.log("Auth test response status:", authTestResponse.status);
      if (authTestResponse.ok) {
        const authTestData = await authTestResponse.json();
        console.log("Auth test successful:", authTestData);
      } else {
        const authTestError = await authTestResponse.text();
        console.log("Auth test failed:", authTestError);
      }
    } catch (authTestError: any) {
      console.log("Auth test error:", authTestError.message);
    }
    
    const fullUrl = `${backendUrl}/decks/generate`;
    
    console.log("Attempting to fetch from:", fullUrl);
    console.log("Request body:", JSON.stringify(body, null, 2));

    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${finalToken}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);

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