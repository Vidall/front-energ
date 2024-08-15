import { Controller, useForm } from 'react-hook-form';
import { VFormOS } from '../../shared/forms/formOS/VFormOS';
import { VAutoCompletePessoa, VAutoCompleteTecnicos, VCalendarAndTime, VTextFieldOS } from '../../shared/forms/formOS';
import { IEquipamentoDetalhe } from '../../shared/Service/api-TS/models/Equipamentos';
import { IOs } from '../../shared/Service/api-JAVA/models/OrdemServico';
import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IEndereco } from '../../shared/Service/api-TS/models/Clientes';
import { OrdemServicoService } from '../../shared/Service/api-JAVA/ordem_servico/OrdemServicoService';
import { error } from 'console';
import { useNavigate } from 'react-router';
import { VInputSelect } from '../../shared/Components';

export const DetalheOs: React.FC = () => {
  const formMethods = useForm<IOs>();
  const [tipoPessoa, setTipoPessoa] = useState<string>('');
  const [enderecoSelecionado, setEnderecoSelecionado] = useState<IEndereco | undefined>(undefined);
  const navigate = useNavigate();

  const handleSubmitForm = (form: IOs) => {
    console.log(form);
    OrdemServicoService.create(form)
      .then(res => {
        if (res instanceof Error) {
          alert(res.message);
          return res.message;
        }

        alert('Criado com sucesso');
        navigate('ordens-de-servicos?tipo=Todos');
      })
      .catch(error => console.log(error));

  };

  const handleTipoPessoa = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTipoPessoa(value);
  };

  const handleChangeEndereco = (event: React.ChangeEvent<HTMLInputElement>) => {
    const e: 'cadastrado' | 'novo' = event.target.value as 'cadastrado' | 'novo';
  
    // Resetando todos os campos antes de qualquer operação
    formMethods.setValue('endereco.rua', '');
    formMethods.setValue('endereco.numero', 0);
    formMethods.setValue('endereco.bairro', '');
    formMethods.setValue('endereco.cidade', '');
  
    if (e === 'cadastrado' && enderecoSelecionado) {
      // Obtendo os valores do endereço selecionado
      const rua = enderecoSelecionado.rua || '';
      const numero = enderecoSelecionado.numero || 0;
      const bairro = enderecoSelecionado.bairro || '';
      const cidade = enderecoSelecionado.cidade || '';
  
      // Definindo os valores nos campos
      formMethods.setValue('endereco.rua', rua);
      formMethods.setValue('endereco.numero', numero!);
      formMethods.setValue('endereco.bairro', bairro); 
      formMethods.setValue('endereco.cidade', cidade);
    } else if (e === 'novo') {
      formMethods.setValue('endereco.rua', '');
      formMethods.setValue('endereco.numero', 0);
      formMethods.setValue('endereco.bairro', '');
      formMethods.setValue('endereco.cidade', '');

    }
  };

  const handleEnderecoChange = (endereco: IEndereco) => {
    const ObjectEndereco = Array(endereco)[0];
    console.log(ObjectEndereco);
    setEnderecoSelecionado(endereco);
  };

  return (
    <VFormOS
      formMethods={formMethods}
      submitForm={formMethods.handleSubmit(handleSubmitForm)}
    >
      <Box marginBottom={1}>
        <Controller
          name='type'
          control={formMethods.control}
          rules={{ required: 'Este campo é obrigatório' }}
          render={({ field }) => (
            <VInputSelect
              isValueType={true}
              dataSelect={[{ id: 1, name: 'PREVENTIVA' }, { id: 2, name: 'CORRETIVA' }]}
              value={field.value} // valor controlado pelo React Hook Form
              onChange={(event) => {
                field.onChange(event.target.value); // propaga o valor para o React Hook Form
              }}
            />
          )}
        />
      </Box>

      <VAutoCompleteTecnicos
        control={formMethods.control}
        errors={formMethods.formState.errors}
        label='Técnico'
        name='technician_id'
      />

      <Controller
        control={formMethods.control}
        name="client_type"
        render={({ field }) => (
          <RadioGroup
            {...field}
            row
            onChange={(e) => {
              field.onChange(e); // Chama o onChange do react-hook-form
              handleTipoPessoa(e); // Mantém a função adicional
            }}
          >
            <FormControlLabel value="FISICO" control={<Radio />} label="Pessoa Física" />
            <FormControlLabel value="JURIDICO" control={<Radio />} label="Pessoa Jurídica" defaultValue="JURIDICO" />
          </RadioGroup>
        )}
      />

      <VAutoCompletePessoa
        onEnderecoChange={handleEnderecoChange}
        name='client_id'
        control={formMethods.control}
        errors={formMethods.formState.errors}
        label='Cliente'
        tipo={tipoPessoa}
      />

      {/* <VTextFieldOS
        control={formMethods.control}
        errors={formMethods.formState.errors}
        name='client_id'
        label='Cliente'
      /> */}

      <FormControl>
        <FormLabel>Escolha o endereço</FormLabel>
        <RadioGroup
          row
          onChange={handleChangeEndereco}
        >
          <FormControlLabel value="novo" control={<Radio />} label="Novo" />
          <FormControlLabel value="cadastrado" control={<Radio />} label="Cadastrado"/>

        </RadioGroup>
      </FormControl>

      <VTextFieldOS
        control={formMethods.control}
        errors={formMethods.formState.errors}
        name='endereco.rua'
        label='Rua'
      />
      <VTextFieldOS
        control={formMethods.control}
        errors={formMethods.formState.errors}
        name='endereco.numero'
        label='Número'
      />
      <VTextFieldOS
        control={formMethods.control}
        errors={formMethods.formState.errors}
        name='endereco.bairro'
        label='Bairro'
      />
      <VTextFieldOS
        control={formMethods.control}
        errors={formMethods.formState.errors}
        name='endereco.cidade'
        label='Cidade'
      />

      <VCalendarAndTime
        name='scheduledDate'
        control={formMethods.control}
        label='Data e hora do serviço'
        errors={formMethods.formState.errors}
        rules={{require: 'Este campo é obrigatório'}}
      />

      <VTextFieldOS
        control={formMethods.control}
        errors={formMethods.formState.errors}
        name='escopoDosServicos'
        label='Escopo'
        isMultiline={true}
      />

      <Box display={'flex'} alignContent={'center'} justifyContent={'end'} marginTop={1}>
        <Button type='submit' variant='contained'>Cadastrar</Button>
      </Box>
     
    </VFormOS>
  );
};