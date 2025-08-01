import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

export const GET = withApiAuthRequired(async function token(req) {
  try {
    const res = new Response();
    const { accessToken } = await getAccessToken(req, res);
    return Response.json({ accessToken });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: error.status || 500 });
  }
});
