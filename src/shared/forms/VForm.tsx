import { Button, Paper, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

export const VForm: React.FC = () => {
  const { control, handleSubmit } = useForm();

  return (
    <Paper style={{ padding: 16 }}>
      <form onSubmit={handleSubmit((data) => {
        console.log(data);
      })}>
        <Controller
          name="endereco"
          control={control}
          render={({ field }) => <TextField {...field} label="Endereço" fullWidth margin="normal"/>}
        />
        <Controller
          name="endereco.rua"
          control={control}
          render={({ field }) => <TextField {...field} label="Rua" fullWidth margin="normal"/>}
        />
        <Controller
          name="endereco.numero"
          control={control}
          render={({ field }) => <TextField {...field} label="Número" fullWidth margin="normal"/>}
        />
        <Controller
          name="endereco.bairro"
          control={control}
          render={({ field }) => <TextField {...field} label="Bairro" fullWidth margin="normal"/>}
        />
        <Controller
          name="endereco.cidade"
          control={control}
          render={({ field }) => <TextField {...field} label="Cidade" fullWidth margin="normal"/>}
        />
        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </form>
    </Paper>
  );
};
