import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  ImageListItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';

import Label from 'src/components/Label';
import { CryptoOrder, CryptoOrderStatus } from 'src/models/crypto_order';
import {
  IMovieListDataResponse,
  IMovieListData
} from 'src/models/api/movie.interface';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import { IDataOpenAlert, useStatusAlert } from 'src/stores/useStatusAlert';
import { deleteMovie } from 'src/utils/api/movie';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from 'src/models/key';

interface IMovieTableProps {
  className?: string;
  movieOrders: IMovieListData[];
  page: number;
  limit: number;
  handlePageChange: (event: any, newPage: number) => void;
  handleLimitChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const applyMoviePagination = (
  categoryOrders: IMovieListData[],
  page: number,
  limit: number
): IMovieListData[] => {
  return categoryOrders.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<IMovieTableProps> = ({
  movieOrders,
  page,
  limit,
  handleLimitChange,
  handlePageChange
}) => {
  const queryClient = useQueryClient();
  const [update] = useStatusAlert((state: IDataOpenAlert) => [state.update]);

  const [selectedMovieOrders, setSelectedMovieOrders] = useState<string[]>([]);

  const selectedBulkActions = selectedMovieOrders.length > 0;

  const handleSelectAllMovieOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedMovieOrders(
      event.target.checked ? movieOrders.map((movieOrder) => movieOrder.id) : []
    );
  };

  const handleSelectOneMovieOrder = (
    event: ChangeEvent<HTMLInputElement>,
    movieOrderId: string
  ): void => {
    if (!selectedMovieOrders.includes(movieOrderId)) {
      setSelectedMovieOrders((prevSelected) => [...prevSelected, movieOrderId]);
    } else {
      setSelectedMovieOrders((prevSelected) =>
        prevSelected.filter((id) => id !== movieOrderId)
      );
    }
  };

  const handleDeleteMovie = async (id: string) => {
    try {
      await deleteMovie({ id, accessToken: 'abc' });

      queryClient.invalidateQueries([QUERY_KEYS.MOVIE_LIST]);

      update({
        message: `Delete Movie Successfully`,
        severity: 'success',
        open: true
      });
    } catch (error) {
      update({
        message: error.message,
        severity: 'error',
        open: true
      });
    }
  };

  const paginatedMovieOrders = applyMoviePagination(movieOrders, page, limit);

  const selectedSomeMovieOrders =
    selectedMovieOrders.length > 0 &&
    selectedMovieOrders.length < movieOrders.length;
  const selectedAllMovieOrders =
    selectedMovieOrders.length === movieOrders.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions selectedMovieOrders={selectedMovieOrders} />
        </Box>
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllMovieOrders}
                  indeterminate={selectedSomeMovieOrders}
                  onChange={handleSelectAllMovieOrders}
                />
              </TableCell>
              <TableCell>Movie Name</TableCell>
              <TableCell>Movie Description</TableCell>
              <TableCell>Actor</TableCell>
              <TableCell>Movie Poster</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Create At</TableCell>
              <TableCell>Update At</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedMovieOrders.map((movieOrder) => {
              const isMovieOrderSelected = selectedMovieOrders.includes(
                movieOrder.id
              );
              return (
                <TableRow
                  hover
                  key={movieOrder.id}
                  selected={isMovieOrderSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isMovieOrderSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneMovieOrder(event, movieOrder.id)
                      }
                      value={isMovieOrderSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {movieOrder.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {movieOrder.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {movieOrder.actor}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <img title="movie_poster" src={movieOrder.poster} />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {movieOrder.category}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {movieOrder.created}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {movieOrder.updated}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.error.lighter
                          },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => handleDeleteMovie(movieOrder.id)}
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={5}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

export default RecentOrdersTable;
