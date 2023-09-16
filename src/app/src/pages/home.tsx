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
        <div>
            <Link to="/movie">Movie</Link> 
            <Link to="/tv">TV</Link>
            <Link to="/example?show=movie">Example Movie</Link>
            <Link to="/example?show=tv">Example TV</Link>
        </div>
    )
}

export default App;
