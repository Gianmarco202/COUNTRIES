import React from "react";
import "./Paginado.css";

export default function Paginado({countriesPorPage, allCountries, paginado}){
    const  pageNumbers = []

    for( let i=1; i<=Math.ceil(allCountries/countriesPorPage); i++) {
        pageNumbers.push(i) 
    }


    return(
      <nav>
        <ul className='paginado'>
            {   pageNumbers&&
                pageNumbers.map(number => (
                    <li className="number" key={number}>
                        <a onClick={() => paginado(number)}>{number}</a>
                    </li>
            ))}
        </ul>
      </nav>
    )
}