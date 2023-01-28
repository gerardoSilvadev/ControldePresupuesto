import { useState,useEffect } from 'react'
import Filtros from './components/Filtros';
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import { generarId } from './helpers';
import iconoNuevoGasto from './img/nuevo-gasto.svg'



function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );
  const [isValidPresupuesto,setisValidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarModal, setanimarModal] = useState(false);

  const [gastos,setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  );

  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => { 
     //Verificar si gasto editar tiene algo
     if(Object.keys(gastoEditar).length > 0) { 
      setModal(true)
    
      setTimeout(() => {
        setanimarModal(true)
      }, 500);
     }
  }, [gastoEditar])

  useEffect(() => { 
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    if(presupuestoLS > 0) {
      setisValidPresupuesto(true)
    }
  }, [])

  useEffect(() => { 
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
  }, [gastos])

  useEffect(() => { 
     if(filtro) { 
        //Filtros por categorias
        const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro);
       setGastosFiltrados(gastosFiltrados);

     }
  }, [filtro])

  const handleNuevoGasto = () => { 
    setModal(true)
    setGastoEditar({})

    setTimeout(() => {
      setanimarModal(true)
    }, 500);
  }

  const guardarGasto = gasto => { 
    console.log(gasto)
    if(gasto.id) {
      //Actualizar  
      const gastosActualizados = gastos.map(gastoState  =>  gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados);
      setGastoEditar({})
     } else {
      //Nuevo Gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto])
      
    }
    setanimarModal(false)

        setTimeout(() => {
            setModal(false)
        }, 500);
       }

  const eliminarGasto = id =>  { 
      const gastosActualizados = gastos.filter( gasto => gasto.id !== id); 
      setGastos(gastosActualizados);
  }


  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
      gastos={gastos}
      setGastos={setGastos}
      presupuesto={presupuesto}
      setPresupuesto={setPresupuesto}
      isValidPresupuesto={isValidPresupuesto}
      setisValidPresupuesto={setisValidPresupuesto}

      />

      {isValidPresupuesto && (
        <>
         <main>
          <Filtros
          filtro={filtro}
          setFiltro={setFiltro}
          />
            <ListadoGastos
            gastos={gastos}
            setGastoEditar={setGastoEditar}
            eliminarGasto={eliminarGasto}
            filtro={filtro}
            gastosFiltrados={gastosFiltrados}
            />
          </main>
        <div className='nuevo-gasto'>
          <img 
          src={iconoNuevoGasto} 
          alt="icono gasto" 
          onClick={handleNuevoGasto}
          />
        </div>
        </>
      )}

        {modal && <Modal 
                    setModal={setModal} 
                    animarModal={animarModal} 
                    setanimarModal={setanimarModal}
                    guardarGasto={guardarGasto}
                    gastoEditar={gastoEditar}
                    setGastoEditar={setGastoEditar}/>}
        
      
    </div>
  )
}

export default App
