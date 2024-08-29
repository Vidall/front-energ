import { useParams, useSearchParams } from 'react-router-dom';
import { LayoutPaginas } from '../../shared/Layout';
import { VFormEquipamentos } from '../../shared/forms/formEquipamentos';
import { EquipamentosService } from '../../shared/Service/api-TS/equipamentos/EquipamentosService';
import { useEffect, useState } from 'react';
import { VTextFieldEquipamento } from '../../shared/forms/formEquipamentos/fields/VTextFieldEquipamento';
import { useForm } from 'react-hook-form';
import { IEquipamento, IEquipamentoDetalhe } from '../../shared/Service/api-TS/models/Equipamentos';
import { Box, Button, Divider, Icon } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface NomeEquipamento {
  id: number;
  name: string;
}


export const PaginaEquipamento: React.FC = () => {
  const [nomeEquipamento, setNomeEquipamento] = useState<NomeEquipamento[]>([]);
  const [equipamento, setEquipamento] = useState<IEquipamento>();
  const [editing, setEditing] = useState<boolean>(false);
  const formMethods = useForm<IEquipamentoDetalhe>();
  const [searchParams, setSearchParams] = useSearchParams();

  const tipo = searchParams.get('tipo') as 'fisico' | 'juridico';
  const grupo = Number(searchParams.get('grupo'));
  const { id } = useParams<{ id: string }>();

  const handleSubmitForm = (formData: IEquipamentoDetalhe) => {
    if (editing) {
      const EquipamentoComId: Omit<IEquipamento, 'id'> = { equipamento: { ...formData }, idCliente: Number(id), tipo: tipo };
      EquipamentosService.updateById(Number(grupo), EquipamentoComId)
        .then(res => {
          if (res instanceof Error) {
            console.log(tipo);
            return res.message;
          }

          alert('Editado com sucesso');
        });
    } else {
      const EquipamentoComId: Omit<IEquipamento, 'id'> = { equipamento: { ...formData }, idCliente: Number(id), tipo: tipo };
      EquipamentosService.create(EquipamentoComId)
        .then(res => {
          if (res instanceof Error) {
            console.log(res.message);
            return res.message;
          }

          alert('Cadastrado com sucesso');
        });
    }
  };

  useEffect(() => {
    EquipamentosService.getByID(Number(id), tipo)
      .then(res => {
        if (res instanceof Error) {
          console.log(res.message);
          return res.message;
        }

        if (nomeEquipamento.length === 0) {
          const updatedEquipamentos = res.map(item => ({
            id: item.id,
            name: item.equipamento.tipoEquipamento,
          }));

          setNomeEquipamento(updatedEquipamentos);
        }
      })
      .catch(error => console.log(error));
  }, [id, tipo]);

  useEffect(() => {
    setEditing(grupo ? true : false);
    if (grupo) {
      EquipamentosService.getByIdEquipamento(Number(grupo))
        .then(res => {
          if (res instanceof Error) {
            return res.message;
          }
          if (res.equipamento !== undefined) {
            setEquipamento(res);
          };
          formMethods.reset(res.equipamento);
        });
    }
  }, [grupo]);

  const handleClickAdd = () => {
    setEditing(false);
    formMethods.reset({});
    setSearchParams({...Object.fromEntries(searchParams.entries()), grupo: '0'}, {replace: true});
  };

  return (
    <LayoutPaginas titulo="Área equipamento">

      <Box display={'flex'} alignContent={'center'} justifyContent={'end'}>
        <Button onClick={handleClickAdd}>
            Novo
          <Icon>
            add
          </Icon>
        </Button>
      </Box>
      <VFormEquipamentos
        submitForm={formMethods.handleSubmit(handleSubmitForm)}
        dataSelect={nomeEquipamento}
        formMethods={formMethods}
      >
        <Divider sx={{ margin: '16px 0', borderColor: 'black' }} />

        <VTextFieldEquipamento
          name="tipoEquipamento"
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label="Tipo do Equipamento"
        />

        <VTextFieldEquipamento
          name="numeroAlternador"
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label="Número do Alternador"
        />

        <VTextFieldEquipamento
          name="numeroMotor"
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label="Número do Motor"
        />

        <VTextFieldEquipamento
          name="numero"
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label="Número"
        />

        <VTextFieldEquipamento
          name="anoFabricacao"
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label="Ano de Fabricação"
        />

        <VTextFieldEquipamento
          name="potenciaEletrica"
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label="Potência Elétrica"
        />

        <VTextFieldEquipamento
          name="potencia"
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label="Potência"
        />

        <VTextFieldEquipamento
          name="motor"
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label="Motor"
        />

        <VTextFieldEquipamento
          name="alternador"
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label="Alternador"
        />

        <VTextFieldEquipamento
          name="uscaModelo"
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label="USCA Modelo"
        />

        <VTextFieldEquipamento
          name="tensao"
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label="Tensão"
        />

        <VTextFieldEquipamento
          name="corrente"
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label="Corrente"
        />

        <VTextFieldEquipamento
          name="modeloMotor"
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label="Modelo do Motor"
        />

        <VTextFieldEquipamento
          name="modeloAlternador"
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label="Modelo do Alternador"
        />

        <VTextFieldEquipamento
          name="painelControle"
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label="Painel de Controle"
        />

        <VTextFieldEquipamento
          name="fabricante"
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label="Fabricante"
        />

        <VTextFieldEquipamento
          name="fatorPotencia"
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label="Fator de Potência"
        />

        <VTextFieldEquipamento
          name="frequencia"
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label="Frequência"
        />

        <VTextFieldEquipamento
          name="horimetro"
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label="Horímetro"
        />

        <Box display={'flex'} justifyContent={'end'} alignContent={'center'} paddingTop={1}>
          <Button type='submit' variant='contained'>
            {editing ? 'Editar' : 'Cadastrar'}
          </Button>
        </Box>
      </VFormEquipamentos>
    </LayoutPaginas>
  );
};
