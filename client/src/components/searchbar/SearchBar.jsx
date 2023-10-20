import React, {useState} from "react";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { searchName, orderName, orderDod, filterTeams, filterCreated, getDrivers, } from "../../redux/actions";
import './searchbar.css'



const SearchBar = ({dispatch, teams, change, setChange}) => {
    const [name, setName] = useState("");
    const [year, setYear] = useState('');
    
 
   function handleSubmit () {
     dispatch(searchName(name))
    };

    function handleOrderName(e) {
        e.preventDefault()
        dispatch(orderName(e.target.value))
        setChange(change + 1)
    }
    function handleOrderDob() {
        dispatch(orderDod(year));
    }
    function handlefilterTeams(e) {
        dispatch(filterTeams(e.target.value))
    }
    function handleFilterCreated(e) {
        dispatch(filterCreated(e.target.value)) 
    }
    
    return (   
        <div className="container">
            <button onClick={() => dispatch(getDrivers())} className="box-title">
                <h1 className="title"><img className="logo" src="https://cdn.dribbble.com/users/16316/screenshots/5263633/media/ac0d3a71670cef4380f660c0c4b0b95a.gif" /></h1>
            </button>
      
            <div className="box-contentFilter">
                <div className="box-filter">
                    <select className="input order" onChange={e => handleOrderName(e)}>
                        <option value="order">Order</option>
                        <option value="asc">A - z</option>
                        <option value="des">Z - a</option>
                    </select>
                </div>
                <div className="box-filter">
                    <select className="input"  onChange={e => handlefilterTeams(e)} >
                        <option value="All">Teams</option>
                            {teams.map((t) => (
                        <option key={t.id} value={t.name}>{t.name}</option>
                            ))}
                    </select>
                </div>
                <div className="box-filter">
                    <select className="input"  onChange={e => handleFilterCreated(e)}>
                            <option value="All">All</option>
                            <option value="api">Existing drivers</option>
                            <option value="created">created drivers</option>
                    </select>
                </div>
            <div className="inputPosition">
                <input className="input-search date" type="text" placeholder="Look Date of Birth..." onChange={(e) => { setYear(e.target.value) }} />
                <button className="btn-searchbar" onClick={handleOrderDob} >Search</button>
            </div>
            </div>
            <div className="inputPosition">
                <input className="input-search" type="text"
                    placeholder="Look any driver here..."
                    onChange={e => setName(e.target.value)}
                />
                <button onClick={handleSubmit} type="submit" className="btn-searchbar">Search</button>
            </div>
            <div>
                <Link to={'/form'}><button className="btn-searchbar create" >Create Driver</button> </Link>
            </div>


        </div>
    )
}
export default SearchBar;