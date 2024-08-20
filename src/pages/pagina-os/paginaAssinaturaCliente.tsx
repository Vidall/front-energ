import { useForm } from 'react-hook-form';
import { VFormOS } from '../../shared/forms/formOS';
import { VFormTecnico } from '../../shared/forms/formTecnico/VFormTecnico';
import { LayoutPaginas } from '../../shared/Layout';
import { Box } from '@mui/material';
import { VAssinaturaField } from '../../shared/forms';

export const paginaAssinaturaCliente: React.FC = () => {
  const formMethods = useForm();

  const handleSubmitForm = (form: any) => {
    console.log(form);
  };

  return (
    <LayoutPaginas titulo="Área do técnico">
      <VFormOS
        formMethods={formMethods}
        submitForm={formMethods.handleSubmit(handleSubmitForm)}
      > 
        <Box>
          <VAssinaturaField
            control={formMethods.control}
            errors={formMethods.formState.errors}
            label='Assinatura'
            name="file"
            rules={{require: 'Este campo é obrigatório'}}
          />
        </Box>  
      </VFormOS>
    </LayoutPaginas>  
  );
};
