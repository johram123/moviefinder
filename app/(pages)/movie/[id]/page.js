"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function MoviePage() {
  const params = useParams();
  const id = params.id;
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    if (id) {
      fetchMovieDetails(id);
    }
  }, [id]);

  async function fetchMovieDetails(id) {
    try {
      const res = await fetch(`/api/details?id=${id}`);
      const data = await res.json();
      setMovie(data);

      if (data.similar_titles?.length) {
        const responses = await Promise.all(
          data.similar_titles.map(async (similarId) => {
            const response = await fetch(`/api/details?id=${similarId}`);
            return await response.json();
          })
        );
        setSimilarMovies(responses);
      }
    } catch (err) {
      console.error("Failed to fetch movie or similar movies:", err);
    }
  }

  if (!movie)
    return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <div className="w-screen min-h-screen px-6 py-10 flex flex-col items-center text-white bg-gradient-to-br from-black via-neutral-900 to-zinc-800">
      <div className="w-full max-w-4xl flex justify-start mb-4">
        <Link
          href="/browse"
          className="text-white/80 text-sm px-4 py-2 bg-white/10 border border-white/20 rounded-lg backdrop-blur hover:bg-white/20 transition"
        >
          ← Back to Search
        </Link>
      </div>

      <div className="w-full max-w-4xl bg-white/10 backdrop-blur rounded-xl p-8 border border-white/20 shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">{movie.title}</h1>

        <div className="flex flex-col md:flex-row gap-6 items-center">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-64 h-96 object-cover rounded-lg shadow-md border border-white/20"
          />

          <div className="flex-1 text-white/90 space-y-4">
            <p className="text-sm">{movie.plot_overview}</p>

            <div className="text-sm">
              <p className="font-medium">Release Date:</p>
              <p>{movie.release_date}</p>
            </div>

            <div className="text-sm">
              <p className="font-medium">Genres:</p>
              <p>{movie.genre_names?.join(", ") || "N/A"}</p>
            </div>

            {movie.trailer && (
              <a
                href={movie.trailer}
                target="_blank"
                className="inline-block mt-2 px-4 py-2 bg-white/20 text-white text-sm rounded-lg backdrop-blur border border-white/30 hover:bg-white/30 transition"
              >
                Watch Trailer on YouTube
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-white text-center">
          Similar Movies
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {similarMovies.length === 0 ? (
            <p className="text-white/60 italic">No similar movies found.</p>
          ) : (
            similarMovies.map((similar) => (
              <Link key={similar.id} href={`/movie/${similar.id}`}>
                <div className="w-40 bg-white/10 backdrop-blur p-3 rounded-xl border border-white/20 shadow-md hover:bg-white/20 transition duration-200 cursor-pointer">
                  <img
                    src={similar.poster}
                    alt={similar.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <h3 className="text-sm text-center font-medium mt-2">
                    {similar.title}
                  </h3>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
