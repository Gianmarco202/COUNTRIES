import React from "react";

export default function Card({flag, name, continent, activities}) {
    return (
        <div>
            <img src={flag} alt="img not found" widht="200px" weight="250px"/>
            <h3>{name}</h3>
            <h5>{continent}</h5>
            
        </div>
    )
}