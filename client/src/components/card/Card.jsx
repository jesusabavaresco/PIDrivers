import React from "react";
import './card.css'

function Card({ name, lastName, image, teams, elemento }) {
    return (
        <div className="card">
            <h1 className="name">{name + ' ' + lastName}</h1>
            <h3>{elemento?.createdinDb === true ? teams?.map((el) => el.name).join(' , ') : teams}</h3> 
            <img className="img-card" src={image} alt="not found"/>
        </div>
    )
}
export default Card;