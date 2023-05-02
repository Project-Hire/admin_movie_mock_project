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
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
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

const Input = styled('input')({
  display: 'none'
});

const AvatarWrapper = styled(Card)(
  ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
);

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
        <AvatarWrapper>
          <Avatar variant="rounded" alt={values.name} src={values.avatar} />
          <ButtonUploadWrapper>
            <Input
              accept="image/*"
              id="icon-button-file"
              name="icon-button-file"
              type="file"
            />
            <label htmlFor="icon-button-file">
              <IconButton component="span" color="primary">
                <UploadTwoToneIcon />
              </IconButton>
            </label>
          </ButtonUploadWrapper>
        </AvatarWrapper>
        <Button sx={{ margin: 1 }} variant="contained" type="submit">
          Create
        </Button>
      </Box>
    </Card>
  );
};
