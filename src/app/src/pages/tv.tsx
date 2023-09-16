import { useEffect, useState } from "react";
import axios from "axios";
import { MovieData } from "../types/MediaData";

function Tv() {
    const [movie, setMovie] = useState<MovieData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get<MovieData>(
                    "/api/movies/randomMovie"
                );
                if (response.data.error) {
                    // Handle 404 error here
                    console.error("Movie not found");
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
                        <div>
                            {Object.keys(movie).map((key) => (
                                <div key={key}>
                                    <strong>{key}:</strong>{" "}
                                    {typeof movie[key as keyof MovieData] ===
                                        "object" &&
                                    movie[key as keyof MovieData] !== null
                                        ? JSON.stringify(
                                              movie[key as keyof MovieData]
                                          )
                                        : `${movie[key as keyof MovieData]}`}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No movie data available.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Tv;