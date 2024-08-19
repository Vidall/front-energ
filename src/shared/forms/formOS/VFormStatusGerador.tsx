import { Box, Button } from '@mui/material';
import { VInputSelect } from '../../Components';
import { UseFormReturn } from 'react-hook-form';
import { IGrupo } from '../../Service/api-JAVA/models/GruposServicos';

interface VFormProps {
  submitForm: () => void;
  children?: React.ReactNode;
  formMethods: UseFormReturn<any>;
}

/*eslint-disable react/prop-types*/
export const VFormStatusGerador: React.FC<VFormProps> = ({ submitForm, children, formMethods }) => {
  const { control, handleSubmit, formState: { errors }, reset, trigger } = formMethods;

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {children}
    </form>
  );
};
