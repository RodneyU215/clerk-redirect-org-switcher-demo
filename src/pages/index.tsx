import {
  OrganizationProfile,
  OrganizationSwitcher,
  SignOutButton,
} from '@clerk/nextjs';

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
      <OrganizationSwitcher />
      <div>Your page&apos;s content can go here.</div>
    </>
  );
}
