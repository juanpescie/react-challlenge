import React, { useState } from 'react'
import style from './Compra.module.css'
import axios from 'axios'
import { useSelector } from 'react-redux'
function Compra({redirectToDescription}) {
    const properties = useSelector( (state)=> state.properties )
    const [success, setSuccess] = useState(null)
    const [input, setInput] = useState({
        name:"",
        phone: "",
        email: "",
        prize: ""
    })
    const handleSubmit = (e)=>{
        const {name, phone, email, prize} = input;
        e.preventDefault();
        if(name && phone && email && prize ) {
            axios.post('http://localhost:4100/propertysales', {...input, ...properties}).
            then(()=> setSuccess(true));
            
        }
        else{
            setSuccess(false)
        }

    }
    const handleChange = (e)=>{
        setInput({...input, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <button className={style.exit} onClick={redirectToDescription}>Volver a la descripcion</button>
            
            <form action="post" >
                <div className={style.inputContainer}>
                    <label htmlFor="name">Nombre y Apellido del comprador</label>
                    <input type="text" 
                    name="name"
                    value={input.name}
                    className={style.input}
                    onChange={handleChange}
                     />
                </div>
                <div className={style.inputContainer}>
                    <label htmlFor="phone">Telefono</label>
                    <input type="text" 
                    name="phone"
                    value={input.phone}
                    className={style.input}
                    onChange={handleChange}
                     />
                </div>
                <div className={style.inputContainer}>
                    <label htmlFor="email">Correo Electronico</label>
                    <input type="text" 
                    name="email"
                    value={input.email}
                    className={style.input}
                    onChange={handleChange}
                     />
                </div>
                <div className={style.inputContainer}>
                    <label htmlFor="name">Precio de Compra (en €)</label>
                    <input type="text" 
                    name="prize"
                    value={input.prize}
                    className={style.input}
                    onChange={handleChange}
                     />
                </div>
                <div className={style.buttonContainer}>
                <button 
                onClick={handleSubmit}
                className={style.submitButton}>Enviar</button>
                </div>
            {success !== null ? <h4>{success === true ? "oferta realizada": "faltan campos" }</h4> : null }
            </form>
            
        </div>
    )
}

export default Compra
