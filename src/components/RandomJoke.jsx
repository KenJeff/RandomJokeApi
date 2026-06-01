import { useEffect } from "react";
import { useState } from "react";

export default function RandomJoke() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJoke();
  }, []);

  async function fetchJoke() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke",
      );
      if (!response.ok) {
        throw new Error("Failed to fetch joke");
      }
      const data = await response.json();
      setJoke(data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Random Joke</h1>

      <button onClick={fetchJoke}>New Joke</button>

      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong</p>}

      {joke && (
        <>
          <h2>{joke.setup}</h2>
          <p>{joke.punchline}</p>
        </>
      )}
    </div>
  );
}
