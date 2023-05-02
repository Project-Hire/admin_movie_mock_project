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
import { getMovieData } from 'src/utils/api/movie';

export const DetailMovie = () => {
  const { id } = useParams();

  const {
    data: movieDetail,
    isError,
    isFetching
  } = useQuery(
    [QUERY_KEYS.ACTOR_DETAIL, id],
    async () => {
      const response = await getMovieData({
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

  if (!isFetching && (isError || typeof movieDetail === 'undefined')) {
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
          Profile for {movieDetail.name}
        </Typography>
        <Typography variant="subtitle2">
          Movie's description: {movieDetail.description}
        </Typography>
        <Typography variant="subtitle2">
          Movie's actor: {movieDetail.actor}
        </Typography>
        <img title={movieDetail.name} src={movieDetail.poster} />
        <Typography variant="subtitle2">
          Movie's category: {movieDetail.category}
        </Typography>
        <Typography variant="subtitle2">
          Create at {movieDetail.created}
        </Typography>
        <Typography variant="subtitle2">
          Create at {movieDetail.updated}
        </Typography>
      </Box>
    </Box>
  );
};
