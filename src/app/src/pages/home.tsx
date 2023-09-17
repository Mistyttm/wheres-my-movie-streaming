import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

axios.get("/api/aws/visit");

function App() {
    const [count, setCount] = useState<number>(0);
    useEffect(() => {
        axios.get("/api/aws/read").then(
            (response) => {
                setCount(response.data.data.count);
                console.log(count);
            },
            (error) => {
                console.log(error);
            }
        ).catch((error) => {console.log(error)});
    });
    return(
        <div className="m-24">
            <h1 className="m-24 font-bold text-6xl">Movie or TV Show Randomiser!</h1>
            <Link to="/movie" className="text-4xl mx-8 text-white underline font-bold p-8 bg-orange-700 hover:bg-red-500 rounded-3xl">Movie</Link> 
            <Link to="/tv" className="text-4xl mx-8 text-white underline font-bold p-8 bg-lime-400 hover:bg-red-500 rounded-3xl">TV</Link>
            <Link to="/example?show=movie" className="text-4xl mx-8 text-white underline font-bold p-8 bg-cyan-900 hover:bg-red-500 rounded-3xl">Example Movie</Link>
            <Link to="/example?show=tv" className="text-4xl mx-8 text-white underline font-bold p-8 bg-violet-900 hover:bg-red-500 rounded-3xl">Example TV</Link>
        </div>
    )
}

export default App;
