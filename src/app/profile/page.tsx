import { getSession, Session } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';
import ProfileView from './components/ProfileView';

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

async function getProfileData(session: Session) {
  if (!process.env.BACKEND_URL) {
    throw new Error('BACKEND_URL environment variable is not set.');
  }

  if (!session?.accessToken) {
    console.log('No access token found, redirecting to login.');
    redirect('/api/auth/login');
  }

  const backendUrl = `${process.env.BACKEND_URL}/auth/profile`;
  console.log(`Fetching profile data from: ${backendUrl}`);

  try {
    const response = await fetch(backendUrl, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Backend error: ${response.status} ${response.statusText}`, errorBody);
      if (response.status === 401) {
        redirect('/api/auth/login');
      }
      throw new Error(`Backend request failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch profile data:', error);
    redirect('/api/auth/login');
  }
}

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) {
    redirect('/api/auth/login');
  }

  const rawProfileData = await getProfileData(session);

  // Calculate additional stats on the server
  const totalSlides = rawProfileData.decks?.reduce(
    (acc: number, deck: any) => acc + (deck.slides?.length || 0),
    0,
  );

  const mostRecentDeck = rawProfileData.decks?.sort((a: any, b: any) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  })[0];

  const initialProfileData = {
    name: session.user.name || session.user.nickname || session.user.email || '',
    email: session.user.email || '',
    picture: session.user.picture || '',
    joinDate: session.user.updated_at
      ? new Date(session.user.updated_at).toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        })
      : '',
    phone: rawProfileData.phone || '',
    location: rawProfileData.location || '',
    bio: rawProfileData.bio || '',
    plan: rawProfileData.plan || 'Free Plan',
    usage: {
      decksCreated: rawProfileData.decks?.length || 0,
      dataProcessed: formatBytes(Number(rawProfileData.dataProcessed) || 0),
      chatMessages: 0,
      templatesUsed: 0,
      totalSlides: totalSlides || 0,
    },
    mostRecentDeck: mostRecentDeck || null,
  };

  return <ProfileView initialProfileData={initialProfileData} />; 
}
