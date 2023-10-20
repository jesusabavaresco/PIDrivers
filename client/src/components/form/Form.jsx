import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postDrivers, getTeams } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import './form.css';


function CreateDrivers() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const teams = useSelector((state) => state.teams)
    const [modal, setModal] = useState(false);
    const [errors, setErrors] = useState({});
    
    const [input, setInput] = useState({
        name: "",
        lastName: "",
        description: "",
        image: "",
        nationality: "",
        birthDate: "",
        teams: []
    });

    useEffect(() => {
        dispatch(getTeams())
    }, [dispatch]);

    function handleChange(e) {

        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    function handleselect(e) {
        setInput({
            ...input,
            teams: [...input.teams, e.target.value]
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(postDrivers(input)).then((response) => {
            setModal(true)
            setTimeout(() => {
                setModal(false)
                navigate("/home")
                
            }, 3000);
        })
        setInput({
            name: "",
            lastName: "",
            description: "",
            image: "",
            nationality: "",
            birthDate: "",
            teams: []
        })
    }

    

    function validate(input) {
        let errors = {}
        if (!input.name.length) {
            errors.name = "Campo Obligatorio"
        } 
        if (input.name.length < 3 && input.name.length >= 1) {
            errors.name = "El nombre debe tener al menos 3 caracteres"
        } 
        if(input.name.length > 12){
            errors.name = "El nombre debe es demasido largo" 
        }
      
        if (!input.lastName.length) {
            errors.lastName = "Campo Obligatorio"
        } 
        if (!input.description.length) {
            errors.description = "Campo Obligatorio"
        } 
        if (!input.nationality.length) {
            errors.nationality = "Campo Obligatorio"
        } 
            return errors;
        
    };
    
    
    return (
        <div className="top">
            <div className="positionBtn">
                <Link to="/home"><button className="btnHome"><img width="30" height="25" src="https://img.icons8.com/sf-black-filled/64/left.png" alt="left"/></button></Link>
            </div>
            <div className="box-logo-left">
                <img className="img-logo-left" src='https://cdn.dribbble.com/userupload/3677650/file/original-4374b34380c841635fb7d51affcd3224.png?resize=1024x768' alt="car image" />
            </div>
            <div className="box-form-right">

             <form className="form" onSubmit={(e) => handleSubmit(e)}>
                <div className="detail-box-title">
                <h1 className="title-create">Create Drivers</h1>
                </div>
                <div className="cont">
                    <p className="titleInput">Name</p>
                    <input className="controls"
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={(e) => { handleChange(e) }}
                    />
                    {errors.name && (
                        <p className="error" >{errors.name}</p>
                        )}
                </div>
                <div className="cont">
                        <p className="titleInput">Last Name</p>
                        <input className="controls"
                            type="text"
                            value={input.lastName}
                            name="lastName"
                            onChange={(e) => handleChange(e)}
                            
                        />
                        {errors.lastName && (
                            <p className="error" >{errors.lastName}</p>
                            )}
                </div>
                    <div className="cont">
                        <p className="titleInput">Description</p>
                        <input className="controls"
                        type="text"
                        value={input.description}
                        name="description"
                        onChange={(e) => handleChange(e)}
                        />
                        {errors.description && (
                            <p className="error" >{errors.description}</p>
                            )}
                    </div>
                    <div className="cont">
                    <p className="titleInput">Date of Birth</p>
                    <input className="controls"
                        type="Date"
                        value={input.birthDate}
                        name="birthDate"
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.released && (
                        <p className="error" >{errors.birthDate}</p>
                        )}
                    <div className="cont">
                    <p className="titleInput">Image</p>
                    <input className="controls"
                        type="text"
                        value={input.image}
                        name="image"
                        onChange={(e) => handleChange(e)}
                    />
                    </div>
                    <div className="cont">
                    <p className="titleInput">Nationality</p>
                    <input className="controls"
                        type="text"
                        value={input.nationality}
                        name="nationality"
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.nationality && (
                        <p className="error" >{errors.nationality}</p>
                        )}
                    </div>
                    </div>
                    <div>
                        <p className="titleInput">Teams</p>
                    <select className="select" onChange={(e) => handleselect(e)}>
                  
                    {teams.map((f, i) => (
                        <option key={i} value={f.name}>{f.name}</option>
                        ))}
                    </select>
                    {errors.teams && (
                        <p className="error" >{errors.teams}</p>
                        )}
                    </div>
                    <div className="btn-form">
                    <button className="btn-one" disabled={input.name.length === 0 && input.name.length < 3 && input.name.length > 12 || input.lastName.length === 0 || input.description.length === 0 || input.teams.length === 0 || input.nationality.length === 0 }  type="submit" >Create Driver</button>
                    </div>
            { modal && (
                <div id="ventanaModal" className="modal-S">
                    <div className="modalContent">
                        <h2>Created succesfully</h2>
                        <img width="150" height="150" src="https://img.icons8.com/emoji/96/check-mark-button-emoji.png" alt="check-mark-button-emoji"/>
                    </div>
                </div>
            )}
            </form> 
            </div>
            <ul className="render">
                {input.teams.map((el, i) =>
                    <div key={i}>
                        <li>{el}</li>
                    </div>
                )}
            </ul>
        </div >
    )

}

export default CreateDrivers;