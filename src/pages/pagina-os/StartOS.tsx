import { Box, Button, TextField } from '@mui/material';
import { LayoutPaginas } from '../../shared/Layout';
import { useNavigate, useParams } from 'react-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { OrdemServicoService } from '../../shared/Service/api-JAVA/ordem_servico/OrdemServicoService';
import { PessoaFisicaService } from '../../shared/Service/api-TS/clientes/PessoaFisicaService';
import { IGetByIdOrdemStart } from '../../shared/Service/api-JAVA/models/OrdemServico';
import { PessoaJuridicaService } from '../../shared/Service/api-TS/clientes/PessoaJuridicaService';
import { TecnicoService } from '../../shared/Service/api-TS/tecnicos/TecnicoService';
import { ITecnico } from '../../shared/Service/api-TS/models/Tecnico';
import { IPessoaFisica, IPessoaJuridica } from '../../shared/Service/api-TS/models/Clientes';

export const StartOS: React.FC = () => {
  const[clienteId, setClienteId] = useState<number>();
  const[tecnicoId, setTecnicoId] = useState<number>();
  const[tecnico, setTecnico] = useState<ITecnico>();
  const[cliente, setCliente] = useState<IPessoaFisica | IPessoaJuridica>();
  const [status, setStatus] = useState<string>();
  const [dataAgendado, setDataAgendado] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const clienteData = useCallback((res: IGetByIdOrdemStart, tipo: 'FISICO' | 'JURIDICO') => {
    if ( tipo === 'FISICO') {
      return PessoaFisicaService.getByID(Number(res.client_id))
        .then(res => {
          if (res instanceof Error) {
            alert(res.message);
            return res.message;
          }

          setCliente(res);
    
        })
        .catch(error => console.log(error));
    } else if (tipo === 'JURIDICO') {
      return PessoaJuridicaService.getByID(Number(res.client_id))
        .then(res => {
          if (res instanceof Error) {
            alert(res.message);
            return res.message;
          }

          setCliente(res);
    
        })
        .catch(error => console.log(error));
    }
  },[]);
  const tecnicoData = useCallback((res: IGetByIdOrdemStart) => {
    return TecnicoService.getByID(Number(res.technician_id))
      .then(res => {
        if (res instanceof Error) {
          alert(res.message);
          return res.message;
        }

        setTecnico(res);
    
      })
      .catch(error => console.log(error));
  
  },[]);

  useEffect(() => {

    OrdemServicoService.getByIdOrdemStart(Number(id))
      .then(res => {
        if(res instanceof Error) {
          alert(res.message);
          return res.message;
        }
        
        setDataAgendado(res.scheduledDate);
        setClienteId(res.client_id!);
        setClienteId(res.technician_id!);
        
        clienteData(res, res.client_type as 'FISICO' | 'JURIDICO');
        tecnicoData(res);
        setStatus(res.status);
        if (res.status === 'ANDAMENTO') {
          navigate(`/ordens-de-servicos/andamento/${id}`);
        }
      })
      .catch(error => console.log(error));


  }, []);

  const handleClickStart = () => {
    OrdemServicoService.StartOrCancelOrFinish(Number(id), 'iniciar')
      .then(res => {
        if (res instanceof Error) {
          alert(res.message);
          return res.message;
        }

        alert('Serviço iniciado');
        navigate('/ordens-de-servicos?tipo=Todos');
        
      })
      .catch(error => console.error(error));
  };

  const handleClickCancel = () => {
    OrdemServicoService.StartOrCancelOrFinish(Number(id), 'cancelar')
      .then(res => {
        if (res instanceof Error) {
          alert(res.message);
          return res.message;
        }

        alert('Serviço cancelado');
        navigate('/ordens-de-servicos?tipo=Todos');
        
      })
      .catch(error => console.error(error));
  };

  return (
    <LayoutPaginas
      titulo='Área da Ordem de serviço'
    >
      <form>
        <Box display={'flex'} flexDirection={'column'} marginBottom={1} gap={1}>
          <TextField
            disabled
            fullWidth
            size='small'
            value={tecnico?.nome}
            label={'Técnico'}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            disabled
            fullWidth
            size='small'
            value={cliente?.nome}
            label={'Cliente'}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            disabled
            fullWidth
            size='small'
            value={dataAgendado}
            label={'Data do serviço'}
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} gap={1}>
          <Button variant='contained' onClick={handleClickStart} disabled={status !== 'ABERTO' ? true : false}>
            Iniciar
          </Button>
          <Button variant='outlined' onClick={handleClickCancel} disabled={status === 'CANCELADO' ? true : false}>
          Cancelar
          </Button>
        </Box>
      </form>
    </LayoutPaginas>
    
  );
};