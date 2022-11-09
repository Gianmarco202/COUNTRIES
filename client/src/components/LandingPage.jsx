import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css"

export default function LandingPage(){
    return (
        <div className="landing">
            <div id="fondo">
            <h1> PAISES DEL MUNDO</h1>
            <Link to={"/home"}>
                <button>Ingrese Aqui</button>
            </Link>
            </div>
        </div>
    )
}