import { Box, Button, Grid, Icon, ImageList, ImageListItem } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { ISendImage, IServiceInOrder } from '../../shared/Service/api-JAVA/models/OrdemServico';
import { useEffect, useState } from 'react';
import { OrdemServicoService } from '../../shared/Service/api-JAVA/ordem_servico/OrdemServicoService';
import { LayoutPaginas } from '../../shared/Layout';
import { useNavigate, useParams } from 'react-router';
import { ServicosService } from '../../shared/Service/api-JAVA/servicos/ServicosService';

export const DetalheOsAndamento: React.FC = () => {
  const formMethod = useForm<ISendImage>();
  const [servicesInOrder, setServicesInOrder] = useState<IServiceInOrder>();
  const navigate = useNavigate();

  const { id } = useParams();

  // Estado para armazenar as imagens antes e depois
  const [imagemAntes, setImagemAntes] = useState<File>();
  const [imagemDepois, setImagemDepois] = useState<File>();

  const serviceFoto = (antesOudepois: 'antes' | 'depois') => {
    if (antesOudepois === 'antes') {
      if (servicesInOrder?.urlPhotoBefore) {
        return [
          {
            img: servicesInOrder.urlPhotoBefore,
            title: 'foto antes',
          }
        ];
      }
      return [
        {
          img: '/not_image.png',
          title: 'foto antes',
        }
      ];

    } else if (antesOudepois === 'depois') {
      if (servicesInOrder?.urlPhotoAfter) {
        return [
          {
            img: servicesInOrder.urlPhotoAfter,
            title: 'foto depois',
          } 
        ];
      }
      return [
        {
          img: '/not_image.png',
          title: 'foto depois',
        } 
      ];
    }
  };

  useEffect(() => {
    OrdemServicoService.getByIdServiceInOrder(Number(id))
      .then(res => {
        if (res instanceof Error){
          alert(res.message);
          return res.message;
        }
        setServicesInOrder(res);
      })
      .catch(error => console.log(error));
  }, []);

  // Handler para capturar a imagem de antes
  const handleClickImageAntes = () => {
    if (imagemAntes) {
      const formData = new FormData();
      formData.append('file', imagemAntes);

      // Chame sua API para enviar o formData
      OrdemServicoService.sendFile(Number(id), formData.get('file')!, 'foto_antes')
        .then(res => {
          if (res instanceof Error) {
            alert(res.message);
            return res.message;
          }
          alert('Enviado com sucesso');
        })
        .catch(error => console.log(error));
      alert('Aguarde enviando imagem antes:');
    } else {
      alert('Nenhuma imagem antes foi selecionada.');
    }
  };

  // Handler para capturar a imagem de depois
  const handleClickImageDepois = () => {
    if (imagemDepois) {
      const formData = new FormData();
      formData.append('file', imagemDepois);

      // Chame sua API para enviar o formData
      
      OrdemServicoService.sendFile(Number(id), formData.get('file')!, 'foto_depois')
        .then(res => {
          if (res instanceof Error) {
            alert(res.message);
            return res.message;
          }
          alert('Enviado com sucesso');
        })
        .catch(error => console.log(error));
      alert('Aguarde enviando imagem depois:', );
    } else {
      alert('Nenhuma imagem depois foi selecionada.');
    }
  };

  const handleClickRefresh = () => {
    OrdemServicoService.getByIdServiceInOrder(Number(id))
      .then(res => {
        if (res instanceof Error){
          alert(res.message);
          return res.message;
        }
        setServicesInOrder(res);
        alert('Atualizado com sucesso!');
      })
      .catch(error => console.log(error));
      
  };

  const handleClickVoltar = () => {
    navigate(-1);
  };

  const handleClickDelete = () => {
    ServicosService.deleteByIdServiceInOrder(Number(id))
      .then(res => {
        if (res instanceof Error){
          alert(res.message);
          return res.message;
        }
        alert('Registro deletado com sucesso!');
        navigate(-1);
      })
      .catch(error => console.log(error));

  };

  return (
    <LayoutPaginas
      titulo='Área ordens serviços'
    >
      <Box display={'flex'} flexDirection={'column'} gap={5}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Button onClick={handleClickDelete}>
            <Icon>delete</Icon>
          </Button>
          <Button onClick={handleClickRefresh}>
            <Icon>refresh</Icon>
          </Button>
        </Box>
        <Grid container spacing={2} padding={3}>
          <Box>
            <ImageList sx={{ width: 500, height: 400 }} cols={2} rowHeight={164} component={Box} display={'flex'}>
              {serviceFoto('antes')!.map((item) => (
                <ImageListItem key={item.img} component={Box} display={'flex'} gap={0} flexDirection={'column'}>
                  <img
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                    alt={item.title}
                    loading="lazy"
                  />
                  <Box display={'flex'} flexDirection={'column'} gap={1}>
                    <Controller
                      name='file'
                      control={formMethod.control}
                      render={({ field }) => (
                        <input
                          type='file'
                          accept='image/*'
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            setImagemAntes(file!);
                            field.onChange(file);
                          }}
                        />
                      )}
                    />
                    <Button onClick={handleClickImageAntes} variant='contained'>
                    Enviar imagem antes
                    </Button>
                  </Box>
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
          <Box>
            <ImageList sx={{ width: 500, height: 400 }} cols={2} rowHeight={164} component={Box} display={'flex'}>
              {serviceFoto('depois')!.map((item) => (
                <ImageListItem key={item.img} component={Box} display={'flex'} gap={0} flexDirection={'column'}>
                  <img
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                    alt={item.title}
                    loading="lazy"
                  />
                  <Box display={'flex'} flexDirection={'column'} gap={1}>
                    <Controller
                      name='file'
                      control={formMethod.control}
                      render={({ field }) => (
                        <input
                          type='file'
                          accept='image/*'
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            setImagemDepois(file!);
                            field.onChange(file);
                          }}
                        />
                      )}
                    />
                    <Button onClick={handleClickImageDepois} variant='contained'>
                    Enviar imagem depois
                    </Button>
                  </Box>
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </Grid>
        <Box >
          <Button variant='contained' onClick={handleClickVoltar}>
              Voltar
          </Button>
        </Box>
      </Box>
    </LayoutPaginas>
  );
};
