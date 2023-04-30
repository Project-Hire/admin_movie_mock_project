import { FC, ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router';
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
import {
  ICategoryListDataResponse,
  ICategoryListData
} from 'src/models/api/category.interface';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import BulkActions from './BulkActions';
import { IDataOpenAlert, useStatusAlert } from 'src/stores/useStatusAlert';
import { deleteCategory } from 'src/utils/api/category';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from 'src/models/key';

interface ICategoryTableProps {
  className?: string;
  categoryOrders: ICategoryListData[];
  page: number;
  limit: number;
  handlePageChange: (event: any, newPage: number) => void;
  handleLimitChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const applyCatePagination = (
  categoryOrders: ICategoryListData[],
  page: number,
  limit: number
): ICategoryListData[] => {
  return categoryOrders.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<ICategoryTableProps> = ({
  categoryOrders,
  page,
  limit,
  handleLimitChange,
  handlePageChange
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [update] = useStatusAlert((state: IDataOpenAlert) => [state.update]);

  const [selectedCategoryOrders, setSelectedCategoryOrders] = useState<
    string[]
  >([]);

  const selectedBulkActions = selectedCategoryOrders.length > 0;

  const handleSelectAllCategoryOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCategoryOrders(
      event.target.checked
        ? categoryOrders.map((categoryOrder) => categoryOrder.id)
        : []
    );
  };

  const handleSelectOneCategoryOrder = (
    event: ChangeEvent<HTMLInputElement>,
    categoryOrderId: string
  ): void => {
    if (!selectedCategoryOrders.includes(categoryOrderId)) {
      setSelectedCategoryOrders((prevSelected) => [
        ...prevSelected,
        categoryOrderId
      ]);
    } else {
      setSelectedCategoryOrders((prevSelected) =>
        prevSelected.filter((id) => id !== categoryOrderId)
      );
    }
  };
  const handleDetailCategory = async (id: string) => {
    navigate(`/detail/category/${id}`);
  };

  const handleEditCategory = async (id: string) => {
    navigate(`/edit/category/${id}`);
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteCategory({ id, accessToken: 'abc' });

      queryClient.invalidateQueries([QUERY_KEYS.CATEGORY_LIST]);

      update({
        message: `Delete Category Successfully`,
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

  const paginatedCategoryOrders = applyCatePagination(
    categoryOrders,
    page,
    limit
  );

  const selectedSomeCategoryOrders =
    selectedCategoryOrders.length > 0 &&
    selectedCategoryOrders.length < categoryOrders.length;
  const selectedAllCategoryOrders =
    selectedCategoryOrders.length === categoryOrders.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions selectedCategoryOrders={selectedCategoryOrders} />
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
                  checked={selectedAllCategoryOrders}
                  indeterminate={selectedSomeCategoryOrders}
                  onChange={handleSelectAllCategoryOrders}
                />
              </TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell>Create At</TableCell>
              <TableCell>Update At</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCategoryOrders.map((categoryOrder) => {
              const isCategoryOrderSelected = selectedCategoryOrders.includes(
                categoryOrder.id
              );
              return (
                <TableRow
                  hover
                  key={categoryOrder.id}
                  selected={isCategoryOrderSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCategoryOrderSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCategoryOrder(event, categoryOrder.id)
                      }
                      value={isCategoryOrderSelected}
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
                      {categoryOrder.name}
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
                      {categoryOrder.created}
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
                      {categoryOrder.updated}
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
                        onClick={() => handleDetailCategory(categoryOrder.id)}
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
                        onClick={() => handleEditCategory(categoryOrder.id)}
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
                        onClick={() => handleDeleteCategory(categoryOrder.id)}
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
