import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function App() {
    const [count, setCount] = useState<number>(0);
    axios.get("http://127.0.0.1:5001/api/aws/visit");
    useEffect(() => {
        axios.get("http://127.0.0.1:5001/api/aws/read").then(
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
        </div>
    )
}

export default App;
