import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Box, Button, Paper, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { GruposServicosService } from '../../Service/api-JAVA/grupos-servicos/GruposServicosService';
import { ServicosService } from '../../Service/api-JAVA/servicos/ServicosService';
import { IServices } from '../../Service/api-JAVA/models/GruposServicos';
import { VInputSelect } from '../../Components';
import { VTextFieldServicos } from './fields';

interface IVFormProps {
  name: string,
  description: string
}

export const VFormServicos: React.FC = () => {
  const [grupoServicoData, setGrupoServicoData] = useState<{id: number, name: string}[]>();
  const { control, handleSubmit, formState: { errors }, reset, trigger } = useForm<IVFormProps>();
  const [searchParms, setSearchParms] = useSearchParams();
  const [rows, setRows] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [nomeGrupo, setNomeGrupo] = useState('');

  const grupo = searchParms.get('grupo');

  useEffect(() => {
    if (!id) {
      GruposServicosService.getAll()
        .then(res => {
          if (res instanceof Error) {
            return res.message;
          }
          setGrupoServicoData(res.data._embedded.groupAllDTOOutputList);
        });
    }

    if (id) {
      ServicosService.getByID(Number(id))
        .then(res => {
          if (res instanceof Error) {
            return res.message;
          }

          reset(res);
          setGrupoServicoData([{id: 1, name: res.groupServices.name}]);
          setNomeGrupo(res.groupServices.name);
        });
    }
  }, [id, reset]);

  const handleSubmitForm = async (formData: Omit<IServices, 'id' | 'groupServices'>) => {
    const isValid = await trigger(['name', 'description']);
    if (isValid) {
      if (!Number(id)) {
        ServicosService.create(Number(grupo), formData)
          .then(res => {
            if (res instanceof Error) {
              alert(res.message);
              return;
            }
            alert('Registro criado com sucesso');
            navigate(`/servicos?tipo=Todos&grupo=${grupo}`);
          });
      } else {
        ServicosService.updateById(Number(id), formData)
          .then(res => {
            if (res instanceof Error) {
              alert(res.message);
              return;
            }
            alert('Registro atualizado com sucesso');
            navigate(`/servicos?tipo=Todos&grupo=${grupo}`);
          })
          .catch(error => console.error(error));
      }
    }
  };

  return (
    <Paper component={Box} padding={1}>
      <form onSubmit={handleSubmit(handleSubmitForm)} ref={formRef}>
        {!id && (
          <VInputSelect
            grupoServicoData={grupoServicoData ? grupoServicoData : [{ id: 0, name: 'não foi possível consultar' }]}
          />
        )}
        {id && (
          <TextField
            fullWidth
            size='small'
            value={nomeGrupo}
            disabled={true}
          />
        )}
        <VTextFieldServicos
          control={control}
          errors={errors}
          name='name'
          label='Nome do Serviço'
          rules={{ required: 'Este campo é obrigatório' }}
        />
        <VTextFieldServicos
          control={control}
          errors={errors}
          name='description'
          label='Descrição'
          rules={{ required: 'Este campo é obrigatório' }}
        />
        <Box
          display={'flex'}
          alignContent={'center'}
          justifyContent={'end'}
          paddingTop={1}
        >
          <Button type='submit' variant='contained'>
            {id ? 'Editar' : 'Cadastrar'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};
