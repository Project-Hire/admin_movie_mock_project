import { ChangeEvent, useState } from 'react';
import { Card, Box, TextField, Button } from '@mui/material';
import { IDataOpenAlert, useStatusAlert } from 'src/stores/useStatusAlert';
import { addCategory } from 'src/utils/api/category';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from 'src/models/key';
import { useNavigate } from 'react-router';
import { ICreateCategoryDataResponse } from 'src/models/api/category.interface';

interface State {
  name: string;
}

export const CreateCategoryForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [update] = useStatusAlert((state: IDataOpenAlert) => [state.update]);

  const [values, setValues] = useState<State>({
    name: ''
  });

  const handleChange =
    (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const onSubmit = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault();

      const response = (await addCategory({
        ...values,
        accessToken: 'abc'
      })) as ICreateCategoryDataResponse;

      if (response) {
        queryClient.invalidateQueries([QUERY_KEYS.CATEGORY_LIST]);
        navigate('/management/category');
        update({
          message: `Create Category Name: ${response.name} Successfully`,
          severity: 'success',
          open: true
        });
      } else {
        update({
          message: 'Create Category Fail',
          severity: 'error',
          open: true
        });
      }
    } catch (error) {
      update({
        message: error.message,
        severity: 'error',
        open: true
      });
    }
  };

  return (
    <Card>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' }
        }}
        noValidate
        autoComplete="off"
        padding={3}
        style={{ display: 'flex', alignItems: 'center' }}
        onSubmit={onSubmit}
      >
        <TextField
          required
          id="outlined-required"
          name="name"
          label="Name"
          defaultValue={values.name}
          onChange={handleChange('name')}
        />
        <Button sx={{ margin: 1 }} variant="contained" type="submit">
          Create
        </Button>
      </Box>
    </Card>
  );
};
