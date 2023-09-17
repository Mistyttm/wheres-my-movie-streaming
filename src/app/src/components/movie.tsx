import { MediaData } from "../types/MediaData";
import { useEffect, useState } from "react";
import axios from "axios";
import Services from "./services";

export default function Movie() {
    const [movie, setMovie] = useState<MediaData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get<MediaData>(
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
                        <div className="grid h-screen place-items-center">
                            <h2 className="text-4xl font-bold">
                                {movie.title}
                            </h2>
                            <img
                                src={
                                    "https://image.tmdb.org/t/p/w300_and_h450_bestv2" +
                                    movie.poster_path
                                }
                            />
                            <section><h3 className="font-bold text-2xl">Overview</h3><br />{movie.overview}</section>
                            <section>
                                <h3 className="font-bold text-2xl">General Info</h3>
                                <section><strong>Release Date:</strong> {movie.release_date}</section>
                                <section><strong>Runtime:</strong> {movie.runtime}</section>
                                <section><strong>Votes:</strong> {movie.vote_average}</section>
                            </section>
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
