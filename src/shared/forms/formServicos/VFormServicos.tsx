import { Box, Button, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { VTextFieldServicos } from './fields';
import { useEffect, useRef, useState } from 'react';
import { VInputSelect } from '../../Components';
import { GruposServicosService } from '../../Service/api-JAVA/grupos-servicos/GruposServicosService';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IServices } from '../../Service/api-JAVA/models/GruposServicos';

interface IVFormProps {
  name: string,
  description: string
}

export const VFormServicos: React.FC = () => {
  const [grupoServicoData, setGrupoServicoData] = useState<{id: number, name: string}[]>();
  const {control, handleSubmit, formState: { errors }, reset} = useForm<IVFormProps>();
  const [searchParms, setSearchParms] = useSearchParams();
  const [rows, setRows] = useState();
  const navigate = useNavigate();
  const formRef = useRef(null);

  const grupo = searchParms.get('grupo');

  useEffect(() => {
    GruposServicosService.getAll()
      .then(res => {
        if (res instanceof Error) {
          return res.message;
        }
        setGrupoServicoData(res.data._embedded.groupAllDTOOutputList);
      });
  }, []);

  const handleSubmitForm = (formData: Omit<IServices, 'id' | 'groupServices'>) => {
    GruposServicosService.create(Number(grupo), formData)
      .then(res => {
        if (res instanceof Error) {
          return  res.message;
        }

        alert('Registro criado com sucesso');
        navigate(`/servicos?tipo=Todos&grupo=${grupo}`);

      });
  };

  return (
    <Paper component={Box} padding={1}>

      <form onSubmit={handleSubmit(handleSubmitForm)} ref={formRef}>
        
        <VInputSelect
          grupoServicoData={grupoServicoData ? grupoServicoData : [{id: 0, name: 'não foi possível consultar'}]}
        />
        <VTextFieldServicos
          control={control}
          errors={errors}
          name='name'
          label='Nome do Serviço'
          rules={{require: 'Este campo é obrigatório'}}
        />

        <VTextFieldServicos
          control={control}
          errors={errors}
          name='description'
          label='Descrição'
          rules={{require: 'Este campo é obrigatório'}}
        />

        <Box
          display={'flex'}
          alignContent={'center'}
          justifyContent={'end'}
          paddingTop={1}>
          <Button type='submit' variant='contained'>
          Cadastrar

          </Button>
        </Box>
      </form>

    </Paper>
  );
};