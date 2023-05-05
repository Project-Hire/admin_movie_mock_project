import { ChangeEvent, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Card } from '@mui/material';

import CategoryTable from './CategoryTable';
import { QUERY_KEYS } from 'src/models/key';
import { ICategoryListDataResponse } from 'src/models/api/category.interface';
import { getCategoryList } from 'src/utils/api/category';

function Category() {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [keyword, setKeyword] = useState<string>('');

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

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  return (
    <Card>
      {category && (
        <CategoryTable
          page={page}
          limit={limit}
          handleLimitChange={handleLimitChange}
          handlePageChange={handlePageChange}
          categories={category}
        />
      )}
    </Card>
  );
}

export default Category;
