import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="border-2 border-red-500 justify-between max-container padding-container relative z-30 py-5">
      <div className="flex items-center gap-2 justify-center flex-1">
        <Link href="/" className="text-2xl font-bold">
          Home
        </Link>
        <Link href="/about" className="text-2xl font-bold">
          About
        </Link>
        <Link href="/services" className="text-2xl font-bold">
          Services
        </Link>
      </div>
    </nav>
  )
}
export default Navbar