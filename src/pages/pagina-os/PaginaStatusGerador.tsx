import { Controller, useForm } from 'react-hook-form';
import { VFormStatusGerador, VRadioVerificacaoStatusGerador, VTextFieldStatusGerador } from '../../shared/forms/formOS';
import { LayoutPaginas } from '../../shared/Layout';
import { IStatusGerador } from '../../shared/Service/api-JAVA/models/OrdemServico';
import { Box, Button, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { OrdemServicoService } from '../../shared/Service/api-JAVA/ordem_servico/OrdemServicoService';
import { useEffect, useState } from 'react';
import { IEquipamento } from '../../shared/Service/api-TS/models/Equipamentos';
import { EquipamentosService } from '../../shared/Service/api-TS/equipamentos/EquipamentosService';

export const PaginaStatusGerador: React.FC = () => {
  const formMethods = useForm<IStatusGerador>();
  const { control, handleSubmit} = useForm<IEquipamento>();
  const [DataEquipamento, setDataEquipamento] = useState<IEquipamento>();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    OrdemServicoService.getPDF(Number(id))
      .then(res => {
        if(res instanceof Error) {
          alert(res.message);
          return res.message;
        }

        EquipamentosService.getByIdEquipamento(res.client_equipment_id)
          .then(res => {
            if(res instanceof Error) {
              alert(res.message);
              return res.message;
            }
            setDataEquipamento(res);
          })
          .catch(err => {console.error(err);});
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

  //eslint-disable-next-line
  const submitFormHorimetro = (formDataHorimetro: any) => {
    try {
      if (DataEquipamento) {
        EquipamentosService.updateById(DataEquipamento!.id, {
          idCliente: DataEquipamento.idCliente,
          equipamento: {...DataEquipamento.equipamento},
          tipo: DataEquipamento.tipo,
          horimetro_atual: +(formDataHorimetro.horimetro_atual)

        })
          .then((res) => {
            if (res instanceof Error) {
              alert(res.message);
              return res.message;
            }
  
            alert('Atualizado novo horímetro');
          })
          .catch((err) =>{console.error(err);});
      }
    } catch (error) {
      console.log(error);     
    }
  };
  //eslint-disable-next-line
  const submitFormKWH = (formDataKWH: any) => {
    try {
      if (DataEquipamento) {
        EquipamentosService.updateById(DataEquipamento!.id, {
          idCliente: DataEquipamento.idCliente,
          equipamento: {...DataEquipamento.equipamento},
          tipo: DataEquipamento.tipo,
          KWH_atual: +(formDataKWH.KWH_atual)
  
        }).then((res) => {
          if (res instanceof Error) {
            alert(res.message);
            return res.message;
          }

          alert('Atualizado nova Energia KWh');
        })
          .catch((err) =>{console.error(err);});
      }
    }        
    catch (error) {
      console.log(error);     
    }
  };

  return (
    <LayoutPaginas
      titulo="Status gerador"
    >
      <Box display={'flex'} alignItems={'center'}>
        <form onSubmit={handleSubmit(submitFormHorimetro)} style={{display: 'flex', alignItems: 'center', gap: 18}}>
          <Controller
            name='horimetro_atual'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={`Horímetro: ${DataEquipamento?.horimetro_atual}`}
                variant="outlined"                
                size="small"
                margin="normal"
                InputLabelProps={{shrink: true}}
              />
            )}
          />
          <Button variant='contained' type='submit'>Atualizar</Button>
        </form>
      </Box>
      <Box display={'flex'} alignItems={'center'}>
        <form onSubmit={handleSubmit(submitFormKWH)} style={{display: 'flex', alignItems: 'center', gap: 18}}>
          <Controller
            name='KWH_atual'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={`Energia (KWH): ${DataEquipamento?.KWH_atual}`}
                variant="outlined"                
                size="small"
                margin="normal"
                InputLabelProps={{shrink: true}}

              />
            )}
          />
          <Button variant='contained' type='submit'>Atualizar</Button>
        </form>
      </Box>

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