import { useState,useEffect} from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css"


const ControlPresupuesto = ({gastos,presupuesto,setGastos, setPresupuesto,setisValidPresupuesto}) => {

    const [porcentaje, setPorcentaje] = useState(0);
    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);

    useEffect(()=> { 
       const totalGastado = gastos.reduce( (total,gasto) => gasto.cantidad + total, 0)
       const totalDisponible = presupuesto - totalGastado; 

       //Calcular el porcentaje gastado
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)

      setPorcentaje(nuevoPorcentaje)
       
       setDisponible(totalDisponible);
       setGastado(totalGastado);
    }, [gastos])

    const formatearCantidad = (cantidad) => { 
        return cantidad.toLocaleString('en-US', { 
            style:'currency', 
            currency: 'USD'
        })
    } 

    const handleResetApp = () => { 
        const resultado = confirm('¿Deseas reiniciar presupuesto y gastos?')
        if(resultado){ 
          setGastos([])
          setPresupuesto(0)
          setisValidPresupuesto(false)
        } 
        
    }
  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
           <CircularProgressbar
           value={porcentaje}
           text={`${porcentaje}% Gastado`}
           styles={buildStyles({
                pathColor: porcentaje > 100 ? '#DC2626' : '#FB2576',
                trailColor:'#FFE9B1', 
                textColor: porcentaje > 100 ? '#DC2626' : '#FB2576'
           })}
           />
        </div>

        <div className='contenido-presupuesto'>
            <button 
            className='reset-app'
            type='button'
            onClick={handleResetApp}>
                Resetear App
            </button>
            <p>
                <span>Presupuesto:</span>{formatearCantidad(presupuesto)}
            </p>
            
            <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                <span>Disponible:</span>{formatearCantidad(disponible)}
            </p>
            
            <p>
                <span>Gastado:</span>{formatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto