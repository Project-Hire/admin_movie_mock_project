import { Card, Box, Typography, Tooltip, IconButton } from '@mui/material';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import { getCategoryData } from 'src/utils/api/category';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'src/models/key';
import { Navigate, useParams } from 'react-router';

export const DetailCategory = () => {
  const { id } = useParams();

  const {
    data: categoryDetail,
    isError,
    isFetching
  } = useQuery(
    [QUERY_KEYS.CATEGORY_DETAIL, id],
    async () => {
      const response = await getCategoryData({
        id,
        accessToken: 'abc'
      });

      return response;
    },
    {
      enabled: !!id,
      refetchInterval: false,
      refetchOnWindowFocus: false
    }
  );

  if (!isFetching && (isError || typeof categoryDetail === 'undefined')) {
    return <Navigate to={'/404'} replace />;
  }

  return (
    <Card>
      <Box display="flex" mb={3} p={3}>
        <Tooltip arrow placement="top" title="Go back">
          <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
            <ArrowBackTwoToneIcon />
          </IconButton>
        </Tooltip>
        {categoryDetail && (
          <Box>
            <Typography variant="h3" component="h3" gutterBottom>
              Profile for {categoryDetail.name}
            </Typography>
            <Typography variant="subtitle2">
              Create at {categoryDetail.created}
            </Typography>
            <Typography variant="subtitle2">
              Create at {categoryDetail.updated}
            </Typography>
          </Box>
        )}
      </Box>
    </Card>
  );
};
