import { ChangeEvent, useState } from 'react';
import {
  Card,
  Box,
  TextField,
  MenuItem,
  Button,
  Stack,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { IDataOpenAlert, useStatusAlert } from 'src/stores/useStatusAlert';
import { getCategoryList } from 'src/utils/api/category';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from 'src/models/key';
import { useNavigate } from 'react-router';
import {
  ICategoryListData,
  ICategoryListDataResponse
} from 'src/models/api/category.interface';
import { getActorList } from 'src/utils/api/actor';
import {
  IActorListData,
  IActorListDataResponse
} from 'src/models/api/actor.interface';
import { addMovie } from 'src/utils/api/movie';
import { ICreateMovieDataResponse } from 'src/models/api/movie.interface';

interface State {
  name: string;
  description: string;
  actor_id: string;
  poster: string;
  category_id: string;
}

const Input = styled('input')({
  display: 'none'
});

export const CreateMovieForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [update] = useStatusAlert((state: IDataOpenAlert) => [state.update]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [keyword, setKeyword] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [actors, setActors] = useState<string[]>([]);

  const [values, setValues] = useState<State>({
    name: '',
    description: '',
    actor_id: '',
    poster: '',
    category_id: ''
  });

  const { data: category } = useQuery(
    [QUERY_KEYS.CATEGORY_LIST, page, limit, keyword],
    async () => {
      const response = (await getCategoryList({
        page,
        limit,
        name: keyword
      })) as ICategoryListDataResponse;

      return response;
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false
    }
  );

  const { data: actor } = useQuery(
    [QUERY_KEYS.ACTOR_LIST, page, limit, keyword],
    async () => {
      const response = (await getActorList({
        page,
        limit,
        name: keyword
      })) as IActorListDataResponse;

      return response;
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false
    }
  );

  const handleChange =
    (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCategories(typeof value === 'string' ? value.split(',') : value);
  };

  const handleActorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setActors(typeof value === 'string' ? value.split(',') : value);
  };

  const onSubmit = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault();

      const response = (await addMovie({
        ...values,
        accessToken: 'abc'
      })) as ICreateMovieDataResponse;

      if (response) {
        queryClient.invalidateQueries([QUERY_KEYS.MOVIE_LIST]);
        navigate('/management/movie');
        update({
          message: `Create Movie Name: ${response.name} Successfully`,
          severity: 'success',
          open: true
        });
      } else {
        update({
          message: 'Create Movie Fail',
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
            name="description"
            label="Description"
            defaultValue={values.description}
            onChange={handleChange('description')}
          />
        </Box>
        <Box>
          <Stack direction="row" alignItems="center" sx={{ margin: 1 }}>
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
              />
              <Button variant="contained" component="span">
                Upload
              </Button>
            </label>
            <label htmlFor="icon-button-file">
              <Input accept="image/*" id="icon-button-file" type="file" />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </Stack>
        </Box>
        <Box>
          {actor && (
            <TextField
              label="Select actor"
              select
              SelectProps={{
                multiple: true
              }}
              color="secondary"
              helperText="Please select actor"
              value={actors}
              onChange={handleActorChange}
            >
              {actor.items.map((actor: IActorListData, index: number) => (
                <MenuItem key={index} value={actor.id}>
                  {actor.name}
                </MenuItem>
              ))}
            </TextField>
          )}
          ;
          {category && (
            <TextField
              label="Select category"
              select
              SelectProps={{
                multiple: true
              }}
              color="secondary"
              helperText="Please select categories of movie"
              value={categories}
              onChange={handleCategoryChange}
            >
              {category.items.map(
                (category: ICategoryListData, index: number) => (
                  <MenuItem key={index} value={category.id}>
                    {category.name}
                  </MenuItem>
                )
              )}
            </TextField>
          )}
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
