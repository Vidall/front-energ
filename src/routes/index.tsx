import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import { PaginaAssinaturaCliente } from '../pages/pagina-os/paginaAssinaturaCliente';
import { TelaLogin } from '../pages/pagina-login/TelaLogin';
import PrivateRoute from './PrivateRoute';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/entrar" element={<TelaLogin />} />
      <Route path="/inicio" element={<PrivateRoute element={PaginaInicial} />} />
      <Route path="/ordens-de-servicos" element={<PrivateRoute element={PaginaOS} />} />
      <Route path="/ordens-de-servicos/start/:id" element={<PrivateRoute element={StartOS} />} />
      <Route path="/ordens-de-servicos/andamento/:id" element={<PrivateRoute element={AndamentoOS} />} />
      <Route path="/ordens-de-servicos/detalhe/andamento/:id" element={<PrivateRoute element={DetalheOsAndamento} />} />
      <Route path="/ordens-de-servicos/detalhe/andamento/status-gerador/:id" element={<PrivateRoute element={PaginaStatusGerador} />} />
      <Route path="/ordens-de-servicos/detalhe/andamento/teste-gerador/:id" element={<PrivateRoute element={PaginaTesteGerador} />} />
      <Route path="/ordens-de-servicos/detalhe/andamento/assinatura-cliente/:id" element={<PrivateRoute element={PaginaAssinaturaCliente} />} />
      <Route path="/ordens-de-servicos/pdf/:id" element={<PrivateRoute element={PaginaPDF} />} />
      <Route path="/clientes" element={<PrivateRoute element={PaginaCliente} />} />
      <Route path="/clientes/detalhe/:id" element={<PrivateRoute element={DetalhePessoa} />} />
      <Route path="/tecnicos" element={<PrivateRoute element={PaginaTecnico} />} />
      <Route path="/tecnicos/detalhe/:id" element={<PrivateRoute element={DetalheTecnico} />} />
      <Route path="/servicos" element={<PrivateRoute element={PaginaServico} />} />
      <Route path="/servicos/detalhe/:id" element={<PrivateRoute element={DetalheServicos} />} />
      <Route path="/equipamentos/:id" element={<PrivateRoute element={PaginaEquipamento} />} />
      <Route path="*" element={<Navigate to="/inicio" />} />
    </Routes>
  );
};
