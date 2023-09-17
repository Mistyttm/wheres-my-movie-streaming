import { useEffect, useState } from "react";
import { ServicesProps } from "../types/ServicesProps.ts";
import axios from "axios";
import { ServiceData } from "../types/ServiceData.ts";
import { Link } from "react-router-dom";

export default function Services(props: ServicesProps) {
    const [country, setCountry] = useState<string>("");
    const [service, setService] = useState<ServiceData[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        // Fetch the country data
        axios
            .get(`/api/ip`)
            .then((response) => {
                setCountry(response.data.country);
            })
            .catch((error) => {
                console.log(error);
            });
        // Fetch the service data based on props.id and country when they are available
        if (props.id && country) {
            axios
                .get(
                    `/api/services/${props.option}?id=${props.id}`
                )
                .then((response) => {
                    setService(response.data[country]);
                    if (country === "") {
                        setError("No services available in your country");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [country]);

    return (
        <div>
            <div>
                <h1 className="font-bold text-2xl">Streaming Services in {country.toUpperCase()}:</h1>
                {error !== "" || country === "" ? (
                    <h2>
                        There are no streaming services in your country for this
                        show
                    </h2>
                ) : (
                    <div className="flex">
                        {service?.map((s, index) => (
                            <div key={index} className="bg-cyan-800 hover:bg-cyan-300 w-40 mx-8 my-8 p-4 rounded-lg">
                                <Link to={s.link}>
                                    <p>
                                        <strong>Service</strong>: {s.service}
                                    </p>
                                    <p>
                                        <strong>Streaming Type</strong>:{" "}
                                        {s.streamingType}
                                    </p>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
