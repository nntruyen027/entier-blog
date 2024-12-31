import React from 'react';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { Box, IconButton } from '@mui/material';
import { RowAction } from '~/types';

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
}: TableProps<T>) => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableDensityToggle={false}
    initialState={{ density: 'compact' }}
    enableColumnOrdering
    muiTableBodyRowProps={{ hover: false }}
    muiTableProps={{
      sx: {
        caption: {
          captionSide: 'top'
        },
        padding: '1rem'
      }
    }}
    muiTableHeadCellProps={{
      sx: {
        border: '1px solid rgba(81, 81, 81, .5)',
        fontStyle: 'italic',
        fontWeight: 'normal'
      }
    }}
    muiTableBodyCellProps={{
      sx: {
        border: '1px solid rgba(81, 81, 81, .5)'
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
        <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
          {actions.map((action, index) => (
            <IconButton key={index} aria-label={action.label} onClick={() => action.onClick(row, table)}>
              {action.icon}
            </IconButton>
          ))}
        </Box>
      ) : null
    }
  />
);

export default Table;
