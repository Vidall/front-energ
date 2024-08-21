import { useForm } from 'react-hook-form';
import { VAssinaturClienteOS, VFormOS } from '../../shared/forms/formOS';
import { VFormTecnico } from '../../shared/forms/formTecnico/VFormTecnico';
import { LayoutPaginas } from '../../shared/Layout';
import { Box, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { OrdemServicoService } from '../../shared/Service/api-JAVA/ordem_servico/OrdemServicoService';
import { ISendAssinaturaCliente } from '../../shared/Service/api-JAVA/models/OrdemServico';
import { useState } from 'react';

export const PaginaAssinaturaCliente: React.FC = () => {
  const formMethods = useForm<ISendAssinaturaCliente>();

  const navigate = useNavigate();

  const { id } = useParams();

  const handleSubmitForm = (form: ISendAssinaturaCliente) => {

    OrdemServicoService.sendAssinaturaCliente(Number(id), form.file)
      .then(res => {
        if(res instanceof Error) {
          alert(res.message);
          return res.message;
        }

        alert('Assinatura cadastrada com sucesso');
        navigate(-1);
      })
      .catch(error => console.log(error));
  };

  const handleClickVoltar = () => {
    navigate(-1);
  };

  return (
    <LayoutPaginas titulo="Área assinatura cliente">
      <VFormOS
        formMethods={formMethods}
        submitForm={formMethods.handleSubmit(handleSubmitForm)}
      > 
        <Box>
          <VAssinaturClienteOS
            control={formMethods.control}
            errors={formMethods.formState.errors}
            label='Assinatura'
            name="file"
            rules={{require: 'Este campo é obrigatório'}}
          />
          
          <Box display={'flex'} justifyContent={'space-between'}>
            <Button variant='outlined' onClick={handleClickVoltar}>
              Voltar
            </Button>
            <Button variant='contained' type='submit'>
              Cadastrar
            </Button>
          </Box>
        </Box>  
      </VFormOS>
    </LayoutPaginas>  
  );
};
