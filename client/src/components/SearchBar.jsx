import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getSearchCountries } from "../actions";

export default function SearchBar() {
    const dispatch = useDispatch()
    const [name, setName] = useState("")
   
    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getSearchCountries(name))
    }

    return(
        <div>
            <input
            type="text"
            placeholder="Buscar pais..."
            onChange={(e) => handleInputChange(e)}
            />
            <button type="submit" onClick={(e) => handleSubmit(e)} >Buscar</button>
        </div>
    )

}