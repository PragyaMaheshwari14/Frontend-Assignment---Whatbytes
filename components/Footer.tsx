import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-accent-900 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-start sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="text-lg font-bold">Cacyroy</p>
          <p className="mt-1 text-sm text-accent-200">
            &copy; {year} Cacyroy. All rights reserved.
          </p>
        </div>

        <nav className="flex flex-col gap-2 text-sm text-accent-100">
            <h3 className="text-md font-bold text-white">About Us</h3>
          <Link href="/" className="transition hover:text-white">
            Home
          </Link>
          <Link href="/cart" className="transition hover:text-white">
            Cart
          </Link>
        </nav>

        <div className="flex flex-col items-start gap-2">
          <h3 className="text-md font-bold">Follow Us</h3>
          <div className="flex items-center gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-accent-700 transition hover:bg-accent-600 bg-accent-500"
            >
              <FaFacebookF className="h-4 w-4 text-white" />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-accent-700 transition hover:bg-accent-600 bg-accent-500"
            >
               <FaTwitter className="h-4 w-4 text-white" />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-accent-700 transition hover:bg-accent-600 bg-accent-500"
            >
              <FaInstagram className="h-4 w-4 text-white" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}