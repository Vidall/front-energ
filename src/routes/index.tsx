import { Navigate, Route, Routes } from 'react-router';

import { PaginaInicial } from '../pages';
import { PaginaCliente, DetalhePessoa } from '../pages/pagina-clientes';

export const AppRoutes = () => {

  return (
    <Routes>
      <Route path='/inicio' element={<PaginaInicial/>}/>

      <Route path='/ordens-de-servicos' element={<>ola</>}/>

      <Route path='/clientes' element={<PaginaCliente/>}/>

      <Route path='/clientes/detalhe/:id' element={<DetalhePessoa/>}/>
      <Route path='/clientes/detalhe/:id' element={<DetalhePessoa/>}/>

      <Route path='/tecnicos' element={<>ola</>}/>

      <Route path='/servicos' element={<>ola</>}/>

      <Route path='*' element={<Navigate to={'/inicio'}/>}/>

    </Routes>
  );
};