import {useState, useEffect} from 'react'

const Filtros = ({filtro,setFiltro}) => {
  return (
    <div className='filtros sombra contenedor'>
       <form>
            <div className='campo'>
                <label>Filtrar Gastos</label>
                <select
                value={filtro}
                onChange={e => setFiltro(e.target.value)}>
                    <option value="">-- Todos Las Categorias --</option>   
                    <option value="ahorro">Ahorro</option>   
                    <option value="comida">Comida</option>   
                    <option value="casa">Casa</option>   
                    <option value="gastos">Gustos Varios</option>   
                    <option value="ocio">Ocio</option>   
                    <option value="salud">Salud</option>   
                    <option value="suscripciones">Suspcripciones</option>   
                </select>
            </div>
       </form>
    </div>
  )
}

export default Filtros