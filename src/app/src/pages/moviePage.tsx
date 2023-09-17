import Movie from "../components/movie";
import { Link } from "react-router-dom";

function MoviePage() {

    return (
        <div className="flex flex-col items-center justify-center h-screen px-80">
            <h1 className="text-3xl font-bold underline">Movie Randomizer</h1>
            <Movie />
            <Link to="/">
                <h1 className="text-3xl font-bold underline">Home</h1>
            </Link>
        </div>
    );
}

export default MoviePage;
