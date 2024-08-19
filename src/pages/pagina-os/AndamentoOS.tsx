import { Controller, useForm } from 'react-hook-form';
import { VAutoCompleteServicos, VFormOS, VTabelaServiceInOrder } from '../../shared/forms/formOS';
import { LayoutPaginas } from '../../shared/Layout';
import { Box, Button, Divider, FormControlLabel, Icon, Radio, RadioGroup, Theme, useMediaQuery,  } from '@mui/material';
import { VInputSelect } from '../../shared/Components';
import { IOs, IServiceInOrder, IServiceInOrderOutput } from '../../shared/Service/api-JAVA/models/OrdemServico';
import { Idata, IGroupAllDTOOutputList, IGrupo } from '../../shared/Service/api-JAVA/models/GruposServicos';
import { useEffect, useState } from 'react';
import { GruposServicosService } from '../../shared/Service/api-JAVA/grupos-servicos/GruposServicosService';
import { VRadioVerificacaoServico } from '../../shared/forms/formOS/fields/VRadioVerificacaoServico';
import { OrdemServicoService } from '../../shared/Service/api-JAVA/ordem_servico/OrdemServicoService';
import { useNavigate, useParams } from 'react-router';
import { error } from 'console';
import { DetalheOsAndamento } from './DetalheOsAndamento';

export const AndamentoOS:React.FC = () => {
  const formMethods = useForm<IServiceInOrder>();
  const smDown = useMediaQuery((theme:  Theme)=> theme.breakpoints.down('sm'));
  const [grupoServico, setGrupoServico] = useState<IGrupo[]>();
  const [listServiceInOrder, setListServiceInOrder] = useState<IServiceInOrderOutput[]>();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmitForm = (form: IServiceInOrder) => {
    OrdemServicoService.createServiceInOrder(Number(id), form)
      .then( res => {
        if (res instanceof Error) {
          alert(res.message);
          return res.message;
        }

        alert('Cadastrado com sucesso');
        formMethods.reset({});
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

  return (
    <LayoutPaginas
      titulo="Área ordens serviços"
    >

      <Box>
        <Box display={'flex'} justifyContent={'space-between'} paddingBottom={1}>
          <Button variant='contained' size='small' onClick={handleClickTesteGerador}>
            Teste gerador
          </Button>
          <Button variant='contained' size='small' onClick={handleClickStatusGerador}>
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
              <Button type='submit'>
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
        <Box display={'flex'} justifyContent={'space-between'} paddingTop={1}>
          <Button variant='text' onClick={handleClickPDF}>
            PDF Prévia
          </Button>
          <Button variant='contained'>
            Finalizar
          </Button>
        </Box>
      </Box>

    </LayoutPaginas>
  );
};