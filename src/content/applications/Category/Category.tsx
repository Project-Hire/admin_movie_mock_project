import { ChangeEvent, useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Card, TextField, debounce, Box } from '@mui/material';

import CategoryTable from './CategoryTable';
import { QUERY_KEYS } from 'src/models/key';
import { ICategoryListDataResponse } from 'src/models/api/category.interface';
import { getCategoryList } from 'src/utils/api/category';
import { useNavigate } from 'react-router';

function Category() {
  const navigate = useNavigate();
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

  const onChangeKeyword = (e: { target: { value: string } }) => {
    debounceInput(e.target.value);
  };

  const debounceInput = useCallback(
    debounce((keyword: string) => debounceKeyword(keyword), 1000),
    []
  );

  const debounceKeyword = (keyword: string) => {
    navigate({
      pathname: '/management/category',
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
