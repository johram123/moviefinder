"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  console.log("Query:", query);
  console.log("Results:", results);
  async function search() {
    if (!query) {
      alert("Please enter a search term");
      return;
    }
    const res = await fetch(`/api/search?query=${query}`);
    const data = await res.json();
    setResults(data.title_results);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2  bg-gradient-to-br from-black via-neutral-900 to-zinc-800">
      <div className="flex flex-1 justify-start w-screen">
        <h1 className="text-4xl font-bold ml-9 mt-5">Welcome to MovieFind</h1>
      </div>
      <div className="flex flex-col flex-5 mb-10 mt-10 justify-center items-center w-screen">
        <h1 className="text-2xl">Search for movies</h1>

        <div className="flex flex-col w-96 justify-center gap-4 mt-6">
          <input
            type="text"
            placeholder="Enter a movie"
            className="w-full px-4 py-2 rounded-xl border border-white/30 bg-white/10 backdrop-blur text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/60 transition"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button
            onClick={search}
            className="w-24 px-2 py-1.5 text-sm rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-colors duration-200 border border-white/30 backdrop-blur focus:outline-none focus:ring-1 focus:ring-white/50 self-center"
          >
            Search
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center w-screen gap-6 px-4 py-10">
        {results.map((result) => (
          <div
            key={result.id}
            className="w-full max-w-md p-5 rounded-xl bg-white/10 backdrop-blur border border-white/20 shadow-md transition hover:scale-[1.02] hover:bg-white/20 duration-200"
          >
            <h2 className="text-lg font-semibold text-white mb-2 text-center">
              {result.name}
            </h2>
            <div className="text-center">
              <Link
                href={`/movie/${result.id}`}
                className="inline-block px-4 py-1.5 mt-1 text-sm rounded-md bg-white/20 text-white hover:bg-white/30 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
