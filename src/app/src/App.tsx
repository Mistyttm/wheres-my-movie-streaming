import { useEffect, useState } from "react";
import axios from "axios";
import { MovieData } from "./interfaces/MovieData";

function App() {
    const [movie, setMovie] = useState<MovieData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get<MovieData>(
                    "http://127.0.0.1:5001/api/movies/randomMovie"
                );
                if (response.data.error) {
                    // Handle 404 error here
                    console.error("Movie not found");
                    fetchMovie();
                } else {
                    setMovie(response.data);
                }
            } catch (error) {
                // Handle any other errors here
                console.error("Error fetching movie data", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovie();
    }, []);

    return (
        <div className="App">
            <h1 className="text-3xl font-bold underline">Movie Randomizer</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {movie ? (
                        Object.keys(movie).map((key) => (
                            <div key={key}>
                                <strong>{key}:</strong>{" "}
                                {typeof movie[key] === "object" &&
                                movie[key] !== null
                                    ? JSON.stringify(movie[key])
                                    : (movie[key] as string)}
                            </div>
                        ))
                    ) : (
                        <p>No movie data available.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
