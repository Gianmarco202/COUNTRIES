import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { filterCountries, getCountries, orderCountry } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Cards";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";


export default function Home(){

    
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCountries());
    },[dispatch])
    const allCountries = useSelector((state) => state.countries)
    const [order, SetOrder] = useState('')    
    const [currentPage, setCurentPage] = useState(1)
    const [countriesPorPage, setCountriesPorPage] = useState(10)
    const lastCountries = currentPage * countriesPorPage
    const firstCountries = lastCountries - countriesPorPage
    const currentCountries = allCountries.slice(firstCountries,lastCountries)

    const paginado = (pageNumber) => {
        setCurentPage(pageNumber)
    }
  


    function handleClick(e) {
        e.preventDefault();
        dispatch(getCountries());
    }

    function handleSort(e) {
        e.preventDefault();
        dispatch(orderCountry(e.target.value))
        setCurentPage(1);
        SetOrder(`Ordenado ${e.target.value}`)
    }

    function filterContinent(e) {
        dispatch(filterCountries(e.target.value))
    }

    return (
      <div>
        <Link to='/activity'>CREAR ACTIVIDAD</Link>
        <h1>AGUANTE</h1>
        <button onClick={ e => {handleClick(e)}}>
            Volver cargar    
        </button>
        <div>
            <select onChange={e => handleSort(e)}> 
                <option value='asc'>Ascendente</option>
                <option value='des'>Descendente</option>
            </select>
            <select onChange={e => filterContinent(e)}>
            <option value='All'>Todos</option>
                <option value='Africa'>Africa</option>
                <option value='Europe'>Europa</option>
                <option value='Asia'>Asia</option>
                <option value='Oceania'>Oceania</option>
                <option value='Americas'>America</option>
                <option value='Antarctic'>Antartida</option>
                <option>Actividad turistica</option>
            </select>
            <SearchBar/>
            <hr/>
            <Paginado 
            countriesPorPage={countriesPorPage}
            allCountries={allCountries.length}
            paginado= {paginado}
            />

        {    

            currentCountries?.map( (el) => {
                return (
                <React.Fragment key={el.id}>
                  <Link to={"/home/" + el.id}>
                    <Card flag={el.flag} name={el.name} continent={el.continent} key={el.id}/>
                  </Link>
                </React.Fragment>
            )}
            )}
        </div> 
      </div>

    )
}