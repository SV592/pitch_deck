import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

export const GET = withApiAuthRequired(async function token() {
  try {
    const { accessToken } = await getAccessToken();
    return Response.json({ accessToken });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: error.status || 500 });
  }
});
