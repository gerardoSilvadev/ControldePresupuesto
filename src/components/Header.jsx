import React from 'react'
import ControlPresupuesto from './ControlPresupuesto'
import NuevoPresupuesto from './NuevoPresupuesto'

const Header = ({
    gastos,
    presupuesto, 
    setPresupuesto, 
    isValidPresupuesto,
    setisValidPresupuesto,
    setGastos}) => {
  return (
    <header>
      <h1>Planificador De Gastos</h1>
      
      
      {/* Operador ternario que revisa si el presupesto es valido nos mostrara el otro componente y si no es valido nos mostrara formulario */}
      {isValidPresupuesto ? (
        <ControlPresupuesto
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        setisValidPresupuesto={setisValidPresupuesto}/>
      ): (
        <NuevoPresupuesto
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        setisValidPresupuesto={setisValidPresupuesto}/>
      )}
      
    </header>
  )
}

export default Header