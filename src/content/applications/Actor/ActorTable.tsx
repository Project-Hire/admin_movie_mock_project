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
  IActorListDataResponse,
  IActorListData
} from 'src/models/api/actor.interface';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import { IDataOpenAlert, useStatusAlert } from 'src/stores/useStatusAlert';
import { deleteActor } from 'src/utils/api/actor';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from 'src/models/key';
import { useNavigate } from 'react-router';

interface IActorTableProps {
  className?: string;
  actorOrders: IActorListData[];
  page: number;
  limit: number;
  handlePageChange: (event: any, newPage: number) => void;
  handleLimitChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const applyActorPagination = (
  actorOrders: IActorListData[],
  page: number,
  limit: number
): IActorListData[] => {
  return actorOrders.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<IActorTableProps> = ({
  actorOrders,
  page,
  limit,
  handleLimitChange,
  handlePageChange
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [update] = useStatusAlert((state: IDataOpenAlert) => [state.update]);

  const [selectedActorOrders, setSelectedActorOrders] = useState<string[]>([]);

  const selectedBulkActions = selectedActorOrders.length > 0;

  const handleSelectAllActorOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedActorOrders(
      event.target.checked ? actorOrders.map((actorOrder) => actorOrder.id) : []
    );
  };

  const handleSelectOneActorOrder = (
    event: ChangeEvent<HTMLInputElement>,
    actorOrderId: string
  ): void => {
    if (!selectedActorOrders.includes(actorOrderId)) {
      setSelectedActorOrders((prevSelected) => [...prevSelected, actorOrderId]);
    } else {
      setSelectedActorOrders((prevSelected) =>
        prevSelected.filter((id) => id !== actorOrderId)
      );
    }
  };

  const handleDetailActor = async (id: string) => {
    navigate(`/detail/actor/${id}`);
  };

  const handleEditActor = async (id: string) => {
    navigate(`/edit/actor/${id}`);
  };

  const handleDeleteActor = async (id: string) => {
    try {
      await deleteActor({ id });

      queryClient.invalidateQueries([QUERY_KEYS.ACTOR_LIST]);

      update({
        message: `Delete Actor Successfully`,
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

  const paginatedActorOrders = applyActorPagination(actorOrders, page, limit);

  const selectedSomeActorOrders =
    selectedActorOrders.length > 0 &&
    selectedActorOrders.length < actorOrders.length;
  const selectedAllActorOrders =
    selectedActorOrders.length === actorOrders.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions selectedActorOrders={selectedActorOrders} />
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
                  checked={selectedAllActorOrders}
                  indeterminate={selectedSomeActorOrders}
                  onChange={handleSelectAllActorOrders}
                />
              </TableCell>
              <TableCell>Actor Name</TableCell>
              <TableCell>Avatar</TableCell>
              <TableCell>Create At</TableCell>
              <TableCell>Update At</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedActorOrders.map((ActorOrder) => {
              const isActorOrderSelected = selectedActorOrders.includes(
                ActorOrder.id
              );
              return (
                <TableRow
                  hover
                  key={ActorOrder.id}
                  selected={isActorOrderSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isActorOrderSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneActorOrder(event, ActorOrder.id)
                      }
                      value={isActorOrderSelected}
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
                      {ActorOrder.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <img title={ActorOrder.name} src={ActorOrder.avatar} />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {ActorOrder.created}
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
                      {ActorOrder.updated}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="View Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => handleDetailActor(ActorOrder.id)}
                      >
                        <VisibilityTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
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
                        onClick={() => handleEditActor(ActorOrder.id)}
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
                        onClick={() => handleDeleteActor(ActorOrder.id)}
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
