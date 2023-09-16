import { useEffect, useState } from "react";
import { ServicesProps } from "../types/ServicesProps.ts";
import axios from "axios";
import { ServiceData } from "../types/ServiceData.ts";

export default function Services(props: ServicesProps) {
    const [country, setCountry] = useState<string>("");
    const [service, setService] = useState<ServiceData | null>(null);

    const serviceCall = (id: number, location: string) => {
        axios
            .get(`/api/services/${props.option}?id=${id}`)
            .then((response) => {
                setService(response.data[location]);
                console.log(service);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        axios.get(`/api/ip`).then(
            (response) => {
                setCountry(response.data.country);
            },
            (error) => {
                console.log(error);
            }
        );
    });
    serviceCall(props.id, country);
    return (
        <div>
            <h1>Services</h1>
            {props.option === "movie" ? <h1>Movie</h1> : <h1>TV</h1>}
        </div>
    );
}
