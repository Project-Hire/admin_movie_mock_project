import { ChangeEvent, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Card } from '@mui/material';

import MovieTable from './MovieTable';
import { QUERY_KEYS } from 'src/models/key';
import { getMovieList } from 'src/utils/api/movie';
import { IMovieListDataResponse } from 'src/models/api/movie.interface';

function Movie() {
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

  return (
    <Card>
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
