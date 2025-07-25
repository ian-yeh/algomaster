"use client";

function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        {children}
      </div>
    </div>
  )
}

export default AuthLayout;