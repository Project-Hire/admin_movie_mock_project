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
import { Navigate, useNavigate, useParams } from 'react-router';
import {
  ICategoryListData,
  ICreateCategoryDataResponse
} from 'src/models/api/category.interface';
import { getActorData } from 'src/utils/api/actor';

export const DetailActor = () => {
  const { id } = useParams();

  const {
    data: actorDetail,
    isError,
    isFetching
  } = useQuery(
    [QUERY_KEYS.ACTOR_DETAIL, id],
    async () => {
      const response = await getActorData({
        id
      });

      return response;
    },
    {
      enabled: !!id,
      refetchInterval: false,
      refetchOnWindowFocus: false
    }
  );

  if (!isFetching && (isError || typeof actorDetail === 'undefined')) {
    return <Navigate to={'/404'} replace />;
  }
  return (
    <Box display="flex" mb={3}>
      <Tooltip arrow placement="top" title="Go back">
        <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
          <ArrowBackTwoToneIcon />
        </IconButton>
      </Tooltip>
      <Box>
        <Typography variant="h3" component="h3" gutterBottom>
          Profile for {actorDetail.name}
        </Typography>
        <img title={actorDetail.name} src={actorDetail.avatar} />
        <Typography variant="subtitle2">
          Create at {actorDetail.created}
        </Typography>
        <Typography variant="subtitle2">
          Create at {actorDetail.updated}
        </Typography>
      </Box>
    </Box>
  );
};
