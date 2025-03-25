import React, { useState } from 'react';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import { RowAction } from '~/types';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export interface TableProps<T = object> {
  columns: MRT_ColumnDef<T>[]; // Định nghĩa cột cho bảng
  data: T[]; // Dữ liệu của bảng
  setPagination: ({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }) => void; // Xử lý phân trang
  pagination: { pageIndex: number; pageSize: number }; // Thông tin phân trang
  rowCount: number; // Tổng số dòng dữ liệu
  pageCount: number; // Tổng số trang
  actions?: RowAction<T>[]; // Các hành động của dòng (tuỳ chọn)
  positionActionsColumn?: 'first' | 'last';
}

const Table = <T extends object>({
  columns,
  data,
  setPagination,
  pagination,
  rowCount,
  pageCount,
  actions,
  positionActionsColumn = 'last'
}: TableProps<T>) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, row: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  return (
    <MaterialReactTable
      layoutMode='grid'
      columns={columns}
      data={data}
      enableDensityToggle={false}
      initialState={{ density: 'compact' }}
      enableColumnOrdering
      muiTableHeadCellProps={{
        sx: {
          backgroundColor: '#fef5c4', // Nền tiêu đề bảng (hòa hợp với sidebar)
          fontWeight: 'bold',
          color: '#333'
        }
      }}
      muiTableBodyRowProps={({ row }) => ({
        sx: {
          backgroundColor: row.index % 2 === 0 ? '#f9f9f9' : '#fff' // Màu xen kẽ mềm mại hơn
        }
      })}
      muiTableBodyCellProps={{
        sx: {
          borderBottom: '1px solid #ddd', // Đường kẻ ô nhẹ nhàng
          color: '#333' // Màu chữ dễ nhìn hơn
        }
      }}
      onPaginationChange={setPagination}
      state={{ pagination }}
      manualPagination
      rowCount={rowCount}
      pageCount={pageCount}
      enableRowActions={!!actions}
      positionActionsColumn={positionActionsColumn}
      renderRowActions={({ row, table }) =>
        actions ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              position: 'sticky',
              right: 0,
              zIndex: 2
            }}
          >
            <IconButton onClick={(event) => handleOpenMenu(event, row)}>
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
              {actions.map((action, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    action.onClick(selectedRow, table);
                    handleCloseMenu();
                  }}
                >
                  {action.icon} {action.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        ) : null
      }
    />
  );
};

export default Table;
