import { createContext, useCallback, useContext, useState } from 'react';

interface IDrawerContextProps {
  children: React.ReactNode
}

interface IDrawerContextData {
  isDrawerOpen: boolean,
  toggleDrawerOpen: () => void,
  /*eslint-disable no-unused-vars*/
  drawerOptions: IDrawerOptions[],
  setDrawerOption: (newDrawerOption: IDrawerOptions[])  => void
}

interface IDrawerOptions {
  icon: string,
  label: string,
  path: string,
  onClick?: () => void,
}

export const DrawerContext = createContext({} as IDrawerContextData);

/*eslint-disable react/prop-types*/

export const useDrawerContext = () => {
  return useContext(DrawerContext);
};

export const DrawerProvider: React.FC<IDrawerContextProps> = ( { children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerOptions, setDrawerOptions] = useState<IDrawerOptions[]>([]);

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen(oldDrawerStatus => !oldDrawerStatus);
  }, []);

  const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOptions[]) => {
    setDrawerOptions(newDrawerOptions);
  }, []);
  
  return (
    <DrawerContext.Provider value={{isDrawerOpen, toggleDrawerOpen, drawerOptions, setDrawerOption: handleSetDrawerOptions}}>
      {children}
    </DrawerContext.Provider>
  );
};
