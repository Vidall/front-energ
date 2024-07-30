import { Box, Button, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';

import { IPessoaFisica, IPessoaJuridica, TPessoaFisicaOuJuridica } from '../../Service/api/models/Clientes';
import { PessoaFisicaService } from '../../Service/api/clientes/PessoaFisicaService';
import { useSearchParams } from 'react-router-dom';

export const VFormCliente: React.FC = () => {
  const [data, setData] = useState<IPessoaFisica | IPessoaJuridica>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [finalStep] = useState(4);

  const { control, handleSubmit, formState: { errors }, trigger, watch, reset } = useForm<TPessoaFisicaOuJuridica>({
    defaultValues: { tipo: 'juridico' }  // Definindo o valor padrão
  });

  const selectedValueTipo = watch('tipo'); // Obtendo o valor selecionado do tipo

  useEffect(() => {
    if (selectedValueTipo === 'fisico') {
      // Resetar os campos de CNPJ e nome quando mudar para 'fisico'
      reset(prev => ({ ...prev, cnpj: undefined, nome: '' }));
    } else if (selectedValueTipo === 'juridico') {
      // Resetar os campos de CPF e nome quando mudar para 'juridico'
      reset(prev => ({ ...prev, cpf: undefined, nome: '' }));
    }
  }, [selectedValueTipo, reset]);

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

  const handleSubmitForm = async (data: IPessoaFisica | IPessoaJuridica) => {
    const isValid = await trigger();
    if (isValid) {
      const numeroParser = Number(data.endereco.numero); 
      const possuiContratoParserNumber = Number(data.possuiContrato);
      const possuiContratoParser = possuiContratoParserNumber === 1 ? true : false;

      setData(data);
      PessoaFisicaService.create({ ...data as IPessoaFisica, possuiContrato: possuiContratoParser, endereco: { ...data.endereco, numero: numeroParser } })
        .then((res) => {
          if (res instanceof Error) {
            console.log(data);
            return alert(res.message);
          }

          alert('Criado com sucesso');
          data.tipo === 'fisico' ? 
            setSearchParams({ ...Object.fromEntries(searchParams.entries()), tipo: 'Fisico' }, { replace: true }) 
            : 
            setSearchParams({ ...Object.fromEntries(searchParams.entries()), tipo: 'Juridico' }, { replace: true });
        })
        .catch(error => console.log(error));
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
                  type='number'
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

            {/* Campo dinâmico da pf ou pj */}
            {
              selectedValueTipo === 'fisico' && (
                <Box>
                  <Controller
                    name='nome'
                    control={control}
                    rules={{ required: 'Este campo é obrigatório' }}
                    render={({ field }) => (
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
                      required: 'CPF é obrigatório',
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'CPF deve conter apenas números'
                      }
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='CPF'
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
                    rules={{ required: 'Este campo é obrigatório' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Razão Social'
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
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='CNPJ'
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

        {step === 4 && (
          <FormControl component="fieldset">
            <Controller
              name="possuiContrato"
              control={control}
              rules={{ required: 'Tipo de contrato é obrigatório' }}
              render={({ field }) => (
                <>
                  <FormLabel id="demo-row-radio-buttons-group-label">Possui contrato?</FormLabel>
                  <RadioGroup
                    {...field}
                    row
                    aria-label="possuiContrato"
                  >
                    <Box display={'flex'} justifyContent={'space-between'}>
                      <FormControlLabel value={1} control={<Radio />} label="Sim" />
                      <FormControlLabel value={0} control={<Radio />} label="Não" />
                    </Box>
                  </RadioGroup>
                </>
              )}
            />
            {errors.tipo && <p>{errors.tipo.message}</p>}

            <Controller
              name="tipoContrato"
              control={control}
              rules={{ required: 'Tipo de contrato é obrigatório' }}
              render={({ field }) => (
                <>
                  <FormLabel id="demo-row-radio-buttons-group-label">Tipo de contrato</FormLabel>
                  <RadioGroup
                    {...field}
                    row
                    aria-label="tipo de contrato"
                  >
                    <Box display={'flex'} justifyContent={'space-between'}>
                      <FormControlLabel value="padrão" control={<Radio />} label="Padrão" />
                      <FormControlLabel value="completo" control={<Radio />} label="Completo" />
                    </Box>
                  </RadioGroup>
                </>
              )}
            />
            {errors.tipo && <p>{errors.tipo.message}</p>}
          </FormControl>
        )}

        <Box display={'flex'} justifyContent={step === 1 ? 'end' : 'space-between'} paddingTop={1}>
          {step !== 1 && (
            <Button type="button" variant="outlined" color="primary" onClick={handleClickAnterior}>
              Voltar
            </Button>
          )}

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
