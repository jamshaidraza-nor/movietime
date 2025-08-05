import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const apiKey = import.meta.env.VITE_API
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  let today = new Date()

  console.log(today.getFullYear())
  useEffect(() => {
    const getMovies = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
      );
      setMovies(res.data.results);
      console.log(res.data.results);
    };
    getMovies();
  }, []);

  // Sort movies by release date (descending) and take top 3
  const recentMovies = [...movies]
    .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
    .slice(0, 7);

  // Filter movies based on search term
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );  

  // If no movies found, show a message
  return (
    <>
      
      {/* Recent Movies Section */}
        <div className="mb-10">
          <div className="text-4xl font-semibold my-5 text-center">Recent Movies</div>
          <div className="flex justify-center gap-4">
            {recentMovies.map((movie) => (
              <div key={movie.id} className="w-40 p-2 rounded-lg shadow">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <div className="text-sm font-bold">{movie.title}</div>
                <div className="text-xs text-gray-500">{movie.release_date}</div>
              </div>
            ))}
          </div>
        </div>
        <hr className="text-gray-200"/>
        <div className=" text-center mt-5">
        <div className="text-3xl  mb-4 font-bold">Search more Videos...</div>
        <div>
          {" "}
          <input
            type="text"
            placeholder="Search Movie here."
            className="border p-2 mt-1 w-[500px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className=" p-4 rounded-lg shadow-lg">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-90 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
            <p className="text-gray-600">
              {movie.overview.length > 100
                ? movie.overview.slice(0, 100)
                : movie.overview}
            </p>
            <p className="text-gray-500 mt-2">Rating: {movie.vote_average}</p>
            <p className="text-gray-500">Release Date: {movie.release_date}</p>
          </div>
        ))}
      </div>
      <div className="text-center my-5 text-gray-500">
        copyright &copy; 2025, All rights reserved.
      </div>
    </>
  );
}

export default App;
