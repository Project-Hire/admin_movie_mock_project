import { ChangeEvent, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Tooltip,
  Avatar,
  CardMedia,
  Button,
  TextField,
  Stack,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { IDataOpenAlert, useStatusAlert } from 'src/stores/useStatusAlert';
import { addCategory } from 'src/utils/api/category';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from 'src/models/key';
import { Navigate, useNavigate, useParams } from 'react-router';
import { ICreateCategoryDataResponse } from 'src/models/api/category.interface';
import { getActorData } from 'src/utils/api/actor';

interface State {
  id: string;
  name: string;
  avatar: string;
}

const Input = styled('input')({
  display: 'none'
});

export const EditActorForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [update] = useStatusAlert((state: IDataOpenAlert) => [state.update]);
  const { id } = useParams();

  const [values, setValues] = useState<State>({
    id: id,
    name: '',
    avatar: ''
  });

  const {
    data: actorDetail,
    isError,
    isFetching
  } = useQuery(
    [QUERY_KEYS.ACTOR_DETAIL, id],
    async () => {
      const response = await getActorData({
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

  if (!isFetching && (isError || typeof actorDetail === 'undefined')) {
    return <Navigate to={'/404'} replace />;
  }

  const handleChange =
    (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const onSubmit = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault();

      const response = (await addCategory({
        ...values
      })) as ICreateCategoryDataResponse;

      if (response) {
        queryClient.invalidateQueries([QUERY_KEYS.CATEGORY_LIST]);
        navigate('/management/actor');
        update({
          message: `Edit Information Actor Name: ${response.name} Successfully`,
          severity: 'success',
          open: true
        });
      } else {
        update({
          message: 'Edit Information Actor Fail',
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
        style={{ alignItems: 'center' }}
        onSubmit={onSubmit}
      >
        <Box>
          <TextField
            required
            id="outlined-required"
            name="name"
            label="Name"
            defaultValue={actorDetail.name}
            onChange={handleChange('name')}
          />
        </Box>
        <Box>
          <TextField
            required
            id="outlined-required"
            name="avatar"
            label="Avatar"
            defaultValue={actorDetail.avatar}
            onChange={handleChange('avatar')}
          />
        </Box>
        <Box>
          <Button sx={{ margin: 1 }} variant="contained" type="submit">
            Save
          </Button>
        </Box>
      </Box>
    </Card>
  );
};
