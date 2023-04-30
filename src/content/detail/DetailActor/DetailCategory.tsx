import { ChangeEvent, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Tooltip,
  Avatar,
  CardMedia,
  Button,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import { IDataOpenAlert, useStatusAlert } from 'src/stores/useStatusAlert';
import { addCategory, getCategoryData } from 'src/utils/api/category';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from 'src/models/key';
import { useNavigate, useParams } from 'react-router';
import {
  ICategoryListData,
  ICreateCategoryDataResponse
} from 'src/models/api/category.interface';

export const DetailCategory = () => {
  const navigate = useNavigate();
  const param = useParams();
  const queryClient = useQueryClient();
  const [update] = useStatusAlert((state: IDataOpenAlert) => [state.update]);

  const { data: categoryDetail } = useQuery(
    [QUERY_KEYS.CATEGORY_DETAIL, param.id],
    async () => {
      const response = (await getCategoryData({
        id: `${param.id}`,
        accessToken: 'abc'
      })) as ICategoryListData;
      return response;
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false
    }
  );
  return (
    <Box display="flex" mb={3}>
      <Tooltip arrow placement="top" title="Go back">
        <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
          <ArrowBackTwoToneIcon />
        </IconButton>
      </Tooltip>
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
    </Box>
  );
};
