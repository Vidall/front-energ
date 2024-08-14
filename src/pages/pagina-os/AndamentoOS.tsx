import { Controller, useForm } from 'react-hook-form';
import { VFormOS } from '../../shared/forms/formOS';
import { LayoutPaginas } from '../../shared/Layout';
import { Box, Button } from '@mui/material';
import { VInputSelect } from '../../shared/Components';
import { IOs } from '../../shared/Service/api-JAVA/models/OrdemServico';
import { Idata, IGroupAllDTOOutputList, IGrupo } from '../../shared/Service/api-JAVA/models/GruposServicos';
import { useEffect, useState } from 'react';
import { GruposServicosService } from '../../shared/Service/api-JAVA/grupos-servicos/GruposServicosService';

export const AndamentoOS:React.FC = () => {
  const formMethods = useForm<Idata>();
  const [grupoServico, setGrupoServico] = useState<IGrupo[]>();

  const handleSubmitForm = (form: any) => {
    console.log(grupoServico);
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
  });

  return (
    <LayoutPaginas
      titulo="Área ordens serviços"
    >
      <VFormOS
        formMethods={formMethods}
        submitForm={formMethods.handleSubmit(handleSubmitForm)}
      >
       
        <VInputSelect
          dataSelect={grupoServico ? grupoServico : [{id: 0, name: 'não foi possível consultar'}]}
        />

        <Box display={'flex'} justifyContent={'center'} marginTop={1}>
          <Button type='submit'>
          inserir serviço
          </Button>
        </Box>

      </VFormOS>
    </LayoutPaginas>
  );
};