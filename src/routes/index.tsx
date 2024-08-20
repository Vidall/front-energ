import { Navigate, Route, Routes } from 'react-router';

import { DetalheTecnico, PaginaInicial, PaginaTecnico } from '../pages';
import { PaginaCliente, DetalhePessoa } from '../pages/pagina-clientes';
import { DetalheServicos, PaginaServico } from '../pages/pagina-servicos';
import { PaginaEquipamento } from '../pages/pagina-equipamento';
import { PaginaOS } from '../pages/pagina-os/PaginaOS';
import { StartOS } from '../pages/pagina-os/StartOS';
import { AndamentoOS } from '../pages/pagina-os/AndamentoOS';
import { DetalheOsAndamento } from '../pages/pagina-os/DetalheOsAndamento';
import { PaginaStatusGerador } from '../pages/pagina-os/PaginaStatusGerador';
import { PaginaTesteGerador } from '../pages/pagina-os/PaginaTesteGerador';
import { PaginaPDF } from '../pages/pagina-PDF/PaginaPDF';

export const AppRoutes = () => {

  return (
    <Routes>
      <Route path='/inicio' element={<PaginaInicial/>}/>

      <Route path='/ordens-de-servicos' element={<PaginaOS/>}/>
      <Route path='/ordens-de-servicos/start/:id' element={<StartOS/>}/>
      <Route path='/ordens-de-servicos/andamento/:id' element={<AndamentoOS/>}/>
      <Route path='/ordens-de-servicos/detalhe/andamento/:id' element={<DetalheOsAndamento/>}/>
      <Route path='/ordens-de-servicos/detalhe/andamento/status-gerador/:id' element={<PaginaStatusGerador/>}/>
      <Route path='/ordens-de-servicos/detalhe/andamento/teste-gerador/:id' element={<PaginaTesteGerador/>}/>
      
      <Route path='/ordens-de-servicos/detalhe/andamento/assinatura-cliente/:id' element={<PaginaTesteGerador/>}/>
      
      <Route path='/ordens-de-servicos/pdf/:id' element={<PaginaPDF/>}/>

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