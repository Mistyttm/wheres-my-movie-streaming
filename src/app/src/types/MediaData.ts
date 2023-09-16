export type MediaData = {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: string | null;
    budget: number;
    genres: { id: number; name: string }[];
    homepage: string | null;
    id: number;
    imdb_id: string | null;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: {
        id: number;
        logo_path: string | null;
        name: string;
        origin_country: string;
    }[];
    production_countries: { name: string; iso_3166_1: string }[];
    release_date: string;
    revenue: number;
    runtime: number | null;
    spoken_languages: {
        english_name: string;
        iso_3166_1: string;
        name: string;
    }[];
    status: string;
    tagline: string | null;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    error: string;
}