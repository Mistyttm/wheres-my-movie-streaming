import React, { useEffect, useState } from "react";
import axios from "axios";

interface MovieData {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: string;
    budget: number;
    genres: string[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: string[];
    production_countries: string[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: string[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

function App() {
    const [movie, setMovie] = useState<MovieData>({});
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
                Object.keys(movie).map((key) => (
                    <p key={key}>
                        {key}: {movie[key]}
                    </p>
                ))
            )}
        </div>
    );
}

export default App;
