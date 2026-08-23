import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center px-4">
      <p className="text-7xl font-bold mb-4">404</p>
      <p className="mb-6 text-gray-400">Page not found</p>
      <Link href="/" className="bg-white text-black px-6 py-3 rounded hover:bg-gray-100 transition">
        Go home
      </Link>
    </div>
  );
}
