import React from "react";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";

export default function Detail(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    },[dispatch])

    const country = useSelector((state ) => state.detail)
    
     return (
         <div>
            {country && Object.keys(country).length>0 ?  
            <div><br/>
                <img src={country.flag} flag="" width="200px" height="100px"/>
                <h3>{country.name}</h3> 
                <h4>ID: {country.id}</h4>
                <h4>Continente: {country.continent}</h4>
                <h4>Capital: {country.capital}</h4>
                <h4>Sub Region {country.subRegion}</h4>
                <h4>Area: {country.area} km2</h4>
                <h3>Tiene: {country.population} de habitantes</h3>
                <h3>Actividades Turisticas : <br/> {country.activities.length > 0 ? country.activities.map((n) => n.name) : <p>No hay actividades</p>}</h3>
                </div>
            :
            <p> "Cargando"</p>}

            <Link to="/home">
                <button>Volver</button>
            </Link>
        </div>
     )
}