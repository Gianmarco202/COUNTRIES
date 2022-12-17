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

    const [error, setError] = useState({
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        
    }

    const validate = () => {
        let error = {};
        let regexName = /^[a-zA-Z ]+$/;
        let regexDifficulty = /^[1-5]+$/;

        if(!input.name.trim()){
            error.name ="El campo 'Nombre' es requerido";
        }else if(!regexName.test(input.name.trim())){
            error.name = "Solo se acepta letras"
        }

        if(!input.difficulty.trim()){
            error.difficulty ="El campo '' es requerido";
        }else if(!regexDifficulty.test(input.difficulty.trim())){
            error.difficulty = "Elija un rango entre 1-5"
        }

        if(!input.duration.trim()){
            error.duration ="El campo ''Duracion' debe ser en hrs"
        }

        if(!input.season.trim()){
            error.season ="El campo 'Temporada' es requerido"
        }
        return error;
        
     } 

    let styles = {
        fontWeight: "bold",
        color:"#dc3545"
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

    const handleBlur = (e) => {
        handleChange(e)
        setError(validate(input))
    }

    function handleSubmit(e){
        e.preventDefault();
        setError(validate(input))
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

                <div  id="grupo-name" >
                    <label  for="name">Nombre:</label>
                  <div className="formulario-input">
                    <input type='text' value={input.name} name='name' id="name" placeholder="Nombre" onBlur={handleBlur} onChange={handleChange} required/>
                  </div>
                  {error.name && <p style={styles}>{error.name}</p>}
                </div>
                <br/>

                <div  id="grupo-difficulty">
                    <label for="difficulty">Dificultad:</label>
                  <div>
                    <input  type='number' value={input.difficulty} id="difficulty" name='difficulty' placeholder="Dificultad" onBlur={handleBlur} onChange={handleChange} required ></input>
                  </div>
                  {error.difficulty && <p style={styles}>{error.difficulty}</p>}
                </div>
                <br/>

                <div  id="grupo-duration ">  
                    <label  for="duration">Duracion:</label>
                <div >
                    <input  type='number' value={input.duration} id="duration" name='duration' placeholder="Duración(hrs)" onBlur={handleBlur} onChange={handleChange} required/>
                </div>
                {error.duration && <p style={styles}>{error.duration}</p>}
                </div>
                <br/>

                <div>
                    <label >Temporada:</label>
                    <select onChange={(e) => handleSelect(e,"season")}>
                        <option>----</option>
                        <option value="Verano">Verano</option>
                        <option value="Otoño">Otoño</option>
                        <option value="Invierno">Invierno</option>
                        <option value="Primavera">Primavera</option>
                    </select>
                </div>
                <br/>

                <label>Selecciona el pais(es):</label><br/>
                <select onChange={(e) => handleSelect(e, "countries")}>
                    {countries.map((country) => (
                        <option value={country.name}>{country.name}</option>
                        ))}
                </select>
                <br/>
                <br/>

                <button className="formulario-button" type="submit">Crear</button>
           </div>
            </form>
        </div>
    )

}