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

const schema = yup.object().shape({
  tipoEquipamento: yup.string().required('Este campo é obrigatório'),
  numeroAlternador: yup.number().required('Este campo é obrigatório'),
  numeroMotor: yup.number().required('Este campo é obrigatório'),
  numero: yup.string().required('Este campo é obrigatório'),
  anoFabricacao: yup.number().typeError('O campo deve conter apenas números').required('Este campo é obrigatório'),
  potenciaEletrica: yup.number().typeError('O campo deve conter apenas números').required('Este campo é obrigatório'),
  potencia: yup.number().typeError('O campo deve conter apenas números').required('Este campo é obrigatório'),
  motor: yup.string().required('Este campo é obrigatório'),
  alternador: yup.string().required('Este campo é obrigatório'),
  uscaModelo: yup.string().required('Este campo é obrigatório'),
  tensao: yup.number().typeError('O campo deve conter apenas números').required('Este campo é obrigatório'),
  corrente: yup.number().typeError('O campo deve conter apenas números').required('Este campo é obrigatório'),
  modeloMotor: yup.string().required('Este campo é obrigatório'),
  modeloAlternador: yup.string().required('Este campo é obrigatório'),
  painelControle: yup.string().required('Este campo é obrigatório'),
  fabricante: yup.string().required('Este campo é obrigatório'),
  fatorPotencia: yup.number().typeError('O campo deve conter apenas números').required('Este campo é obrigatório'),
  frequencia: yup.number().typeError('O campo deve conter apenas números').required('Este campo é obrigatório'),
  horimetro: yup.number().typeError('O campo deve conter apenas números').required('Este campo é obrigatório'),
});

export const PaginaEquipamento: React.FC = () => {
  const [nomeEquipamento, setNomeEquipamento] = useState<NomeEquipamento[]>([]);
  const [equipamento, setEquipamento] = useState<IEquipamento>();
  const [editing, setEditing] = useState<boolean>(false);
  const formMethods = useForm<IEquipamentoDetalhe>({
    resolver: yupResolver(schema),
  });
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
          rules={{ required: 'Este campo é obrigatório' }}
        />

        <VTextFieldEquipamento
          name="numeroAlternador"
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label="Número do Alternador"
          rules={{
            required: 'Este campo é obrigatório',
            pattern: {
              value: /^[0-9]+$/,
              message: 'O campo deve conter apenas números'
            }
          }}
        />

        <VTextFieldEquipamento
          name="numeroMotor"
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label="Número do Motor"
          rules={{
            required: 'Este campo é obrigatório',
            pattern: {
              value: /^[0-9]+$/,
              message: 'O campo deve conter apenas números'
            }
          }}
        />

        <VTextFieldEquipamento
          name="numero"
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label="Número"
          rules={{ required: 'Este campo é obrigatório' }}
        />

        <VTextFieldEquipamento
          name="anoFabricacao"
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label="Ano de Fabricação"
          type='number'
          rules={{
            required: 'Este campo é obrigatório',
            pattern: {
              value: /^[0-9]+$/,
              message: 'O campo deve conter apenas números'
            }
          }}
        />

        <VTextFieldEquipamento
          name="potenciaEletrica"
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label="Potência Elétrica"
          rules={{
            required: 'Este campo é obrigatório',
            pattern: {
              value: /^[0-9]+$/,
              message: 'O campo deve conter apenas números'
            }
          }}
        />

        <VTextFieldEquipamento
          name="potencia"
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label="Potência"
          rules={{
            required: 'Este campo é obrigatório',
            pattern: {
              value: /^[0-9]+$/,
              message: 'O campo deve conter apenas números'
            }
          }}
        />

        <VTextFieldEquipamento
          name="motor"
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label="Motor"
          rules={{ required: 'Este campo é obrigatório' }}
        />

        <VTextFieldEquipamento
          name="alternador"
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label="Alternador"
          rules={{ required: 'Este campo é obrigatório' }}
        />

        <VTextFieldEquipamento
          name="uscaModelo"
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label="USCA Modelo"
          rules={{ required: 'Este campo é obrigatório' }}
        />

        <VTextFieldEquipamento
          name="tensao"
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label="Tensão"
          rules={{
            required: 'Este campo é obrigatório',
            pattern: {
              value: /^[0-9]+$/,
              message: 'O campo deve conter apenas números'
            }
          }}
        />

        <VTextFieldEquipamento
          name="corrente"
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label="Corrente"
          rules={{
            required: 'Este campo é obrigatório',
            pattern: {
              value: /^[0-9]+$/,
              message: 'O campo deve conter apenas números'
            }
          }}
        />

        <VTextFieldEquipamento
          name="modeloMotor"
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label="Modelo do Motor"
          rules={{ required: 'Este campo é obrigatório' }}
        />

        <VTextFieldEquipamento
          name="modeloAlternador"
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label="Modelo do Alternador"
          rules={{ required: 'Este campo é obrigatório' }}
        />

        <VTextFieldEquipamento
          name="painelControle"
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label="Painel de Controle"
          rules={{ required: 'Este campo é obrigatório' }}
        />

        <VTextFieldEquipamento
          name="fabricante"
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label="Fabricante"
          rules={{ required: 'Este campo é obrigatório' }}
        />

        <VTextFieldEquipamento
          name="fatorPotencia"
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label="Fator de Potência"
          rules={{
            required: 'Este campo é obrigatório',
            pattern: {
              value: /^[0-9]+$/,
              message: 'O campo deve conter apenas números'
            }
          }}
        />

        <VTextFieldEquipamento
          name="frequencia"
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label="Frequência"
          rules={{
            required: 'Este campo é obrigatório',
            pattern: {
              value: /^[0-9]+$/,
              message: 'O campo deve conter apenas números'
            }
          }}
        />

        <VTextFieldEquipamento
          name="horimetro"
          control={formMethods.control}
          errors={formMethods.formState.errors}
          label="Horímetro"
          rules={{
            required: 'Este campo é obrigatório',
            pattern: {
              value: /^[0-9]+$/,
              message: 'O campo deve conter apenas números'
            }
          }}
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
