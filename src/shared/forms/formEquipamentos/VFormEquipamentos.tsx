import { Box, Button } from '@mui/material';
import { VInputSelect } from '../../Components';
import { UseFormReturn } from 'react-hook-form';
import { IGrupo } from '../../Service/api-JAVA/models/GruposServicos';

interface IVFormEquipamentos {
  submitForm: () => void;
  dataSelect?: IGrupo[];
  children?: React.ReactNode;
  formMethods: UseFormReturn<any>;
}

/*eslint-disable react/prop-types*/
export const VFormEquipamentos: React.FC<IVFormEquipamentos> = ({ submitForm, dataSelect, children, formMethods }) => {
  const { control, handleSubmit, formState: { errors }, reset, trigger } = formMethods;

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <VInputSelect dataSelect={dataSelect!}/>
      {children}
    </form>
  );
};
