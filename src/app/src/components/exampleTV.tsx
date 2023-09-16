import { MediaData } from "../types/MediaData";
import { useEffect, useState } from "react";
import axios from "axios";
import Services from "./services";

export default function ExampleTV() {
    const [movie, setMovie] = useState<MediaData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get<MediaData>(
                    "/api/tv/tvDetails/1396"
                );
                if (response.data.error) {
                    // Handle 404 error here
                    fetchMovie();
                } else {
                    setMovie(response.data);
                }
            } catch (error) {
                // Handle any other errors here
                console.error("Error fetching tv data", error);
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
                                    {typeof movie[key as keyof MediaData] ===
                                        "object" &&
                                    movie[key as keyof MediaData] !== null
                                        ? JSON.stringify(
                                              movie[key as keyof MediaData]
                                          )
                                        : `${movie[key as keyof MediaData]}`}
                                </div>
                            ))}
                            <Services option="tv" id={movie.id} />
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            )}
        </div>
    );
}
