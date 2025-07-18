import { SignUp } from "@stackframe/stack";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create your account
          </h1>
          <p className="text-gray-600">
            Join us today and get started in minutes
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <SignUp />
          
          {/* Divider */}
          <div className="mt-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Already have an account?
                </span>
              </div>
            </div>
            
            <div className="mt-4">
              <Link 
                href="/auth/login"
                className="text-emerald-600 hover:text-emerald-500 font-medium transition-colors"
              >
                Sign in here
              </Link>
            </div>
          </div>
        </div>

        

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            By creating an account, you agree to our{' '}
            <Link href="/terms" className="text-emerald-600 hover:text-emerald-500">
              Terms of Service
            </Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-emerald-600 hover:text-emerald-500">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;