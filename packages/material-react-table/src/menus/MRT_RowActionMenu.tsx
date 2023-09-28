import { type MouseEvent } from 'react';
import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
  commonListItemStyles,
  commonMenuItemStyles,
} from './MRT_ColumnActionMenu';
import { type MRT_Row, type MRT_TableInstance } from '../types';
import { parseFromValuesOrFunc } from '../column.utils';

interface Props<TData extends Record<string, any>> {
  anchorEl: HTMLElement | null;
  handleEdit: (event: MouseEvent) => void;
  row: MRT_Row<TData>;
  setAnchorEl: (anchorEl: HTMLElement | null) => void;
  table: MRT_TableInstance<TData>;
}

export const MRT_RowActionMenu = <TData extends Record<string, any>>({
  anchorEl,
  handleEdit,
  row,
  setAnchorEl,
  table,
}: Props<TData>) => {
  const {
    getState,
    options: {
      icons: { EditIcon },
      enableEditing,
      localization,
      renderRowActionMenuItems,
    },
  } = table;
  const { density } = getState();

  return (
    <Menu
      anchorEl={anchorEl}
      open={!!anchorEl}
      onClick={(event) => event.stopPropagation()}
      onClose={() => setAnchorEl(null)}
      MenuListProps={{
        dense: density === 'compact',
      }}
    >
      {parseFromValuesOrFunc(enableEditing, row) && (
        <MenuItem onClick={handleEdit} sx={commonMenuItemStyles}>
          <Box sx={commonListItemStyles}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            {localization.edit}
          </Box>
        </MenuItem>
      )}
      {renderRowActionMenuItems?.({
        row,
        table,
        closeMenu: () => setAnchorEl(null),
      })}
    </Menu>
  );
};
