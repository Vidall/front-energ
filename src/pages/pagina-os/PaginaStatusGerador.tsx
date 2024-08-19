import { useForm } from 'react-hook-form';
import { VFormStatusGerador, VInputSelectVerificacao, VRadioVerificacaoStatusGerador, VTextFieldStatusGerador } from '../../shared/forms/formOS';
import { LayoutPaginas } from '../../shared/Layout';
import { IStatusGerador } from '../../shared/Service/api-JAVA/models/OrdemServico';
import { VRadioVerificacaoServico } from '../../shared/forms/formOS/fields/VRadioVerificacaoServico';
import { Box, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { OrdemServicoService } from '../../shared/Service/api-JAVA/ordem_servico/OrdemServicoService';
import { useEffect, useState } from 'react';

export const PaginaStatusGerador: React.FC = () => {
  const formMethods = useForm<IStatusGerador>();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    OrdemServicoService.getPDF(Number(id))
      .then(res => {
        if(res instanceof Error) {
          alert(res.message);
          return res.message;
        }
        formMethods.reset(res.generatorStatus);
      })
      .catch(error => console.log(error));
  }, [id, formMethods]);

  const handleSubmitForm = (form: IStatusGerador) => {
    OrdemServicoService.createGeradorStatusOrTeste(Number(id), form, 'gerador_status')
      .then(res => {
        if (res instanceof Error) {
          alert(res.message);
          return res.message;
        }

        alert('Status criado com sucesso!');
      })
      .catch(error => console.log(error));
  };

  const handleClickVoltar = () => {
    navigate(-1);
  };

  return (
    <LayoutPaginas
      titulo="Status gerador"
    >
      <VFormStatusGerador
        submitForm={formMethods.handleSubmit(handleSubmitForm)}
        formMethods={formMethods}
      >
        <VRadioVerificacaoStatusGerador
          name={'motorProtect.motorProtect_baixaPressaOleo'}
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label='Proteções Motor - Baixa Pressão Óleo'
        />
        <VRadioVerificacaoStatusGerador
          name={'motorProtect.motorProtect_altaTemperatura'}
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label='Proteções Motor - Alta Temperatura'
        />
        <VRadioVerificacaoStatusGerador
          name={'motorProtect.motorProtect_ruidosOuVibracoesAnormais'}
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label='Proteções Motor - Ruídos ou Vibrações Anormais'
        />
        <VRadioVerificacaoStatusGerador
          name={'generatorProtect.generatorProtect_tensao'}
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label='Tensão'
        />
        <VRadioVerificacaoStatusGerador
          name={'generatorProtect.generatorProtect_frequencia'}
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label='Frequência'
        />

        <VTextFieldStatusGerador
          control={formMethods.control}
          name='generatorProtect.generatorProtect_nivelTanqueDiesel'
          label='Nivel do tanque'
          errors={formMethods.formState.errors}
        />
        <VTextFieldStatusGerador
          control={formMethods.control}
          name='operationTime.operationTime_faltaDeRede'
          label='Falta de Rede (Segundos)'
          errors={formMethods.formState.errors}
        />
        <VTextFieldStatusGerador
          control={formMethods.control}
          name='operationTime.operationTime_assimirCarga'
          label='Assumir Carga (Segundos)'
          errors={formMethods.formState.errors}
        />
        <VTextFieldStatusGerador
          control={formMethods.control}
          name='operationTime.operationTime_retornoDeRede'
          label='Retorno de Rede (Segundos)'
          errors={formMethods.formState.errors}
        />
        <VTextFieldStatusGerador
          control={formMethods.control}
          name='operationTime.operationTime_resfriamentoGerador'
          label='Resfriamento do Gerador (Segundos)'
          errors={formMethods.formState.errors}
        />

        <Box display={'flex'} justifyContent={'space-between'} paddingTop={1}>
          <Button variant='outlined' size='small' onClick={handleClickVoltar}>
            Voltar
          </Button>
          <Button variant='contained' size='small' type='submit'>
            Cadastrar
          </Button>
        </Box>
      </VFormStatusGerador>
    </LayoutPaginas>
  );
};