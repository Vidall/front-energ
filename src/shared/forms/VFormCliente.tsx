import { Box, Button, FormControl, FormControlLabel, Paper, Radio, RadioGroup, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { TPessoaFisicaOuJuridica } from '../Service/api/models/Clientes';

export const VFormCliente: React.FC = () => {
  const [step, setStep] = useState(1);
  const [finalStep] = useState(3);

  const { control, handleSubmit, formState: { errors }, trigger, watch } = useForm<TPessoaFisicaOuJuridica>({
    defaultValues: {tipo: 'juridico' }  // Defina o valor padrão aqui
  });

  const selectedValueTipo = watch('tipo'); // Obtenha o valor selecionado do tipo

  const handleClickProximo = async () => {
    let valid = true;
    if (step === 1) {
      valid = await trigger(['endereco.rua', 'endereco.numero', 'endereco.bairro', 'endereco.cidade']);
    } else if (step === 2) {
      valid = await trigger(['telefone', 'email', 'nomeContato']);
    }

    if (valid) {
      setStep(step => step + 1);
    }
  };

  const handleClickAnterior = () => {
    if (step !== 1) setStep(step => step - 1);
  };

  const handleSubmitForm = async (data: TPessoaFisicaOuJuridica) => {
    const isValid = await trigger();
    if (isValid) {
      alert('Formulário enviado com sucesso!');
      console.log(data);
      // Aqui você pode enviar os dados do formulário para um servidor, etc.
    }
  };

  return (
    <Paper component={Box} padding={2}>
      <form onSubmit={handleSubmit(handleSubmitForm)}>

        {/* Form de endereço */}
        {step === 1 && (
          <Box>
            <Controller
              name="endereco.rua"
              control={control}
              rules={{ required: 'Rua é obrigatória' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Rua"
                  fullWidth
                  margin="normal"
                  size="small"
                  error={!!errors.endereco?.rua}
                  helperText={errors.endereco?.rua?.message}
                />
              )}
            />
            <Controller
              name="endereco.numero"
              control={control}
              rules={{ required: 'Número é obrigatório' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Número"
                  fullWidth
                  margin="normal"
                  size="small"
                  error={!!errors.endereco?.numero}
                  helperText={errors.endereco?.numero?.message}
                />
              )}
            />
            <Controller
              name="endereco.bairro"
              control={control}
              rules={{ required: 'Bairro é obrigatório' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Bairro"
                  fullWidth
                  margin="normal"
                  size="small"
                  error={!!errors.endereco?.bairro}
                  helperText={errors.endereco?.bairro?.message}
                />
              )}
            />
            <Controller
              name="endereco.cidade"
              control={control}
              rules={{ required: 'Cidade é obrigatória' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Cidade"
                  fullWidth
                  margin="normal"
                  size="small"
                  error={!!errors.endereco?.cidade}
                  helperText={errors.endereco?.cidade?.message}
                />
              )}
            />
          </Box>
        )}

        {/* Form de contato */}
        {step === 2 && (
          <Box>
            <Controller
              name="telefone"
              control={control}
              rules={{
                required: 'Telefone é obrigatório',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Telefone deve conter apenas números'
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Telefone"
                  fullWidth
                  margin="normal"
                  size="small"
                  error={!!errors.telefone}
                  helperText={errors.telefone?.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'E-mail é obrigatório',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'E-mail inválido'
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="E-mail"
                  fullWidth
                  margin="normal"
                  size="small"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
            <Controller
              name="nomeContato"
              control={control}
              rules={{ required: 'Nome para Contato é obrigatório' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nome para Contato"
                  fullWidth
                  margin="normal"
                  size="small"
                  error={!!errors.nomeContato}
                  helperText={errors.nomeContato?.message}
                />
              )}
            />
          </Box>
        )}

        {/* Form de dados PF ou PJ */}
        {step === 3 && (
          <Box>
            <FormControl component="fieldset">
              <Controller
                name="tipo"
                control={control}
                rules={{ required: 'Tipo de Pessoa é obrigatório' }}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    row
                    aria-label="tipo"
                  >
                    <Box display={'flex'} justifyContent={'space-between'}>
                      <FormControlLabel value="fisico" control={<Radio />} label="Pessoa Física" />
                      <FormControlLabel value="juridico" control={<Radio />} label="Pessoa Jurídica" />
                    </Box>
                  </RadioGroup>
                )}
              />
              {errors.tipo && <p>{errors.tipo.message}</p>}
            </FormControl>
            
            {/* Campo dinamico da pf ou pj */}
            {
              selectedValueTipo === 'fisico' && (
                <Box>
                  <Controller
                    name='nome'
                    control={control}
                    rules={{required: 'Este campo é obrigatório'}}
                    render={({field}) => (
                      <TextField
                        {...field}
                        label='Nome Cliente'
                        fullWidth
                        margin='normal'
                        size='small'
                        error={!!errors.nome}
                        helperText={errors.nome?.message}
                      />
                    )}
                  />  
                  <Controller
                    name='cpf'
                    control={control}
                    rules={{
                      required: 'cpf é obrigatório',
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'CPF deve conter apenas números'
                      }
                    }}

                    render={({field}) => (
                      <TextField
                        {...field}
                        label='cpf'
                        fullWidth
                        margin='normal'
                        size='small'
                        error={!!errors.cpf}
                        helperText={errors.cpf?.message}
                      />
                    )}
                  />
                </Box>                              
              )
            }

            {
              selectedValueTipo === 'juridico' && (

                <Box>
                  <Controller
                    name='nome'
                    control={control}
                    rules={{required: 'Este campo é obrigatório'}}
                    render={({field}) => (
                      <TextField
                        {...field}
                        label='Razão social'
                        fullWidth
                        margin='normal'
                        size='small'
                        error={!!errors.nome}
                        helperText={errors.nome?.message}
                      />
                    )}
                  />  

                  <Controller
                    name='cnpj'
                    control={control}
                    rules={{
                      required: 'CNPJ é obrigatório',
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'CNPJ deve conter apenas números'
                      }
                    }}
                    render={({field}) => (
                      <TextField
                        {...field}
                        label='cnpj'
                        fullWidth
                        margin='normal'
                        size='small'
                        error={!!errors.cnpj}
                        helperText={errors.cnpj?.message}
                      />
                    )}
                  />  
                </Box>
              )
            }

          </Box>
        )}

        <Box display={'flex'} justifyContent={'space-between'} paddingTop={1}>
          <Button type="button" variant="outlined" color="primary" onClick={handleClickAnterior}>
            Voltar
          </Button>
          {step !== finalStep && (
            <Button type="button" variant="contained" color="primary" onClick={handleClickProximo}>
              Próximo
            </Button>
          )}

          {step === finalStep && (
            <Button type="submit" variant="contained" color="primary">
              Cadastrar
            </Button>
          )}
        </Box>
      </form>
    </Paper>
  );
};
