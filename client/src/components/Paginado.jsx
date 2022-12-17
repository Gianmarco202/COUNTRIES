import React from "react";
import "./Paginado.css";

export default function Paginado({countriesPorPage, allCountries, paginado, currentPage}){
    const  pageNumbers = []

    for( let i=1; i<=Math.ceil(allCountries/countriesPorPage); i++) {
        pageNumbers.push(i) 
    }


    return(
      <nav>
        <div className='paginado'>
            {   
                pageNumbers.map((number,index) => {
                     return ( 
                        <button key={index} onClick={() => paginado(number)} className=
                        {number == currentPage ? 'active' : ''} >{number}
                        </button>
                     )
                })}
        </div>
      </nav>
    )
}