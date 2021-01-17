import React from 'react';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

function minmaxTemp(min, max) {
    return (
        <h3>
            <span className="px-4">{min}&deg;</span>
            <span className="px-4">{max}&deg;</span>
        </h3>
    )
}

export default function WeatherCity({ setType }) {
    let [selectedValue, setSelectedValue] = useState("");

    useEffect(() => {
        let lastCalled = true;
        const fetchTypes = () => {
            fetch("api.openweathermap.org/data/2.5/weather?q=London&appid={API_key}")
                .then((response) => response.json())
                .then((data) => lastCalled && setTypes(data["results"]));
        };
        fetchTypes();
        return () => {
            lastCalled = false;
        };
    }, []);

    const handleSelection = (event) => {
        setType(event.target.value);
        setSelectedValue(event.target.value);
    };

    return (

        <select value={selectedValue} onChange={handleSelection}>
            <div className="container">
                <div className="cards">
                    <h1>London</h1>
                    <h5 className="py-4">
                        <FontAwesomeIcon icon={faHome} />
                    </h5>
                    <h1 className="py-2">25&deg;</h1>
                    {/** montre la temperature minimale et maximale */}
                    {minmaxTemp(19, 24)}
                    <h4 className="py-3">Slow Rain</h4>
                </div>
            </div> 
        </select>

    );
}