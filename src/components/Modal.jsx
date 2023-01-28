import { useState,useEffect } from 'react'
import cerrarBtn from '../img/cerrar.svg'
import Mensaje from './Mensaje';



const Modal = ({setModal,animarModal,setanimarModal, guardarGasto, gastoEditar,setGastoEditar}) => {

    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [categoria, setCategoria] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [fecha, SetFecha] = useState('');
    const [id, SetId] = useState('');

    useEffect(()=> { 
        if(Object.keys(gastoEditar).length > 0 ){ 
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            SetId(gastoEditar.id)
            SetFecha(gastoEditar.fecha)
        }
    },[])
    

    const ocultarModal = () => { 
       setanimarModal(false)
       setGastoEditar({})
       setTimeout(() => {
            setModal(false)
        }, 500);
    }

    const handleSubmit = e => { 
        e.preventDefault();

        if([nombre,cantidad, categoria].includes('')) { 
            setMensaje('Todos los campos son obligatorios')

            setTimeout(() => {
                setMensaje('')
            }, 3000);
            return;
        }
        guardarGasto({nombre,cantidad,categoria,id,fecha});
    }

  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img 
            src={cerrarBtn} 
            alt="icono cerrar modal"
            onClick={ocultarModal} />
        </div>

        <form 
            onSubmit={handleSubmit}
            className={`formulario ${animarModal ? "animar" : "cerrar"}`}>
            <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            
            <div className='campo'>
                <label htmlFor="nombre">Nombre Gasto</label>

                <input 
                id='nombre'
                type="text"
                placeholder="Añade el Nombre del Gasto"
                value={nombre}
                onChange={e => setNombre(e.target.value)}/>
            </div>
            
            <div className='campo'>
                <label htmlFor="cantidad">Cantidad</label>

                <input 
                id='cantidad'
                type="number"
                placeholder="Añade la cantidad del gasto: ej.300"
                cantidad={cantidad}
                onChange={ e => setCantidad(Number(e.target.value))}
                 />
            </div>
            
            <div className='campo'>
                <label htmlFor="categoria">Categoria</label>

                <select
                id='categoria'
                value={categoria}
                onChange={e => setCategoria(e.target.value)}
                >
                    <option value="">-- Selecione --</option>   
                    <option value="ahorro">Ahorro</option>   
                    <option value="comida">Comida</option>   
                    <option value="casa">Casa</option>   
                    <option value="gastos">Gustos Varios</option>   
                    <option value="ocio">Ocio</option>   
                    <option value="salud">Salud</option>   
                    <option value="suscripciones">Suspcripciones</option>   
                </select>
            </div>

            <input 
            type="submit"
            value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'} />

        </form>
    </div>
  )
}

export default Modal