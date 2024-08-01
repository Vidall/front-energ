import { Navigate, Route, Routes } from 'react-router';

import { DetalheTecnico, PaginaInicial, PaginaTecnico } from '../pages';
import { PaginaCliente, DetalhePessoa } from '../pages/pagina-clientes';
import { PaginaServico } from '../pages/pagina-servicos/PaginaServico';

export const AppRoutes = () => {

  return (
    <Routes>
      <Route path='/inicio' element={<PaginaInicial/>}/>

      <Route path='/ordens-de-servicos' element={<>ola</>}/>

      <Route path='/clientes' element={<PaginaCliente/>}/>

      <Route path='/clientes/detalhe/:id' element={<DetalhePessoa/>}/>
      <Route path='/clientes/detalhe/:id' element={<DetalhePessoa/>}/>

      <Route path='/tecnicos' element={<PaginaTecnico/>}/>
      <Route path='/tecnicos/detalhe/:id' element={<DetalheTecnico/>}/>

      <Route path='/servicos' element={<PaginaServico/>}/>

      <Route path='*' element={<Navigate to={'/inicio'}/>}/>

    </Routes>
  );
};