import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-800 py-8">
      <div className="@container mx-2 sm:mx-8 md:mx-12 lg:mx-14 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link href="/" className="text-xl font-bold">
              Bargain<span className="text-purple-500">Hunt</span>
            </Link>
            <p className="text-sm text-gray-400">
              Compare prices across Amazon and Flipkart to find the best deals
              on your favorite products.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white">
                  Products Listing
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-white">
                  Compare Prices
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-white">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-white">
                  Blogs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} BargainHunt. All rights reserved.</p>
      </div>
    </footer>
  );
}
