import { useState, useRef } from 'react';

import {
  Box,
  Menu,
  IconButton,
  Button,
  ListItemText,
  ListItem,
  List,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import { deleteCategory } from 'src/utils/api/category';
import { useQueryClient } from '@tanstack/react-query';
import { IDataOpenAlert, useStatusAlert } from 'src/stores/useStatusAlert';
import { QUERY_KEYS } from 'src/models/key';

interface Props {
  selectedCategoryOrders: string[];
}

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

function BulkActions({ selectedCategoryOrders }: Props) {
  const queryClient = useQueryClient();
  const [update] = useStatusAlert((state: IDataOpenAlert) => [state.update]);

  const [onMenuOpen, menuOpen] = useState<boolean>(false);
  const moreRef = useRef<HTMLButtonElement | null>(null);

  const openMenu = (): void => {
    menuOpen(true);
  };

  const closeMenu = (): void => {
    menuOpen(false);
  };

  const handleDelete = async () => {
    if (selectedCategoryOrders.length === 0) {
      update({
        message: `Please select the category to delete`,
        severity: 'success',
        open: true
      });
    } else {
      const promises = selectedCategoryOrders.map(
        async (selectedCategory: string) => {
          await deleteCategory({
            id: selectedCategory
          });
        }
      );

      try {
        const results = await Promise.all(promises);

        if (results) {
          queryClient.invalidateQueries([QUERY_KEYS.CATEGORY_LIST]);

          update({
            message: `Delete Categories Successfully`,
            severity: 'success',
            open: true
          });
        } else {
          update({
            message: `Delete Categories Fail`,
            severity: 'error',
            open: true
          });
        }
      } catch (error) {
        update({
          message: error.message,
          severity: 'error',
          open: true
        });
      }
    }
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Typography variant="h5" color="text.secondary">
            Bulk actions:
          </Typography>
          <ButtonError
            sx={{ ml: 1 }}
            startIcon={<DeleteTwoToneIcon />}
            variant="contained"
            onClick={handleDelete}
          >
            Delete
          </ButtonError>
        </Box>
        <IconButton
          color="primary"
          onClick={openMenu}
          ref={moreRef}
          sx={{ ml: 2, p: 1 }}
        >
          <MoreVertTwoToneIcon />
        </IconButton>
      </Box>

      <Menu
        keepMounted
        anchorEl={moreRef.current}
        open={onMenuOpen}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
      >
        <List sx={{ p: 1 }} component="nav">
          <ListItem button>
            <ListItemText primary="Bulk delete selected" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Bulk edit selected" />
          </ListItem>
        </List>
      </Menu>
    </>
  );
}

export default BulkActions;
