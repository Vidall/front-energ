import { VFormCliente } from '../../shared/forms/formCliente/VFormCliente';
import { LayoutPaginas } from '../../shared/Layout';

export const DetalhePessoa: React.FC = () => {
  
  return (
    <LayoutPaginas titulo="Área do cliente">
      <VFormCliente/>
    </LayoutPaginas>
  );
};