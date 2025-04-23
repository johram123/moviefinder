"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  console.log("Query:", query);
  console.log("Results:", results);
  async function search() {
    const res = await fetch(`/api/search?query=${query}`);
    const data = await res.json();
    setResults(data.title_results);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-br from-blue-600 via-blue-900 to-gray-800">
      <div className="flex flex-1 justify-start w-screen">
        <h1 className="text-4xl font-bold ml-9 mt-5">Welcome to MovieDB</h1>
      </div>
      <div className="flex flex-col flex-5 mb-10 mt-10 justify-center items-center w-screen">
        <h1 className="text-2xl ">Search for movies</h1>
        <div className="flex flex-col w-96 h-60 justify-around ">
          <input
            type="text"
            placeholder="Enter a movie"
            className="w-full max-w-md px-4 py-2 rounded-xl border border-white/30 bg-white/10 backdrop-blur text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/60 transition"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button
            onClick={search}
            className="bg-black hover:bg-gray-600 text-white px-4 py-2 rounded w-28 self-center"
          >
            Search
          </button>
        </div>
      </div>

      <div className="flex flex-10 flex-col w-screen justify-around items-center ">
        {results.map((result) => (
          <div
            key={result.id}
            className="flex flex-col w-96 h-28 m-7 items-center justify-center border rounded"
          >
            <h2>{result.name}</h2>
            <Link href={`/movies/${result.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
