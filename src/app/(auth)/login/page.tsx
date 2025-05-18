import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}