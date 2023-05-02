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
import { IDataOpenAlert, useStatusAlert } from 'src/stores/useStatusAlert';
import { addCategory } from 'src/utils/api/category';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from 'src/models/key';
import { useNavigate } from 'react-router';
import { ICreateCategoryDataResponse } from 'src/models/api/category.interface';
import { addActor } from 'src/utils/api/actor';
import { ICreateActorDataResponse } from 'src/models/api/actor.interface';

interface State {
  name: string;
  avatar: string;
}

export const CreateActorForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [update] = useStatusAlert((state: IDataOpenAlert) => [state.update]);

  const [values, setValues] = useState<State>({
    name: '',
    avatar: ''
  });

  const handleChange =
    (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const onSubmit = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault();

      const response = (await addActor({
        ...values,
        accessToken: 'abc'
      })) as ICreateActorDataResponse;

      if (response) {
        queryClient.invalidateQueries([QUERY_KEYS.ACTOR_LIST]);
        navigate('/management/actor');
        update({
          message: `Create Actor Information Name: ${response.name} Successfully`,
          severity: 'success',
          open: true
        });
      } else {
        update({
          message: 'Create Actor Fail',
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
          '& .MuiTextField-root': { m: 1, width: '75ch' }
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
            defaultValue={values.name}
            onChange={handleChange('name')}
          />
        </Box>
        <Box>
          <TextField
            required
            id="outlined-required"
            name="avatar"
            label="Avatar"
            defaultValue={values.avatar}
            onChange={handleChange('avatar')}
          />
        </Box>
        <Box>
          <Button sx={{ margin: 1 }} variant="contained" type="submit">
            Create
          </Button>
        </Box>
      </Box>
    </Card>
  );
};
