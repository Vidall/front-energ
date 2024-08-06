import { VFormServicos } from '../../shared/forms/formServicos';
import { LayoutPaginas } from '../../shared/Layout';

export const DetalheServicos: React.FC = () => {
  return (
    <LayoutPaginas titulo="Área de serviço">
      <VFormServicos/>
    </LayoutPaginas>
  );
};