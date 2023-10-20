import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from '../searchbar/SearchBar'
import Card from '../card/Card'
import Paginado from "../paginado/paginado";
import { getDrivers, getTeams } from "../../redux/actions";
import './home.css'


const HomePage = () => {
    const [change, setChange] = useState(0)
    const dispatch = useDispatch();
    const allDrivers = useSelector((state) => state.drivers)
    const teams = useSelector((state) => state.teams)
    

    const defaultImg = 'https://ideogram.ai/api/images/direct/ZBmG4WOYQLSSaWxa2gFutQ'

    useEffect(() => {
        dispatch(getDrivers());
        dispatch(getTeams())
    }, [dispatch])
    const [currentPage, setCurrentPage] = useState(1)
    const [driverPage] = useState(9)

    const lastDriver = currentPage * driverPage
    const firstDriver = lastDriver - driverPage

    let currentDriver = allDrivers.slice(firstDriver, lastDriver)
    
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }    
    // const Loader = () => {
    //     return (
    //         <div className="box-loader">
    //             <img src="https://cdn.dribbble.com/users/3213828/screenshots/6612869/mclarenf1800x600.gif" className="spinner"/>
    //         </div>
    //     )
        
    // }
    const refreshState = () => {
        dispatch(getDrivers())
    }

    const NoDrivers = () => {
        return (
        <div className="positionBtnContainer">
            <button className="btnNoDriver" onClick={refreshState}>
                        <img width="50" height="50" src="https://img.icons8.com/sf-black-filled/64/left.png" alt="left"/>
            </button>
            
            <div className="container-noDriver">
                <img className="imgNoDriver" src="https://ideogram.ai/api/images/direct/HQOn0SSITSq3htYnpwfwdQ" width={'800px'} alt="" />
                <h1 className="h1NoDriver">There are no records</h1>
            </div>
        </div>
        )
    }
    return (
        <div className="container-home" >
            <SearchBar setCurrentPage={setCurrentPage} dispatch={dispatch} teams={teams} change={change} setChange={setChange}/>
    
            <div className='container-cards'> 
      
                {
                    currentDriver.length > 0 ?  currentDriver?.map(elemento => {
                        return (
                            <div key={elemento.id}> 
                            <Link className='link' to={`/detail/${elemento.id}`}>
                                <Card
                                name={elemento.name}
                                lastName={elemento.lastName}
                                image={elemento.image ? elemento.image : defaultImg}
                                teams={elemento.teams}
                                elemento={elemento}
                                />
                            </Link>
                            </div>
                        )
                    }) : ( <NoDrivers/>)
                    
                }
            </div>

            <Paginado className="paginado"
                driverPage={driverPage}
                allDrivers={allDrivers.length}
                paginado={paginado}
            />
        </div>
    )
}
export default HomePage;