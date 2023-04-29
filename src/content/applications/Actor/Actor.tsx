import { ChangeEvent, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Card } from '@mui/material';

import ActorTable from './ActorTable';
import { QUERY_KEYS } from 'src/models/key';
import { getActorList } from 'src/utils/api/actor';
import { IActorListDataResponse } from 'src/models/api/actor.interface';

function Actor() {
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

  return (
    <Card>
      {actor && (
        <ActorTable
          page={page}
          limit={limit}
          handleLimitChange={handleLimitChange}
          handlePageChange={handlePageChange}
          actorOrders={actor.items}
        />
      )}
    </Card>
  );
}

export default Actor;
