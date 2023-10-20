import { Link } from "react-router-dom"
import { Component } from "react";
import './landing.css'

class Landing extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
        <div className="box">
           <h1 className="landingTitle">Welcome to the F1 Page</h1>
            <Link to='/home'>  
                <button className="btn-landing">See Professionals Drivers</button>
            </Link> 
        </div>
        )
    }
};
export default Landing;