import { SignIn } from '@clerk/nextjs';

const SignInPage = () => {
  return (
    <div className="flex justify-center py-24">
      <SignIn />
    </div>
  );
};

export default SignInPage;
