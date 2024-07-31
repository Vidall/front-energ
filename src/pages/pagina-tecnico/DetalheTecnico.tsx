import { VFieldAssinatura } from '../../shared/forms';
import { LayoutPaginas } from '../../shared/Layout';

export const DetalheTecnico: React.FC = () => {

  return (
    <LayoutPaginas titulo="Área do técnico">
      <VFieldAssinatura/>
    </LayoutPaginas>  
  );
};
