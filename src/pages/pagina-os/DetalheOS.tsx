import { useForm } from 'react-hook-form';
import { VFormOS } from '../../shared/forms/formOS/VFormOS';
import { VTextFieldOS } from '../../shared/forms/formOS';
import { IEquipamentoDetalhe } from '../../shared/Service/api-TS/models/Equipamentos';
import { IOs } from '../../shared/Service/api-JAVA/models/OrdemServico';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

export const DetalheOs: React.FC = () => {
  const formMethods = useForm<IOs>();

  const handleSubmitForm = () => {
    console.log('Form enviado');
  };

  return (
    <VFormOS
      formMethods={formMethods}
      submitForm={formMethods.handleSubmit(handleSubmitForm)}
    >
      <VTextFieldOS
        control={formMethods.control}
        errors={formMethods.formState.errors}
        name='technician_id'
        label='Tecnico'
      />

      <FormControl>
        <RadioGroup
          row
          onChange={(event) => console.log(event.target.value)}
        >
          <FormControlLabel value="pessoaFisica" control={<Radio />} label="Pessoa Física" />
          <FormControlLabel value="pessoaJuridica" control={<Radio />} label="Pessoa Juridica" defaultValue={'pessoaJuridica'} defaultChecked/>

        </RadioGroup>
      </FormControl>

      <VTextFieldOS
        control={formMethods.control}
        errors={formMethods.formState.errors}
        name='client_id'
        label='Cliente'
      />

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
     
    </VFormOS>
  );
};