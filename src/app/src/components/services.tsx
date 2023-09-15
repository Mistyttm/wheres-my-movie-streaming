import { useEffect, useState } from "react";
import { ServicesProps } from "../interfaces/ServicesProps.ts";
import axios from "axios";

export default function Services(props: ServicesProps) {
    const [ip, setIp] = useState<string>("");
    console.log(ip);

    useEffect(() => {
        axios.get("http://127.0.0.1:5001/api/ip").then(
            (response) => {
                setIp(response.data.ip);
            },
            (error) => {
                console.log(error);
            }
        );
    });

    return (
        <div>
            <h1>Services</h1>
            {props.option === "movie" ? <h1>Movie</h1> : <h1>TV</h1>}
        </div>
    );
}
