import { Box, Button, Grid, Icon, ImageList, ImageListItem } from '@mui/material';
import { VFormOS, VUpload } from '../../shared/forms/formOS';
import { useForm, Controller } from 'react-hook-form';
import { ISendImage } from '../../shared/Service/api-JAVA/models/OrdemServico';
import { useState } from 'react';
import { OrdemServicoService } from '../../shared/Service/api-JAVA/ordem_servico/OrdemServicoService';
import { LayoutPaginas } from '../../shared/Layout';
import { useParams } from 'react-router';
import { error } from 'console';

export const DetalheOsAndamento: React.FC = () => {
  const formMethod = useForm<ISendImage>();

  const { id } = useParams();

  // Estado para armazenar as imagens antes e depois
  const [imagemAntes, setImagemAntes] = useState<File>();
  const [imagemDepois, setImagemDepois] = useState<File>();

  const fotoAntes = [
    {
      img: '/not_image.png',
      title: 'Breakfast',
    }
  ];
  const fotoDepois = [
    {
      img: '/not_image.png',
      title: 'Breakfast',
    } 
  ];

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

  return (
    <LayoutPaginas
      titulo='Área ordens serviços'
    >
      <Box display={'flex'} flexDirection={'column'} gap={5}>
        <Icon>delete</Icon>
        <Grid container spacing={2} padding={3}>
          <Box>
            <ImageList sx={{ width: 500, height: 400 }} cols={2} rowHeight={164} component={Box} display={'flex'}>
              {fotoAntes.map((item) => (
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
                    Enviar
                    </Button>
                  </Box>
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
          <Box>
            <ImageList sx={{ width: 500, height: 400 }} cols={2} rowHeight={164} component={Box} display={'flex'}>
              {fotoDepois.map((item) => (
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
                    Enviar
                    </Button>
                  </Box>
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </Grid>
      </Box>
    </LayoutPaginas>
  );
};
