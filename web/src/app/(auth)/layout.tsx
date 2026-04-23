// Auth pages use the root layout (Navbar/Footer are acceptable on auth pages)
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
