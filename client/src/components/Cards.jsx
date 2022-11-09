import React from "react";
import "./Cards.jsx"
export default function Card({flag, name, continent, activities}) {
    return (
        <div className="countries">
            <img src={flag} alt="img not found" widht="200px" weight="250px"/>
            <h3>{name}</h3>
            <h5>{continent}</h5>
            <h5>{activities}</h5>
        </div>
    )
}