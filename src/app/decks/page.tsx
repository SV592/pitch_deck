import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';
import DecksPageClient from './components/DecksPageClient';

// Enable ISR (Incremental Static Regeneration) with 60 second revalidation
export const revalidate = 60;

// Force dynamic rendering for authenticated routes
export const dynamic = 'force-dynamic';

export default async function DecksPage() {
  const session = await getSession();

  if (!session) {
    redirect('/api/auth/login');
  }

  return <DecksPageClient user={session.user} />;
}
