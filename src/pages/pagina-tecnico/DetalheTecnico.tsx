import { VFormTecnico } from '../../shared/forms/formTecnico/VFormTecnico';
import { LayoutPaginas } from '../../shared/Layout';

export const DetalheTecnico: React.FC = () => {

  return (
    <LayoutPaginas titulo="Área do técnico">
      <VFormTecnico/>
    </LayoutPaginas>  
  );
};
