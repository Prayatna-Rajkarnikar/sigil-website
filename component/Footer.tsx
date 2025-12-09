import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white px-8 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900">Company</h3>
            <div className="space-y-2">
              <Link
                href="/about"
                className="block text-gray-600 hover:text-gray-900"
              >
                About Us
              </Link>
              <Link
                href="/team"
                className="block text-gray-600 hover:text-gray-900"
              >
                Team
              </Link>
              <Link
                href="/careers"
                className="block text-gray-600 hover:text-gray-900"
              >
                Careers
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900">Resources</h3>
            <div className="space-y-2">
              <Link
                href="/blog"
                className="block text-gray-600 hover:text-gray-900"
              >
                Blog
              </Link>
              <Link
                href="/docs"
                className="block text-gray-600 hover:text-gray-900"
              >
                Documentation
              </Link>
              <Link
                href="/support"
                className="block text-gray-600 hover:text-gray-900"
              >
                Support
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900">Legal</h3>
            <div className="space-y-2">
              <Link
                href="/privacy"
                className="block text-gray-600 hover:text-gray-900"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="block text-gray-600 hover:text-gray-900"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-gray-600">
          © 2024 Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
