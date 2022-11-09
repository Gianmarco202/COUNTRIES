import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { filterCountries, getCountries, orderCountry, getActivities, getActivityById } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Cards";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import "./Home.css"


export default function Home(){

    
    const dispatch = useDispatch()


    const allCountries = useSelector((state) => state.countries)
    const activityDetail = useSelector((state) => state.activityDetail)
    const activities = useSelector((state) => state.activities)
    const [order, SetOrder] = useState('')    
    const [currentPage, setCurentPage] = useState(1)
    const [countriesPorPage, setCountriesPorPage] = useState(10)
    const lastCountries = currentPage * countriesPorPage
    const firstCountries = lastCountries - countriesPorPage
    const [input,setInput] = useState({
        activity:[]
    })
    const [countries, setCountries] = useState([])
    //const currentCountries = countries?.slice(firstCountries,lastCountries)

    useEffect(() => {
        dispatch(getCountries());
        dispatch(getActivities())
    },[])

    useEffect(() => {
        if (allCountries && allCountries.length > 0) {
            setCountries(allCountries)
        }
    }, [allCountries])

    useEffect(() => {
        console.log(activityDetail, 'activityDetail')
        if (activityDetail && Object.keys(activityDetail).length > 0) {
            setCountries(activityDetail.countries)
        }
    }, [activityDetail])

    const format = (countries) => countries?.slice(firstCountries,lastCountries)

    const paginado = (pageNumber) => {
        setCurentPage(pageNumber)
    }

    function handleClick(e) {
        e.preventDefault();
        dispatch(getCountries());
    }

    function handleSort(e) {
        e.preventDefault();
        console.log('execution', e.target.value)
        dispatch(orderCountry(e.target.value))
        setCurentPage(1);
        SetOrder(`Ordenado ${e.target.value}`)
    }

    function filterContinent(e) {
        dispatch(filterCountries(e.target.value))
    }
    
    function handleSelect(e) {
        dispatch(getActivityById(e.target.value))
    }

    return (
      <div className="home">
        <h1 className="paises">PAISES</h1>
      <div className="navbar">
        <Link className="create" to='/activity'>CREAR ACTIVIDAD</Link>
        <div >
        
            <Link className="inicio" onClick={handleClick}>Inicio</Link>
                
            
            </div> 
            <p>Contactos</p>
        </div>
        <div className="select">
            <select className="selectOrd" onChange={e => handleSort(e)}> 
                <option>Ordenar por</option>
                <option value='asc'>Alfabetico A-Z</option>
                <option value='des'>Alfabetico Z-A</option>
                <option value='population+-'>Poblacion +-</option>
                <option value='population-+'>Poblacion -+</option>
            </select>

            <select className="selectCont" onChange={e => filterContinent(e)}>
            <option value='All'>Todos</option>
                <option value='Africa'>Africa</option>
                <option value='Americas'>America</option>
                <option value='Antarctic'>Antartida</option>
                <option value='Asia'>Asia</option>
                <option value='Europe'>Europa</option>
                <option value='Oceania'>Oceania</option>
            </select>
            <select className="selectAct" onChange={ e => handleSelect(e)}>
                <option>Seleccione</option>
                
                {activities?.map((act) =>( 
                    <option key={act.id} value={act.id}>{act.name}</option>
                    
                    ))}
            </select>
        </div>
        
            <SearchBar/>
           
            
            <Paginado 
            countriesPorPage={countriesPorPage}
            allCountries={countries?.length}
            paginado= {paginado}
            />
            {console.log(countries, 'countries')}

        <div className="box">
        {    
            
            format(countries).map( (el) => {
                

                return (
                    <React.Fragment  key={el.id}>
                  <Link className="link" to={`/detail/${el.id}`}>
                    <div className="box-countries">
                    <Card flag={el.flag} name={el.name} continent={el.continent}  key={el.id} />
                    </div>
                  </Link>
                </React.Fragment>
            )}
            )}
        </div>
      </div>

    )
}