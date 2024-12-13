import { Controller, useForm } from 'react-hook-form';
import { VAutoCompleteServicos, VFormOS, VTabelaServiceInOrder, VTextFieldOS } from '../../shared/forms/formOS';
import { LayoutPaginas } from '../../shared/Layout';
import { Box, Button, Divider, FormControlLabel, Icon, Radio, RadioGroup, TextField, Theme, useMediaQuery,  } from '@mui/material';
import { VInputSelect } from '../../shared/Components';
import { IGetByIdOrdemStart, IOrdemFinalizacao, IOs, IOsFinalizada, IPDF, IServiceInOrder, IServiceInOrderOutput } from '../../shared/Service/api-JAVA/models/OrdemServico';
import { Idata, IGroupAllDTOOutputList, IGrupo } from '../../shared/Service/api-JAVA/models/GruposServicos';
import { useCallback, useEffect, useState } from 'react';
import { GruposServicosService } from '../../shared/Service/api-JAVA/grupos-servicos/GruposServicosService';
import { VRadioVerificacaoServico } from '../../shared/forms/formOS/fields/VRadioVerificacaoServico';
import { OrdemServicoService } from '../../shared/Service/api-JAVA/ordem_servico/OrdemServicoService';
import { useNavigate, useParams } from 'react-router';
import { DetalheOsAndamento } from './DetalheOsAndamento';
import { PessoaJuridicaService } from '../../shared/Service/api-TS/clientes/PessoaJuridicaService';
import { TPessoa } from '../../shared/Service/api-TS/models/Clientes';
import { PessoaFisicaService } from '../../shared/Service/api-TS/clientes/PessoaFisicaService';
import { EquipamentosService, ITecnico } from '../../shared/Service/api-TS/equipamentos/EquipamentosService';
import { IEquipamento } from '../../shared/Service/api-TS/models/Equipamentos';
import { TecnicoService } from '../../shared/Service/api-TS/tecnicos/TecnicoService';

