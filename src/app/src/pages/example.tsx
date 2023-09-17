import { useSearchParams, Link } from "react-router-dom";
import ExampleMovie from "../components/exampleMovie";
import ExampleTV from "../components/exampleTV";

function Example() {
    const [searchParams] = useSearchParams();

    const type = searchParams.get("show")
    
    return (
        <div className="flex flex-col items-center justify-center h-screen px-80">
            <h1 className="text-3xl font-bold underline">{type} Randomizer</h1>
            {type === "movie" ? <ExampleMovie /> : <ExampleTV />}
            <Link to="/">
                <h1 className="text-3xl font-bold underline">Home</h1>
            </Link>
        </div>
    );
}

export default Example;
