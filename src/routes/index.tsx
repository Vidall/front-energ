import { Navigate, Route, Routes } from 'react-router';

import { PaginaInicial } from '../pages/PaginaInicial';

export const AppRoutes = () => {

  return (
    <Routes>
      <Route path='/inicio' element={<PaginaInicial/>}/>

      <Route path='*' element={<Navigate to={'/inicio'}/>}/>

    </Routes>
  );
};