export const AndamentoOS:React.FC = () => {
  const formMethods = useForm<IServiceInOrder>();
  const formMethodsFinalizar = useForm<IOrdemFinalizacao>();
  const smDown = useMediaQuery((theme:  Theme)=> theme.breakpoints.down('sm'));
  const [grupoServico, setGrupoServico] = useState<IGrupo[]>();
  const [listServiceInOrder, setListServiceInOrder] = useState<IServiceInOrderOutput[]>();
  const [cliente, setClient] = useState<TPessoa>();
  const [equipamento, setEquipamento] = useState<IEquipamento>();
  const [tecnico, setTecnico] = useState<ITecnico>();
  const [Os, setOs] = useState<IGetByIdOrdemStart>();
  const { id } = useParams();
  const navigate = useNavigate();
  //eslint-disable-next-line
  const [OsFinalizada, setOsFinalizada] = useState<IOsFinalizada>();

  const refreshPage = useCallback(() => {
    window.location.reload();
  }, []);

  const handleSubmitForm = (form: IServiceInOrder) => {
    OrdemServicoService.createServiceInOrder(Number(id), form)
      .then( res => {
        if (res instanceof Error) {
          alert(res.message);
          return res.message;
        }

        alert('Cadastrado com sucesso');
        refreshPage();
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    GruposServicosService.getAll()
      .then(res => {
        if (res instanceof Error) {
          alert(res.message);
          return res.message;
        }
        if (res.data._embedded) {
          setGrupoServico(res.data._embedded.groupAllDTOOutputList);
        }
      })
      .catch(error => console.log(error));
    OrdemServicoService.getByIdOrdemStart(Number(id))
      .then(res => {
        if (res instanceof Error) {
          alert(res.message);
          return res.message;
        }

        setListServiceInOrder(res.servicesInOrder);
          
      })
      .catch(error => console.log(error));

    OrdemServicoService.getPDF(Number(id))
      .then(res => {
        if (res instanceof Error) {
          alert(res.message);
          return res.message;
        }
        
        //eslint-disable-next-line
        const { pathPDF, technician_id, client_equipment_id, client_id, client_type, ...OsPartial }: IPDF = res;
        const OsFinalizadaSend: IOsFinalizada = {  
          ...OsPartial,
          client: {...cliente} as TPessoa,
          client_equipment: {...equipamento} as IEquipamento,
          technician: {...tecnico} as ITecnico,   
          generalObservations: ''
        };
        setOsFinalizada(OsFinalizadaSend);
        
        console.log(res);
        if (res.client_type === 'JURIDICO') {
          PessoaJuridicaService.getByID(res.client_id)
            .then(res => {
              if (res instanceof Error) {
                alert(res.message);
                return res.message;
              }
              setClient(res);
            })
            .catch(error => console.log(error));
            
        } else if (res.client_type === 'FISICO') {
          PessoaFisicaService.getByID(res.client_id)
            .then(res => {
              if (res instanceof Error) {
                alert(res.message);
                return res.message;
              }
              setClient(res);
            })
            .catch(error => console.log(error));
        }

        EquipamentosService.getByIdEquipamento(res.client_equipment_id)
          .then(res => {
            if (res instanceof Error) {
              alert(res.message);
              return res.message;
            }

            setEquipamento(res);
          })
          .catch(error => console.log(error));

        TecnicoService.getByID(res.technician_id)
          .then(res => {
            if (res instanceof Error) {
              alert(res.message);
              return res.message;
            }

            setTecnico(res);
          })
          .catch(error => console.log(error));

      })
      .catch(error => console.log(error));
  },[]);

  const handleClickRefresh = () => {
    OrdemServicoService.getByIdOrdemStart(Number(id))
      .then(res => {
        if (res instanceof Error) {
          alert(res.message);
          return res.message;
        }

        setListServiceInOrder(res.servicesInOrder);
      })
      .catch(error => console.log(error));
  };

  const handleClickStatusGerador = () => {
    navigate(`/ordens-de-servicos/detalhe/andamento/status-gerador/${id}`);
  };

  const handleClickTesteGerador = () => {
    navigate(`/ordens-de-servicos/detalhe/andamento/teste-gerador/${id}`);
  };

  const handleClickPDF = ()  => {
    navigate(`/ordens-de-servicos/pdf/${id}`);
  };
  const handleClickAssinaturaCliente = ()  => {
    navigate(`/ordens-de-servicos/detalhe/andamento/assinatura-cliente/${id}`);
  };

  const handleSubmitFinalizar = (form: Partial<IOsFinalizada>) => {
    if (OsFinalizada) {
      const OSCompleta = {
        ...OsFinalizada,
        id: OsFinalizada?.id ? OsFinalizada.id : 0,
        client: {...cliente} as TPessoa,
        client_equipment: {...equipamento} as IEquipamento,
        technician: {...tecnico} as ITecnico,
        generalObservations: form.generalObservations??''
      };
  
      console.log(OSCompleta);
      OrdemServicoService.StartOrCancelOrFinish(Number(id), 'finalizar', OSCompleta)
        .then(res => {
          if(res instanceof Error) {
            alert(res.message);
            return res.message;
          }
  
          alert('Finalizado com sucesso');
          handleClickVoltar();
        })
        .catch(error => console.log(error));
    }

  };

  const handleClickVoltar = () => {
    navigate(-4);
  }; 

  return (
    <LayoutPaginas
      titulo="Área ordens serviços"
    >

      <Box>
        <Box display={'flex'} justifyContent={'space-between'} paddingBottom={1}>
          <Button variant='outlined' size='small' onClick={handleClickTesteGerador}>
            Teste gerador
          </Button>
          <Button variant='outlined' size='small' onClick={handleClickStatusGerador}>
            Status gerador
          </Button>
        </Box>
        <VFormOS
          formMethods={formMethods}
          submitForm={formMethods.handleSubmit(handleSubmitForm)}
        >
             
          <Box display={'flex'} flexDirection={'column'} gap={1}>
            <VInputSelect
              dataSelect={grupoServico ? grupoServico : [{id: 0, name: 'não foi possível consultar'}]}
            />
      
            <VAutoCompleteServicos
              control={formMethods.control}
              errors={formMethods.formState.errors}
              label='Serviços'
              name='service.id'    
              rules={{ require: 'Este campo é obrigatório' }}      
            />
      
            <Box display={'flex'} justifyContent={'center'} gap={smDown ? 5 : 30}>
              <VRadioVerificacaoServico
                control={formMethods.control}
                errors={formMethods.formState.errors}
                rules={{ require: 'Este campo é obrigatório' }}
                name="verificationBefore"
                label="Antes"
              />
      
              <VRadioVerificacaoServico
                control={formMethods.control}
                errors={formMethods.formState.errors}
                rules={{ require: 'Este campo é obrigatório' }}
                name="verificationAfter"
                label="Depois"
              />
            </Box>
      
            <Box display={'flex'} justifyContent={'center'} marginTop={1}>
              <Button type='submit' variant='contained'>
                  inserir serviço
              </Button>
            </Box>
      
            <Box>
              <Button
                onClick={handleClickRefresh}
                size='small'
              >
                <Icon>
                      refresh
                </Icon>
              </Button>
            </Box>
      
            <VTabelaServiceInOrder
              cabecalho={{Nome: 'service.name', Antes: 'verificationBefore', Depois : 'verificationAfter'}}
              pagina='ordens-de-servicos'
              dados={listServiceInOrder ? listServiceInOrder : [{id: 0, name: 'sem serviço'}]}
            />
          </Box>
      
        </VFormOS>
        
        <VFormOS
          formMethods={formMethodsFinalizar}
          submitForm={formMethodsFinalizar.handleSubmit(handleSubmitFinalizar)}
        >
          <Box display={'flex'} justifyContent={'space-between'} paddingTop={1} paddingBottom={1}>
            <Button variant='text' onClick={handleClickPDF}>
            PDF Prévia
            </Button>
            <Button variant='outlined' size='small' onClick={handleClickAssinaturaCliente}>
            Assinatura cliente
            </Button>
          </Box>
          <Divider/>
          <Box paddingTop={1}>
            <Controller
              name='generalObservations'
              control={formMethodsFinalizar.control}
              render={({field}) => (
                <TextField
                  {...field}
                  label={'Observavações gerais'}
                  fullWidth
                  margin="normal"
                  size="small"
                  helperText={'Este campo é obrigatório'}
                  InputLabelProps={{ shrink: !!field.value }}
                  type={'text'}
                  multiline={true}
                  rows={4}                
                />
              )}
            />
            <Box display={'flex'} justifyContent={'space-between'}>
              <Button variant='outlined' onClick={handleClickVoltar}>
            Voltar
              </Button>
              <Button variant='contained' type='submit'>
            Finalizar
              </Button>
            </Box>
          </Box>

        </VFormOS>
      </Box>

    </LayoutPaginas>
  );
};