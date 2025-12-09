import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4">
      <Link href="/" className="text-2xl font-bold text-gray-900">
        Logo
      </Link>
      <div className="flex items-center gap-8">
        <Link href="/about" className="text-gray-600 hover:text-gray-900">
          About Actors
        </Link>
        <Link href="/services" className="text-gray-600 hover:text-gray-900">
          Use Case
        </Link>
        <Link href="/contact" className="text-gray-600 hover:text-gray-900">
          Contact
        </Link>
      </div>
    </nav>
  );
}
