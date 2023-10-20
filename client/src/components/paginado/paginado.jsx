import React, {useState} from "react";
import './paginado.css'

function Paginado({ driverPage, allDrivers, paginado }) {
    const pageNumber = []
    const [numPage, setNumPage ] = useState(1)

    for (let i = 1; i <= Math.ceil(allDrivers / driverPage); i++) {
        pageNumber.push(i)
    }


    const handleChangePag = (num) => {
        setNumPage(num)
        paginado(num)
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }
    return (
        <>
        <p className="paginado-title">Page {numPage} de {pageNumber?.length}</p>
        <ul className="paginado">
            {
                pageNumber && pageNumber.map(number => (
                    <li key={number}>
                        <button className="number" onClick={() => handleChangePag(number)}>{number}</button>
                    </li>
                    ))
                }
        </ul>
                </>
    )
}

export default Paginado;