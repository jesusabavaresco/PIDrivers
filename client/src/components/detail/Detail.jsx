import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetail } from "../../redux/actions";
import './detail.css'

const DetailPage = () => {
    const {id} = useParams();
    const [modal, setModal] = useState(false);

    const dispatch = useDispatch()
    const detailDriver = useSelector((state) => state.detail)

    useEffect(() => {
        dispatch(getDetail(id)) 
    }, [dispatch, id])

    const toggle = () => {
        setModal((elemento) => !elemento)
    }
    const defaultImg = 'https://ideogram.ai/api/images/direct/ZBmG4WOYQLSSaWxa2gFutQ'


    return (
        <div className="box-detail">
            <div className="btnPosition">
                <Link to='/home'>
                    <button className="btn-home">
                        <img width="64" height="64" src="https://img.icons8.com/sf-black-filled/64/left.png" alt="left"/>
                    </button>
                </Link>
            </div>
            <div className="detail">
            { 
                    detailDriver.length > 0 ? detailDriver?.map(elemento => {
                        return (
                            <div className="detail-content">
                                <div key={elemento.id}>
                                <h3 className="detail-Id">{elemento.id}</h3>
                                <h2 className="detail-title">{elemento.name + ' ' + elemento.lastName}</h2>
                                <h3 className="teams">{elemento?.createdinDb === true ? elemento?.teams?.map((el) => el.name).join(' , ') : elemento?.teams}</h3>
                                <img className='detail-img'src={elemento.image ? elemento.image : defaultImg} alt='img detail' />
                                    <h3>{elemento.nationality}</h3>
                                    <h3>{elemento.birthDate}</h3>
                                    <div className="description">
                                        <h3>Description</h3>
                                        <button className="btn-eye" onClick={toggle}>
                                            <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/visible--v1.png" alt="visible--v1"/>
                                        </button>
                                    </div>
                                </div>
                                { modal && (
                                     <div id="ventanaModal" className="modal">
                                     <div className="modal-content">
                                     <span onClick={toggle} className="close">&times;</span>
                                     <h2>{elemento.name + ' ' + elemento.lastName}</h2>
                                     <p>{elemento.description}</p>
                                     </div>
                                 </div>
                                )}
                            </div>
                        )
                    } ) :(<span className="loader"></span>)
                }
               
            </div>
        </div>
    )
};
export default DetailPage;