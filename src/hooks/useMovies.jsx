import { useEffect, useState } from "react";

const KEY = "41b950a8";
export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function Fetch() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error("Something went wrong.");
        }

        if (data.Response === "False") {
          throw new Error("No Movies were found");
        }
        setMovies(data.Search);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    if (query?.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    // handleClose();
    Fetch();
    return () => {
      controller.abort();
    };
  }, [query]);
  return { movies, loading, error };
}
