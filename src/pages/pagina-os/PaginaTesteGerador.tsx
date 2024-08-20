import { useForm } from 'react-hook-form';
import { VFormStatusGerador, VInputSelectVerificacao, VRadioVerificacaoStatusGerador, VTextFieldStatusGerador, VTextFieldTesteGerador } from '../../shared/forms/formOS';
import { LayoutPaginas } from '../../shared/Layout';
import { IPDF, IStatusGerador, ITesteGerador } from '../../shared/Service/api-JAVA/models/OrdemServico';
import { VRadioVerificacaoServico } from '../../shared/forms/formOS/fields/VRadioVerificacaoServico';
import { Box, Button, Divider, FormLabel } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { OrdemServicoService } from '../../shared/Service/api-JAVA/ordem_servico/OrdemServicoService';
import { useEffect, useState } from 'react';

export const PaginaTesteGerador: React.FC = () => {
  const formMethods = useForm<ITesteGerador>();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    OrdemServicoService.getPDF(Number(id))
      .then(res => {
        if(res instanceof Error) {
          alert(res.message);
          return res.message;
        }
        formMethods.reset(res.generatorTest);
      })
      .catch(error => console.log(error));
  }, [id, formMethods]);

  const handleSubmitForm = (form: ITesteGerador) => {
    OrdemServicoService.createGeradorStatusOrTeste(Number(id), form, 'gerador_teste')
      .then(res => {
        if (res instanceof Error) {
          alert(res.message);
          return res.message;
        }

        alert('Criado com sucesso!');
      })
      .catch(error => console.log(error));
  };

  const handleClickVoltar = () => {
    navigate(-1);
  };

  return (
    <LayoutPaginas
      titulo="Teste gerador"
    >
      <VFormStatusGerador
        submitForm={formMethods.handleSubmit(handleSubmitForm)}
        formMethods={formMethods}
      >
        <FormLabel>GMG</FormLabel>
        <VTextFieldTesteGerador
          control={formMethods.control}
          errors={formMethods.formState.errors}
          name='gmg.gmg_tFaseR'        
          label='Tensão Fase R'
        />
        <VTextFieldTesteGerador
          control={formMethods.control}
          errors={formMethods.formState.errors}
          name='gmg.gmg_tFaseS'        
          label='Tensão Fase S'
        />
        <VTextFieldTesteGerador
          control={formMethods.control}
          errors={formMethods.formState.errors}
          name='gmg.gmg_tFaseT'        
          label='Tensão Fase T'
        />
        {/* ----- */}
        <Divider/>
        <FormLabel>Rede</FormLabel>
        <VTextFieldTesteGerador
          control={formMethods.control}
          errors={formMethods.formState.errors}
          name='rede.rede_tFaseR'        
          label='Tensão Fase R'
        />
        <VTextFieldTesteGerador
          control={formMethods.control}
          errors={formMethods.formState.errors}
          name='rede.rede_tFaseS'        
          label='Tensão Fase S'
        />
        <VTextFieldTesteGerador
          control={formMethods.control}
          errors={formMethods.formState.errors}
          name='rede.rede_tFaseT'        
          label='Tensão Fase T'
        />

        <Divider/>
        <FormLabel>Corrente</FormLabel>
        <VTextFieldTesteGerador
          control={formMethods.control}
          errors={formMethods.formState.errors}
          name='corrente.corrente_tFaseR'        
          label='Fase R'
        />
        <VTextFieldTesteGerador
          control={formMethods.control}
          errors={formMethods.formState.errors}
          name='corrente.corrente_tFaseS'        
          label='Fase S'
        />
        <VTextFieldTesteGerador
          control={formMethods.control}
          errors={formMethods.formState.errors}
          name='corrente.corrente_tFaseT'        
          label='Fase T'
        />
        {/* ----- */}
        <Divider/>
        <VTextFieldTesteGerador
          control={formMethods.control}
          errors={formMethods.formState.errors}
          name='corrente.corrente_tBateriaCL'        
          label='Tensão da Bateria com Carregador Ligado'
        />
        <VTextFieldTesteGerador
          control={formMethods.control}
          errors={formMethods.formState.errors}
          name='corrente.corrente_tBateriaCD'        
          label='Tensão da Bateria com Carregador Desligado'
        />
        <VTextFieldTesteGerador
          control={formMethods.control}
          errors={formMethods.formState.errors}
          name='corrente.corrente_tBateriaIP'        
          label='Tensão da Bateria no Instante da Partida'
        />
        <VTextFieldTesteGerador
          control={formMethods.control}
          errors={formMethods.formState.errors}
          name='corrente.corrente_tBateriaEC'  // Ver se é referente à Tensão do Alternador de Baterias em Carga
          label='Tensão do Alternador de Baterias em Carga'
        />  
        <VTextFieldTesteGerador
          control={formMethods.control}
          errors={formMethods.formState.errors}
          name='corrente.corrente_frequencia'        
          label='Frequencia'
        />
        <VTextFieldTesteGerador
          control={formMethods.control}
          errors={formMethods.formState.errors}
          name='corrente.corrente_potencia'        
          label='Potência'
        />
        <VTextFieldTesteGerador
          control={formMethods.control}
          errors={formMethods.formState.errors}
          name='corrente.corrente_potenciaR'        
          label='Potência Reativa'
        />
        <VTextFieldTesteGerador
          control={formMethods.control}
          errors={formMethods.formState.errors}
          name='corrente.corrente_potenciaE'        
          label='Potência Elétrica'
        />
        <VTextFieldTesteGerador
          control={formMethods.control}
          errors={formMethods.formState.errors}
          name='corrente.corrente_fatorPotencia'        
          label='Fator de Potência'
        />
          <VTextFieldTesteGerador
          control={formMethods.control}
          errors={formMethods.formState.errors}
          name='corrente.corrente_temperatura'
          label='Temperatura'
        />
         <VTextFieldTesteGerador
          control={formMethods.control}
          errors={formMethods.formState.errors}
          name='corrente.corrente_pressaOleo'        
          label='Pressão Óleo'
        />
        <VTextFieldTesteGerador
          control={formMethods.control}
          errors={formMethods.formState.errors}
          name='corrente.corrente_consumoCombustivel'        
          label='Consumo Combustível'
        />
          <VTextFieldTesteGerador
          control={formMethods.control}
          errors={formMethods.formState.errors}
          name='corrente.corrente_temperaturaAd'        
          label='Temperatura Admissão'
        />
        <VTextFieldTesteGerador
          control={formMethods.control}
          errors={formMethods.formState.errors}
          name='corrente.corrente_preAquecimento'        
          label='Pré Aquecimento'
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