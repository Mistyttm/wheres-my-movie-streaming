import { useSearchParams, Link } from "react-router-dom";
import ExampleMovie from "../components/exampleMovie";

function Example() {
    const [searchParams] = useSearchParams();

    const type = searchParams.get("show")
    
    return (
        <div className="App">
            <h1 className="text-3xl font-bold underline">{type} Randomizer</h1>
            {type === "movie" ? <ExampleMovie /> : <h1>TV</h1>}
            <Link to="/">
                <h1 className="text-3xl font-bold underline">Home</h1>
            </Link>
        </div>
    );
}

export default Example;
