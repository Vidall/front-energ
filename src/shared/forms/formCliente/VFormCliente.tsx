import { Box, Button, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, Theme, Typography, useMediaQuery } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect, useRef } from 'react';

import { IPessoaFisica, IPessoaJuridica, TPessoaFisicaOuJuridica } from '../../Service/api/models/Clientes';
import { PessoaFisicaService } from '../../Service/api/clientes/PessoaFisicaService';
import { useParams, useSearchParams } from 'react-router-dom';

export const VFormCliente: React.FC = () => {
  const [data, setData] = useState<IPessoaFisica | IPessoaJuridica>();
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const [step, setStep] = useState(1);
  const [finalStep] = useState(4);
  const formRef = useRef(null);

  const { control, handleSubmit, formState: { errors }, trigger, watch, reset } = useForm<TPessoaFisicaOuJuridica>({
    defaultValues: {}  // Definindo o valor padrão
  });

  const selectedValueTipo = watch('tipo'); // Obtendo o valor selecionado do tipo

  useEffect(() => {
    if (!smDown) {
      setStep(1);
    }
    
    if (Number(id)) {
      PessoaFisicaService.getByID(Number(id))
        .then(res => {
          if (res instanceof Error) {
            return alert(res.message);
          }

          setData(res);
          reset(res);
          console.log(res.cpf);
          console.log(typeof res.cpf);
        });
    }
  }, [reset, smDown, id]);

  useEffect(() => {
    if (selectedValueTipo === 'fisico') {
      // Resetar os campos de CNPJ e nome quando mudar para 'fisico'
      reset(prev => ({ ...prev, cnpj: undefined }));
    } else if (selectedValueTipo === 'juridico') {
      // Resetar os campos de CPF e nome quando mudar para 'juridico'
      reset(prev => ({ ...prev, cpf: undefined }));
    }
  }, [selectedValueTipo, reset]);

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

  const handleSubmitForm = async (formData: TPessoaFisicaOuJuridica) => {
    const isValid = await trigger();
    if (isValid) {
      const numeroParser = formData.endereco?.numero ? Number(formData.endereco.numero) : 0; 
      const possuiContratoParserNumber = Number(formData.possuiContrato);
      const possuiContratoParser = possuiContratoParserNumber === 1 ? true : false;
      
      if (Number(id)) {
        const { id: _id, ...restData } = formData; // Remover o campo id
        PessoaFisicaService.updateById(Number(id), { ...restData as IPessoaFisica, possuiContrato: possuiContratoParser, endereco: { ...restData.endereco, numero: numeroParser } })
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
        PessoaFisicaService.create({ ...formData as IPessoaFisica, possuiContrato: possuiContratoParser, endereco: { ...formData.endereco, numero: numeroParser } })
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
      <form onSubmit={handleSubmit(handleSubmitForm)} ref={formRef}>

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
                  InputLabelProps={{ shrink: !!field.value }}
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
                  InputLabelProps={{ shrink: !!field.value }}
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
                  InputLabelProps={{ shrink: !!field.value }}
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
                  InputLabelProps={{ shrink: !!field.value }}
                />
              )}
            />
          </Box>
        )}

        {/* Form de contato */}
        {(step === 2 || !smDown) && (
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
                  InputLabelProps={{ shrink: !!field.value }}
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
                  InputLabelProps={{ shrink: !!field.value }}
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
                  InputLabelProps={{ shrink: !!field.value }}
                />
              )}
            />
          </Box>
        )}

        {/* Form de dados PF ou PJ */}
        {(step === 3 || !smDown) && (
          <Box>
            <FormControl component="fieldset">
              <Controller
                name="tipo"
                control={control}
                defaultValue={'juridico'}
                rules={{ required: 'Tipo de Pessoa é obrigatório' }}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    row
                    aria-label="tipo"
                  >
                    <Box display={'flex'} justifyContent={'space-between'}>
                      <FormControlLabel value="fisico" control={<Radio />} label="Pessoa Física" disabled={!!data}/>
                      <FormControlLabel value="juridico" control={<Radio />} label="Pessoa Jurídica" disabled={!!data}/>
                    </Box>
                  </RadioGroup>
                )}
              />
              {errors.tipo && <p>{errors.tipo.message}</p>}
            </FormControl>

            {/* Campos específicos para PF ou PJ */}
            {selectedValueTipo === 'fisico' && (
              <Box>
                <Controller
                  name="nome"
                  control={control}
                  defaultValue={data && 'nome' in data ? data.nome : ''}
                  rules={{ required: 'Este campo é obrigatório' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Nome Cliente"
                      fullWidth
                      margin="normal"
                      size="small"
                      error={!!errors.nome}
                      helperText={errors.nome?.message}
                      InputLabelProps={{ shrink: !!field.value }}
                    />
                  )}
                />
                <Controller
                  name="cpf"
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
                      label="CPF"
                      fullWidth
                      margin="normal"
                      size="small"
                      error={!!errors.cpf}
                      helperText={errors.cpf?.message}
                      InputLabelProps={{ shrink: !!field.value }}
                    />
                  )}
                />
              </Box>
            )}

            {selectedValueTipo === 'juridico' && (
              <Box>
                <Controller
                  name="nome"
                  control={control}
                  rules={{ required: 'Este campo é obrigatório' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Razão Social"
                      fullWidth
                      margin="normal"
                      size="small"
                      error={!!errors.nome}
                      helperText={errors.nome?.message}
                      InputLabelProps={{ shrink: !!field.value }}
                    />
                  )}
                />
                <Controller
                  name="cnpj"
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
                      label="CNPJ"
                      fullWidth
                      margin="normal"
                      size="small"
                      error={!!errors.cnpj}
                      helperText={errors.cnpj?.message}
                      InputLabelProps={{ shrink: !!field.value }}
                    />
                  )}
                />
              </Box>
            )}
          </Box>
        )}

        {/* Form de contrato */}
        {(step === 4 || !smDown) && (
          <FormControl component="fieldset">
            <Controller
              name="possuiContrato"
              defaultValue={data ? data.possuiContrato : false}
              control={control}
              rules={{ required: 'Tipo de contrato é obrigatório' }}
              render={({ field }) => (
                <>
                  <FormLabel id="possui-contrato-label">Possui contrato?</FormLabel>
                  <RadioGroup
                    {...field}
                    row
                    aria-label="possuiContrato"
                  >
                    <Box display={'flex'} justifyContent={'space-between'}>
                      <FormControlLabel value={1} control={<Radio />} label="Sim"/>
                      <FormControlLabel value={0} control={<Radio />} label="Não" />
                    </Box>
                  </RadioGroup>
                </>
              )}
            />
            {errors.possuiContrato && <Typography component={'span'} color={'#d32f2f'}>{errors.possuiContrato.message}</Typography>}

            <Controller
              name="tipoContrato"
              defaultValue={'padrão'}
              control={control}
              rules={{ required: 'Tipo de contrato é obrigatório' }}
              render={({ field }) => (
                <>
                  <FormLabel id="tipo-contrato-label">Tipo de contrato</FormLabel>
                  <RadioGroup
                    {...field}
                    row
                    aria-label="tipoContrato"
                  >
                    <Box display={'flex'} justifyContent={'space-between'}>
                      <FormControlLabel value="padrão" control={<Radio />} label="Padrão" />
                      <FormControlLabel value="completo" control={<Radio />} label="Completo" />
                    </Box>
                  </RadioGroup>
                </>
              )}
            />
            {errors.tipoContrato && <Typography component={'span'} color={'#d32f2f'}>{errors.tipoContrato.message}</Typography>}
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
