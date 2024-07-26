import { Button, Icon } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router';
import { useDrawerContext } from '../shared/Contexts';

export const AppRoutes = () => {
  const {toggleDrawerOpen} = useDrawerContext();

  return (
    <Routes>
      <Route path='/menu' element={<Button  variant='contained' onClick={toggleDrawerOpen}><Icon>menu</Icon></Button>}/>

      <Route path='*' element={<Navigate to={'/menu'}/>}/>

    </Routes>
  );
};