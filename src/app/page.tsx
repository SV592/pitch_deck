import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';
import HomePageClient from './components/HomePageClient';

export default async function HomePage() {
  const session = await getSession();

  if (!session) {
    redirect('/api/auth/login');
  }

  return <HomePageClient user={session.user} />;
}
