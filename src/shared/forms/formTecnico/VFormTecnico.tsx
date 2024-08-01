import { Box, Button, FormControlLabel, Icon, Paper, Radio, Typography } from '@mui/material';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { VAssinaturaField, VRadioFieldTecnico, VTextFieldTecnico } from './fields';
import {  ITecnico, IUpdateTecnico } from '../../Service/api/models/Tecnico';
import { TecnicoService } from '../../Service/api/tecnicos/TecnicoService';
import { Environment } from '../../Enviroment';

/*eslint-disable react/prop-types*/
/*eslint-disable @typescript-eslint/no-unused-vars */
/*eslint-disable no-unused-vars */

export const VFormTecnico: React.FC = () => {
  const [data, setData] = useState<IUpdateTecnico>();
  const formRef = useRef(null);
  const { id } = useParams();
  const [trocarSenha, setTrocarSenha] = useState<boolean>();
  const [trocarAssinatura, setTrocarAssinatura] = useState<boolean>();
  const navigate = useNavigate();

  const [searchParams ] = useSearchParams();

  const tipo = searchParams.get('tipo') as 'Cadastrar';

  const { control, handleSubmit, formState: { errors }, reset } = useForm<IUpdateTecnico>({
    defaultValues: {}  // Definindo o valor padrão
  });

  useEffect(() => {
    
    if (Number(id)) {
      TecnicoService.getByID(Number(id))
        .then(res => {
          if (res instanceof Error) {
            return res.message;
          }

          reset(res as IUpdateTecnico);
          setData(res as IUpdateTecnico);
        })
        .catch(error => console.log(error));
    }
  }, []);

  const handleClickAnterior = () => {
    setTrocarSenha(false);
    setTrocarAssinatura(false);
  };

  const handleSubmitForm = async (formData: IUpdateTecnico | ITecnico) => {
    const {id: _id, ...resData} = formData;
    if (tipo === null) {
      TecnicoService.updateById(Number(id), {...resData})
        .then(res => {         
          if (res instanceof Error) {
            alert(res.message);
            return res.message;
          }

          alert('Editado com sucesso');
          navigate(`${Environment.CAMINHO_TECNICOS}?tipo=Todos`);
        })
        .catch(error => console.log(error));
      
    }else {
      TecnicoService.create(formData as ITecnico)
        .then(res => {
          if (res instanceof Error) {
            return res.message;
          }
          
          setData(res);
          alert(`Técnico ${formData.nome} cadastrado com sucesso`);
          navigate(`${Environment.CAMINHO_TECNICOS}?tipo=Todos`);
        })
        .catch(error => console.log(error));
    }

  };

  const handleEditarSenha = () => {    
    setTrocarSenha(true);
  };

  const handleTrocarAssinatura = () => {
    setTrocarAssinatura(true);
  };

  return (
    <Paper component={Box} padding={2}>
      <form onSubmit={handleSubmit(handleSubmitForm)} ref={formRef}>

        {/* Form de endereço */}
        {(!trocarSenha && !trocarAssinatura)  && (
          <Box>
            <>
              { trocarAssinatura || trocarSenha || tipo !== 'Cadastrar' && (
                <Box display={'flex'} alignContent={'center'} justifyContent={'space-between'}>
                  <Button onClick={handleEditarSenha} size='small'>
                    <Typography marginRight={1}>Senha</Typography>
                    <Icon>
                      vpn_key
                    </Icon>
                              
                  </Button>

                  <Button onClick={handleTrocarAssinatura} size='small'>
                    <Typography marginRight={1}>Assinatura</Typography>
                    <Icon>
                      edit
                    </Icon>
                              
                  </Button>
                </Box>
              )

              }
              <VTextFieldTecnico
                name='nome'
                control={control}
                label='Nome'
                rules={{ required: 'Nome é obrigatória'}}
                errors={errors}
              />

              <VTextFieldTecnico
                name={'email'}
                control={control}
                label={'E-mail'}
                rules={{ required: 'E-mail é obrigatório'}}
                errors={errors}
              />

              <VTextFieldTecnico
                name={'telefone'}
                control={control}
                label={'Telefone'}
                rules={{ required: 'Telefone é obrigatório'}}
                errors={errors}
              />

              <VTextFieldTecnico
                name={'cpf'}
                control={control}
                label={'CPF'}
                rules={{ required: 'CPF é obrigatório', pattern: {
                  value: /^[0-9]+$/,
                  message: 'Telefone deve conter apenas números'
                }}}
                errors={errors}
              />

              <VRadioFieldTecnico
                control={control}
                errors={errors}
                label='Administrador ?'
                name='admin'
                defaultValue={0}
                rules={{require: 'Esse campo é obrigatório'}}
              >

                <FormControlLabel value={1} control={<Radio />} label="Sim" disabled={!!data}/>
                <FormControlLabel value={0} control={<Radio />} label="Não" disabled={!!data}/>

              </VRadioFieldTecnico>
            </>

          </Box>
        )}

        {/* Form de senha */}
        { (trocarSenha || tipo == 'Cadastrar')  && (
          <Box>
            <>
              <VTextFieldTecnico
                name={'senha'}
                tipo={'password'}
                control={control}
                label={'Senha'}
                rules={{ required: 'Senha é obrigatório'}}
                errors={errors}
              />
          
              { tipo !== 'Cadastrar' && (
                <VTextFieldTecnico
                  name={'updateSenha'}
                  tipo={'password'}
                  control={control}
                  label={'Nova Senha'}
                  rules={{ required: 'Nova senha é obrigatório'}}
                  errors={errors}
                />
              )}
            </>

          </Box>
          
        )}

        {/* Form de assinatura */}
        {(trocarAssinatura || tipo == 'Cadastrar') && (
          <Box>
            <VAssinaturaField
              control={control}
              errors={errors}
              label='Assinatura'
              name='file'
              rules={{require: 'Este campo é obrigatório'}}
            />
          </Box>
        )}

        {/* Form de contrato */}
        {(tipo !== 'Cadastrar' && (!trocarAssinatura && !trocarSenha)) && (
          <Box>
            <Typography>Assinatura</Typography>
            <img src={data?.pathAssinatura} alt="" />
          </Box>
        )}

        <Box display={'flex'} justifyContent={(trocarSenha || trocarAssinatura ) ? 'space-between' : 'end'} paddingTop={1}>
          { (trocarSenha || trocarAssinatura) && (
            <Button type="button" variant="outlined" color="primary" onClick={handleClickAnterior}>
              Voltar
            </Button>
          )}
          
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
        </Box>
      </form>
    </Paper>
  );
};
