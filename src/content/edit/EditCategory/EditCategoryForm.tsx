import { ChangeEvent, useState } from 'react';
import { Card, Box, TextField, Button } from '@mui/material';
import { IDataOpenAlert, useStatusAlert } from 'src/stores/useStatusAlert';
import {
  addCategory,
  getCategoryData,
  updateCategory
} from 'src/utils/api/category';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from 'src/models/key';
import { Navigate, useNavigate, useParams } from 'react-router';
import { ICreateCategoryDataResponse } from 'src/models/api/category.interface';

interface State {
  id: string;
  name: string;
}

export const EditCategoryForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [update] = useStatusAlert((state: IDataOpenAlert) => [state.update]);
  const { id } = useParams();

  const [values, setValues] = useState<State>({
    id: `${id}`,
    name: ''
  });

  const {
    data: categoryDetail,
    isError,
    isFetching
  } = useQuery(
    [QUERY_KEYS.CATEGORY_DETAIL, id],
    async () => {
      const response = await getCategoryData({
        id
      });

      return response;
    },
    {
      enabled: !!id,
      refetchInterval: false,
      refetchOnWindowFocus: false
    }
  );

  if (!isFetching && (isError || typeof categoryDetail === 'undefined')) {
    return <Navigate to={'/404'} replace />;
  }

  const handleChange =
    (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const onSubmit = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault();

      const response = (await updateCategory({
        ...values
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
      {categoryDetail && (
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '75ch' }
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
            defaultValue={categoryDetail.name}
            onChange={handleChange('name')}
          />
          <Button sx={{ margin: 1 }} variant="contained" type="submit">
            Save
          </Button>
        </Box>
      )}
    </Card>
  );
};
