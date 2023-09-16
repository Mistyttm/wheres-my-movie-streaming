import { MovieData } from "../types/MediaData";
import { useEffect, useState } from "react";
import axios from "axios";
import Services from "./services";

export default function Movie() {
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
        <div>
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
                            <Services option="movie" id={movie.id} />
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            )}
        </div>
    );
}
