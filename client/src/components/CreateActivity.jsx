import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import { postActivity, getCountries } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import "./CreateActivity.css";

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

    const validate = (e) => {
        const expresiones = {
            nombre: /^[a-zA-Z ]+$/,

        }
        switch(e.target.name) {
            case "name":
                if(expresiones.nombre.test(e.target.value)){

                }else {
                    document.getElementById('grupo-name').classList.add('formulario-incorrecto')
                }
            break;
        }
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
        validate()
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
        <div className="home">
            <Link to='/home'><button>Inicio</button></Link>
           
            <h1>Crear actividad Turistica</h1>

            <form className="form" onSubmit={(e) => handleSubmit(e)}>
            <div>

                <div className="formulario formulario-incorrecto" id="grupo-name" >
                    <label className="formulario-label"  for="name">Nombre:</label>
                  <div className="formulario-input">
                    <input className="formulario_input" type='text' value={input.name} name='name' id="name" placeholder="Nombre" onChange={handleChange}/>
                  </div>
                  <p className="input-error">Debe contener solo letras</p>
                </div>

                <div className="formulario formulario-incorrecto" id="grupo-difficulty">
                    <label className="formulario-label" for="difficulty">Dificultad:</label>
                  <div className="formulario-input">
                    <input className="formulario_input" type='number' value={input.difficulty} id="difficulty" name='difficulty' placeholder="Dificultad" onChange={handleChange} ></input>
                  </div>
                  <p className="input-error">Debe ser entre un rango de 1-5</p>
                </div>

                <div className="formulario formulario-incorrecto" id="grupo-duration ">  
                    <label className="formulario-label" for="duration">Duracion:</label>
                <div className="formulario-input">
                    <input className="formulario_input" type='number' value={input.duration} id="duration" name='duration' placeholder="Duración(hrs)" onChange={handleChange}/>
                </div>
                  <p className="input-error">Debe ser en horas</p>
                </div>
                <div>
                    <label className="formulario-label">Temporada:</label>
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
                <button className="formulario-button" type="submit">Crear</button>
           </div>
            </form>
        </div>
    )

}