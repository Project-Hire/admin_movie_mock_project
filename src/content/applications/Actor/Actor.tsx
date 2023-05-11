import { ChangeEvent, useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Card, Box, TextField, debounce } from '@mui/material';

import ActorTable from './ActorTable';
import { QUERY_KEYS } from 'src/models/key';
import { getActorList } from 'src/utils/api/actor';
import { IActorListDataResponse } from 'src/models/api/actor.interface';
import { useNavigate } from 'react-router';

function Actor() {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [keyword, setKeyword] = useState<string>('');

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
      pathname: '/management/actor',
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
        <TextField
          id="outlined-required"
          onChange={onChangeKeyword}
          defaultValue={keyword}
        />
      </Box>
      {actor && (
        <ActorTable
          page={page}
          limit={limit}
          handleLimitChange={handleLimitChange}
          handlePageChange={handlePageChange}
          actor={actor}
        />
      )}
    </Card>
  );
}

export default Actor;
