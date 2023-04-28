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
  ICategoryListDataResponse,
  ICategoryListData
} from 'src/models/api/category.interface';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import { IDataOpenAlert, useStatusAlert } from 'src/stores/useStatusAlert';
import { deleteCategory } from 'src/utils/api/category';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from 'src/models/key';

interface CategoryTableProps {
  className?: string;
  categoryOrders: CryptoOrder[];
}
interface ICategoryTableProps {
  className?: string;
  categoryOrders: ICategoryListData[];
  page: number;
  limit: number;
  handlePageChange: (event: any, newPage: number) => void;
  handleLimitChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const applyPagination = (
  categoryOrders: CryptoOrder[],
  page: number,
  limit: number
): CryptoOrder[] => {
  return categoryOrders.slice(page * limit, page * limit + limit);
};

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
  const [update] = useStatusAlert((state: IDataOpenAlert) => [state.update]);

  const [selectedCategoryOrders, setSelectedCategoryOrders] = useState<
    string[]
  >([]);

  const selectedBulkActions = selectedCategoryOrders.length > 0;

  const handleSelectAllCryptoOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCategoryOrders(
      event.target.checked
        ? categoryOrders.map((cryptoOrder) => cryptoOrder.id)
        : []
    );
  };

  const handleSelectOneCryptoOrder = (
    event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: string
  ): void => {
    if (!selectedCategoryOrders.includes(cryptoOrderId)) {
      setSelectedCategoryOrders((prevSelected) => [
        ...prevSelected,
        cryptoOrderId
      ]);
    } else {
      setSelectedCategoryOrders((prevSelected) =>
        prevSelected.filter((id) => id !== cryptoOrderId)
      );
    }
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

  const selectedSomeCryptoOrders =
    selectedCategoryOrders.length > 0 &&
    selectedCategoryOrders.length < categoryOrders.length;
  const selectedAllCryptoOrders =
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
                  checked={selectedAllCryptoOrders}
                  indeterminate={selectedSomeCryptoOrders}
                  onChange={handleSelectAllCryptoOrders}
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
                        handleSelectOneCryptoOrder(event, categoryOrder.id)
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
