import { Box, Button, FormControl, FormControlLabel, Paper, Radio, Theme, useMediaQuery } from '@mui/material';
import { useParams, useSearchParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { PessoaJuridicaService } from '../../Service/api-TS/clientes/PessoaJuridicaService';
import { PessoaFisicaService } from '../../Service/api-TS/clientes/PessoaFisicaService';
import { parserDataCliente } from '../../utils/parserDataCliente';
import { TPessoa } from '../../Service/api-TS/models/Clientes';
import { VTextFieldCliente, VRadioField } from './fields';

/*eslint-disable react/prop-types*/
export const VFormCliente: React.FC = () => {
  const [data, setData] = useState<TPessoa>();
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const [searchParams, setSearchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [finalStep] = useState(4);
  const formRef = useRef(null);
  const { id } = useParams();

  const { control, handleSubmit, formState: { errors }, trigger, watch, reset } = useForm<TPessoa>({
    defaultValues: {}  // Definindo o valor padrão
  });

  const selectedValueTipo = watch('tipo'); // Obtendo o valor selecionado do tipo

  useEffect(() => {
    if (!smDown) {
      setStep(1);
    }
    
    if (Number(id) && searchParams.get('tipoPessoa') === 'fisico') {
      PessoaFisicaService.getByID(Number(id))
        .then(res => {
          if (res instanceof Error) {
            return alert(res.message);
          }

          setData(res);
          reset(res);
        });
    }else if(Number(id) && searchParams.get('tipoPessoa') === 'juridico') {
      PessoaJuridicaService.getByID(Number(id))
        .then(res => {
          if (res instanceof Error) {
            return alert(res.message);
          }

          setData(res);
          reset(res);
        });
    }
  }, [reset, smDown, id]);

  const handleClickProximo = async () => {
    let valid = true;
    if (step === 1 || !smDown) {
      valid = await trigger(['endereco.rua', 'endereco.numero', 'endereco.bairro', 'endereco.cidade']);
    } else if (step === 2) {
      valid = await trigger(['telefone', 'email', 'nomeContato']);
    } else if (step === 3) {
      valid = await trigger(['nome', 'cpf', 'cnpj']);
    }

    if (valid) {
      setStep(step => step + 1);
    }
  };

  const handleClickAnterior = () => {
    if (step !== 1) setStep(step => step - 1);
  };

  const handleSubmitFormPessoaFisica = async (formData: TPessoa) => {
    const isValid = await trigger();
    if (isValid) {
      /*eslint-disable-next-line*/ 
      const { id: _id, ...restData } = formData; // Remover o campo id
      if (Number(id)) {               
        PessoaFisicaService.updateById(Number(id), parserDataCliente(restData))
          .then((res) => {
            if (res instanceof Error) {
              console.log(parserDataCliente(restData));
              return alert(res.message);
            }
  
            setData(formData);
            alert('Atualizado com sucesso');
            formData.tipo === 'fisico' ? 
              setSearchParams({ ...Object.fromEntries(searchParams.entries()), tipo: 'Fisico' }, { replace: true }) 
              : 
              setSearchParams({ ...Object.fromEntries(searchParams.entries()), tipo: 'Juridico' }, { replace: true });
          })
          .catch(error => console.log(error));
      } else {
        PessoaFisicaService.create(parserDataCliente(restData))
          .then((res) => {
            if (res instanceof Error) {
              return alert(res.message);
            }
  
            setData(formData);
            alert('Criado com sucesso');
            formData.tipo === 'fisico' ? 
              setSearchParams({ ...Object.fromEntries(searchParams.entries()), tipo: 'Fisico' }, { replace: true }) 
              : 
              setSearchParams({ ...Object.fromEntries(searchParams.entries()), tipo: 'Juridico' }, { replace: true });
          })
          .catch(error => console.log(error));
      }
    } else {
      alert('Campo sem validar');
    }
  };

  const handleSubmitFormPessoaJuridica = async (formData: TPessoa) => {
    const isValid = await trigger();
    if (isValid) {
      
      if (Number(id)) {
        /*eslint-disable-next-line*/
        const { id: _id, ...restData } = formData; // Remover o campo id
        PessoaJuridicaService.updateById(Number(id), parserDataCliente(formData))
          .then((res) => {
            if (res instanceof Error) {
              return alert(res.message);
            }
  
            setData(formData);
            alert('Atualizado com sucesso');
            formData.tipo === 'fisico' ? 
              setSearchParams({ ...Object.fromEntries(searchParams.entries()), tipo: 'Fisico' }, { replace: true }) 
              : 
              setSearchParams({ ...Object.fromEntries(searchParams.entries()), tipo: 'Juridico' }, { replace: true });
          })
          .catch(error => console.log(error));
      } else {
        PessoaJuridicaService.create(parserDataCliente(formData))
          .then((res) => {
            if (res instanceof Error) {
              return alert(res.message);
            }
  
            setData(formData);
            alert('Criado com sucesso');
            formData.tipo === 'fisico' ? 
              setSearchParams({ ...Object.fromEntries(searchParams.entries()), tipo: 'Fisico' }, { replace: true }) 
              : 
              setSearchParams({ ...Object.fromEntries(searchParams.entries()), tipo: 'Juridico' }, { replace: true });
          })
          .catch(error => console.log(error));
      }
    } else {
      alert('Campo sem validar');
    }
  };

  return (
    <Paper component={Box} padding={2}>
      <form onSubmit={handleSubmit(selectedValueTipo === 'fisico' ? handleSubmitFormPessoaFisica : handleSubmitFormPessoaJuridica)} ref={formRef}>

        {/* Form de endereço */}
        {step === 1 && (
          <Box>

            <VTextFieldCliente
              name='endereco.rua'
              control={control}
              label='Rua'
              rules={{ required: 'Rua é obrigatória'}}
              errors={errors}
            />

            <VTextFieldCliente
              name={'endereco.numero'}
              control={control}
              label={'Número'}
              rules={{ required: 'Número é obrigatório'}}
              errors={errors}
            />

            <VTextFieldCliente
              name={'endereco.bairro'}
              control={control}
              label={'Bairro'}
              rules={{ required: 'Bairro é obrigatório'}}
              errors={errors}
            />

            <VTextFieldCliente
              name={'endereco.cidade'}
              control={control}
              label={'Cidade'}
              rules={{ required: 'Cidade é obrigatório'}}
              errors={errors}
            />
          </Box>
        )}

        {/* Form de contato */}
        {(step === 2 || !smDown) && (
          <Box>

            <VTextFieldCliente
              name={'telefone'}
              control={control}
              label={'Telefone'}
              rules={{ required: 'Telefone é obrigatório', pattern: {
                value: /^[0-9]+$/,
                message: 'Telefone deve conter apenas números'
              }}}
              errors={errors}
            />

            <VTextFieldCliente
              name={'email'}
              control={control}
              label={'Email'}
              rules={{ required: 'Email é obrigatório', pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'E-mail inválido'
              }}}
              errors={errors}
            />

            <VTextFieldCliente
              name={'nomeContato'}
              control={control}
              label={'Nome para contato'}
              rules={{ required: 'Nome para contato é obrigatório'}}
              errors={errors}
            />            
          </Box>
        )}

        {/* Form de dados PF ou PJ */}
        {(step === 3 || !smDown) && (
          <Box>
            <VRadioField 
              control={control}
              errors={errors}
              label='tipo'
              name='tipo'
              rules={{ required: 'Este campo é obrigatório' }}
              data={data!}
              defaultValue={data ? data.tipo : 'juridico'}
            >
              <FormControlLabel value="fisico" control={<Radio />} label="Pessoa Física" disabled={!!data}/>
              <FormControlLabel value="juridico" control={<Radio />} label="Pessoa Jurídica" disabled={!!data}/>

            </VRadioField>

            {/* Campos específicos para PF ou PJ */}
            {selectedValueTipo === 'fisico' && (
              <Box>
                <VTextFieldCliente
                  name='nome'
                  control={control}
                  errors={errors}
                  label='Nome'
                  rules={{required: 'Nome é obrigatório'}}
                />
                <VTextFieldCliente
                  name='cpf'
                  control={control}
                  errors={errors}
                  label='CPF'
                  rules={{required: 'CPF é obrigatório', pattern: {value: /^[0-9]+$/, message: 'CPF deve conter apenas números'}}}
                />
              </Box>
            )}

            {selectedValueTipo === 'juridico' && (
              <Box>
                <VTextFieldCliente
                  name='nome'
                  control={control}
                  errors={errors}
                  label='Razão Social'
                  rules={{required: 'Razão Social é obrigatório'}}
                />
                <VTextFieldCliente
                  name='cnpj'
                  control={control}
                  errors={errors}
                  label='CNPJ'
                  rules={{required: 'CNPJ é obrigatório', pattern: {value: /^[0-9]+$/, message: 'CNPJ deve conter apenas números'}}}
                />
              </Box>
            )}
          </Box>
        )}

        {/* Form de contrato */}
        {(step === 4 || !smDown) && (
          <FormControl component="fieldset">

            <VRadioField
              control={control}
              errors={errors}
              label='Possui contrato ?'
              name='possuiContrato'     
              defaultValue={data ? data.possuiContrato : 0}        
            >
              <FormControlLabel value={1} control={<Radio />} label="Sim"/>
              <FormControlLabel value={0} control={<Radio />} label="Não" />

            </VRadioField>

            <VRadioField
              control={control}
              errors={errors}
              label='Tipo de contrato?'
              name='tipoContrato'         
              defaultValue={data ? data.tipoContrato : 'padrão'}
              rules={{ required: 'Tipo de contrato é obrigatório' }}
            >
              <FormControlLabel value="padrão" control={<Radio />} label="Padrão" />
              <FormControlLabel value="completo" control={<Radio />} label="Completo" />
            </VRadioField>

          </FormControl>
        )}

        <Box display={'flex'} justifyContent={step === 1 ? 'end' : 'space-between'} paddingTop={1}>
          {(step !== 1 && smDown) && (
            <Button type="button" variant="outlined" color="primary" onClick={handleClickAnterior}>
              Voltar
            </Button>
          )}

          {(step !== finalStep && smDown) && (
            <Button type="button" variant="contained" color="primary" onClick={handleClickProximo}>
              Próximo
            </Button>
          )}

          {(step === finalStep || !smDown) && (
            <Button type="submit" variant="contained" color="primary">
              { data &&
                (
                  'Editar'
                )
              }

              { !data && 
                (
                  'Cadastrar'
                )
              }
            </Button>
          )}
        </Box>
      </form>
      
    </Paper>
  );
};
