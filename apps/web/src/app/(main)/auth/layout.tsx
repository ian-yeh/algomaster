"use client";

function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="">
      <div className="">
        {children}
      </div>
    </div>
  )
}

export default AuthLayout;