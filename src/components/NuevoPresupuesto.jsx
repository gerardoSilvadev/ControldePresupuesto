import {useState} from 'react'
import Mensaje from './Mensaje';


const NuevoPresupuesto = ({
    presupuesto, 
    setPresupuesto,
    setisValidPresupuesto}) => {

    //State local que solo se usara en este componente
    const [mensaje, setMensaje] = useState('');

    const handlePresupuesto = (e) => {
        e.preventDefault();
        
        //Negando la condicion para que no se muestre un string
        if(!presupuesto || presupuesto < 0 ){
            setMensaje('No es un presupuesto valido')
            return;
        } 
        setMensaje('');
        setisValidPresupuesto(true)

    }
  
    return (
   <div  className='contenedor-presupuesto contenedor sombra'>
       
       <form onSubmit={handlePresupuesto} className='formulario'>
            <div className='campo'>
                <label>Definir Presupuesto</label>
                
                
                <input 
                className='nuevo-presupuesto'
                type="number"
                placeholder='Añade Tu Presupuesto' 
                value={presupuesto}
                onChange={e => setPresupuesto(Number(e.target.value))}

                />
            </div>

            <input type="Submit" value="Añadir"/>

            {/*Agregando el componente de mensaje y pasandole la alerta de no valido   */}
            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje> }

       </form>
   </div>
  )
}

export default NuevoPresupuesto