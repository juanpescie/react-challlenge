import React from 'react'
import { useSelector } from 'react-redux'
import style from './Description.module.css'
function Description({redirectToCompra}) {
    const info = useSelector(( state )=> state.properties )
    return (
        <div>
            <div>
                <div className={style.detail}>
                    <label>Refcat</label>
                    <p>{info.refcat}</p>
                </div>
                <div className={style.detail}>
                    <label>Contacto</label>
                    <p>{info.contacto}</p>
                </div>
                <div className={style.detail}>
                    <label>Ultima Vista</label>
                    <p>{info.lastVisit}</p>
                </div>
                <div className={style.detail}>
                    <label>Descripcion</label>
                    <p>{info.description}</p>
                </div>
                <div className={style.detail}>
                    <label>Precio de Venta</label>
                    <p>{info.price}</p>

                </div>

            </div>
            <button onClick={redirectToCompra}>Comprar</button> 
        </div>
    )
}

export default Description
