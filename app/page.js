import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold">Welcome to MovieFind</h1>
        <p className="mt-4 text-lg">
          Your one-stop destination for movies and TV shows.
        </p>
        <Link
          href="/browse"
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Browse Movies
        </Link>
      </div>
    </main>
  );
}
