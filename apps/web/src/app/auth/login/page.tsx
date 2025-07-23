import { SignIn } from "@stackframe/stack";
import Link from "next/link";
import { useStackApp } from "@stackframe/stack";
import { useRouter } from "next/router";

const LoginPage = () => {
  const app = useStackApp();
  const user = app.useUser();
  const router = useRouter();

  if (user === null) {
    console.warn("User is null, redirecting to login page");
    router.push("/auth/login");
  } else if (user === undefined) {
    console.warn("User state is undefined, redirecting to loading page");
    router.push("/auth/loading");
  } else {
    router.push("/dashboard/home");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back
          </h1>
          <p className="text-gray-600">
            Sign in to your account to continue
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <SignIn />
          
          {/* Divider */}
          <div className="mt-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Don&apos;t have an account?
                </span>
              </div>
            </div>
            
            <div className="mt-4">
              <Link 
                href="/auth/register"
                className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors"
              >
                Create your account
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            By signing in, you agree to our{' '}
            <Link href="/terms" className="text-indigo-600 hover:text-indigo-500">
              Terms of Service
            </Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-indigo-600 hover:text-indigo-500">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;