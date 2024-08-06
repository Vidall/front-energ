import { Navigate, Route, Routes } from 'react-router';

import { DetalheTecnico, PaginaInicial, PaginaTecnico } from '../pages';
import { PaginaCliente, DetalhePessoa } from '../pages/pagina-clientes';
import { DetalheServicos, PaginaServico } from '../pages/pagina-servicos';
import { PaginaEquipamento } from '../pages/pagina-equipamento';

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
      <Route path='/servicos/detalhe/:id' element={<DetalheServicos/>}/>

      <Route path='/equipamentos/:id' element={<PaginaEquipamento/>}/>

      <Route path='*' element={<Navigate to={'/inicio'}/>}/>

    </Routes>
  );
};