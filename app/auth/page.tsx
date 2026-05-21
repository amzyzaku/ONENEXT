import AuthForm from "@/app/components/AuthForm";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="text-3xl font-extrabold tracking-tight text-indigo-600">
            ONE<span className="text-gray-900">NEXT</span>
          </a>
          <p className="text-gray-500 mt-2 text-sm">Your one-stop premium shopping destination</p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}
