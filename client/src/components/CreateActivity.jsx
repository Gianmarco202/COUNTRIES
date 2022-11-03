import React, { useEffect, useState } from "react";
import {Link, useHistory} from 'react-router-dom';
import { postActivity, getCountries } from "../actions";
import { useDispatch, useSelector } from "react-redux";

export default function CreateActivity() {
    const dispatch = useDispatch()
    const countries = useSelector((state) => state.countries)

    const [input, setInput] = useState({
        name:"",
        difficulty:"",
        duration:"",
        season:"",
        countries:[]
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        console.log(input)
    }

    function handleSelect(e, inputName) {
        if(inputName==="countries"){
            setInput({
                ...input,
                countries: [...input.countries, e.target.value]
            })
        }
        if(inputName==="season") {
            setInput({
                ...input,
                season:e.target.value
            })
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postActivity(input))
        alert("Actividad Creada")
        setInput({
            name:"",
            difficulty:"",
            duration:"",
            season:"",
            country:"",
            countries:[]
        })
    }

    
    useEffect(() => {
        dispatch(getCountries());
    }, []);

    return (
        <div>
            <Link to='/home'><button>Volver</button></Link>
            <h1>Crear actividad Turistica</h1>

            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Nombre:</label>
                    <input type='text' value={input.name} name='name' placeholder="Nombre" onChange={handleChange}/>
                </div>
                <div>
                    <label>Dificultad:</label>
                    <input type='number' value={input.difficulty} name='difficulty' placeholder="Dificultad" onChange={handleChange} ></input>
                </div>
                <div>
                    <label>Duracion:</label>
                    <input type='number' value={input.duration} name='duration' placeholder="Duración(hrs)" onChange={handleChange}/>
                </div>
                <div>
                    <label>Temporada:</label>
                    <select onChange={(e) => handleSelect(e,"season")}>
                        <option>----</option>
                        <option value="Verano">Verano</option>
                        <option value="Otoño">Otoño</option>
                        <option value="Invierno">Invierno</option>
                        <option value="Primavera">Primavera</option>
                    </select>
                </div>
                <label>Selecciona el pais(es):</label><br/>
                <select onChange={(e) => handleSelect(e, "countries")}>
                    {countries.map((country) => (
                        <option value={country.name}>{country.name}</option>
                    ))}
                </select>
                <br></br>
                <button type="submit">Crear</button>
            </form>
        </div>
    )

}