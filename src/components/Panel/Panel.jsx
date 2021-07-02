import React, {useState} from 'react'
import Description from './Description/Description'
import Compra from './Compra/Compra'
import style from './Panel.module.css'

function Panel() {
    const [compra, setCompra] = useState(false)

    const redirectToDescription = ()=>{
        setCompra(false)
    }
    const redirectToCompra = ()=>{
        setCompra(true)
    }
    
    return (
        <div className={`${style.panel} !important`}>
            <h3 className={style.title}>INFORMACION BASICA DE PARCELA</h3>
            {compra? <Compra redirectToDescription={redirectToDescription} /> : <Description redirectToCompra={redirectToCompra} /> }
        </div>
    )
}

export default Panel
