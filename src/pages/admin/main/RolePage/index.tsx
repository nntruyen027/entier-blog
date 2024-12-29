import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { RootState } from '~/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getRolesStart } from '~/redux/role/slice';

const RolePage = () => {
  const { t } = useTranslation();
  const { roles } = useSelector((state: RootState) => state.role);
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  const columns: MRT_ColumnDef<object>[] = [
    {
      header: '#',
      accessorKey: 'no' // Số thứ tự
    },
    {
      header: t('name'), // Tên vai trò
      accessorKey: 'roleName',
      enableColumnOrdering: true,
      enableMultiSort: true
    }
  ];

  useEffect(() => {
    dispatch(getRolesStart({})); // Gửi action để lấy danh sách vai trò
  }, [dispatch]);

  return (
    <div>
      <div className='flex mb-4'>
        <div>Filter</div>
        <Button variant='contained' style={{ marginLeft: 'auto' }}>
          {t('add')}
        </Button>
      </div>
      <div>
        <MaterialReactTable
          columns={columns}
          data={roles.map((value, index) => ({
            no: index + 1,
            ...value
          }))}
          enableDensityToggle={false}
          initialState={{ density: 'compact' }}
          enableColumnOrdering
          muiTableBodyRowProps={{ hover: false }}
          muiTableProps={{
            sx: {
              border: '1px solid rgba(81, 81, 81, .5)',
              caption: {
                captionSide: 'top'
              }
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
          // onPaginationChange={setPagination}
          // state={{ pagination }}
        />
      </div>
    </div>
  );
};

export default RolePage;
