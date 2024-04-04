import {
  OrganizationProfile,
  SignOutButton,
  useOrganizationList,
  useAuth,
} from '@clerk/nextjs';
import { useEffect } from 'react';

export const clearCookie = (name: string): void => {
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

export const clearAllCookies = (): void => {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.slice(0, eqPos) : cookie;
    clearCookie(name);
  }
};

export default function Home() {
  const { orgId } = useAuth();
  const hasActiveOrg = orgId !== null;
  const { isLoaded, setActive, userMemberships } =
    useOrganizationList({
      userMemberships: {
        infinite: true,
      },
    });

  useEffect(() => {
    if (!isLoaded || !userMemberships.data.length || hasActiveOrg) {
      return;
    }
    // Once the data is loaded, set the active organization to the first organization in the list.
    setActive({
      organization: userMemberships.data[0].organization.id,
    });
  }, [isLoaded, userMemberships.data, hasActiveOrg, setActive]);

  const handleSignOut = async () => {
    localStorage.removeItem('custom-token');
    clearAllCookies();
    window.location.reload();
  };
  return (
    <>
      <header>
        <SignOutButton signOutCallback={handleSignOut}>
          Sign out
        </SignOutButton>{' '}
      </header>
      <OrganizationProfile />
      <div>Your page&apos;s content can go here.</div>
    </>
  );
}
