import { useEffect, useState } from "react";
import axios from "axios";
import { MediaData } from "../types/MediaData";

function Tv() {
    const [movie, setMovie] = useState<MediaData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get<MediaData>(
                    "/api/tv/randomShow"
                );
                if (response.data.error) {
                    // Handle 404 error here
                    console.error("Show not found");
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
        <div className="App">
            <h1 className="text-3xl font-bold underline">TV Randomizer</h1>
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
                        </div>
                    ) : (
                        <p>No tv data available.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Tv;
