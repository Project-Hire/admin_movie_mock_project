import { ChangeEvent, useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Card, Box, TextField, debounce } from '@mui/material';

import MovieTable from './MovieTable';
import { QUERY_KEYS } from 'src/models/key';
import { getMovieList } from 'src/utils/api/movie';
import { IMovieListDataResponse } from 'src/models/api/movie.interface';
import { useNavigate } from 'react-router';

function Movie() {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [keyword, setKeyword] = useState<string>('');

  const { data: movie } = useQuery(
    [QUERY_KEYS.MOVIE_LIST, page, limit, keyword],
    async () => {
      const response = (await getMovieList({
        page,
        limit,
        name: keyword
      })) as IMovieListDataResponse;

      return response;
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false
    }
  );

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const onChangeKeyword = (e: { target: { value: string } }) => {
    debounceInput(e.target.value);
  };

  const debounceInput = useCallback(
    debounce((keyword: string) => debounceKeyword(keyword), 1000),
    []
  );

  const debounceKeyword = (keyword: string) => {
    navigate({
      pathname: '/book',
      search: `?page=${page}&limit=${limit}&keyword=${keyword}`
    });
    setKeyword(keyword);
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
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <TextField id="outlined-required" onChange={onChangeKeyword} />
      </Box>
      {movie && (
        <MovieTable
          page={page}
          limit={limit}
          handleLimitChange={handleLimitChange}
          handlePageChange={handlePageChange}
          movies={movie}
        />
      )}
    </Card>
  );
}

export default Movie;
