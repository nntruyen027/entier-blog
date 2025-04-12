import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Menu, Table as AntTable } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { RowAction } from '~/types';
import { EllipsisOutlined } from '@ant-design/icons';
import { getParamByKey } from '~/redux/param/api';

export interface TableProps<T = object> {
  columns: ColumnsType<T>;
  data: T[];
  setPagination: ({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }) => void;
  pagination: { pageIndex: number; pageSize: number };
  rowCount: number;
  pageCount: number;
  actions?: RowAction<T>[];
  positionActionsColumn?: 'first' | 'last';
  isLoading: boolean;
}

const Table = <T extends object>({
  columns,
  data,
  setPagination,
  pagination,
  rowCount,
  actions,
  positionActionsColumn = 'last',
  isLoading
}: TableProps<T>) => {
  const [pageSizeOptions, setPageSizeOptions] = useState<string[]>([]);
  const [defaultPageSize, setDefaultPageSize] = useState<number | null>(null);

  // Lấy pageSizeOptions từ server
  const getPageSizeOptions = async () => {
    try {
      const { value } = await getParamByKey('pageSizeOptions');
      setPageSizeOptions(value);
    } catch (err) {
      setPageSizeOptions(['5', '10', '20', '50', '100']);
    }
  };

  // Lấy defaultPageSize từ server
  const fetchDefaultPageSize = async () => {
    try {
      const { value } = await getParamByKey('defaultPageSize');
      setDefaultPageSize(value);
    } catch (err) {
      setDefaultPageSize(10);
    }
  };

  useEffect(() => {
    getPageSizeOptions();
    fetchDefaultPageSize();
  }, []);

  // Nếu có defaultPageSize mà pagination chưa có, thì cập nhật pagination
  useEffect(() => {
    if (defaultPageSize !== null && pagination.pageSize !== defaultPageSize) {
      setPagination({ pageIndex: 0, pageSize: defaultPageSize });
    }
  }, [defaultPageSize]);

  const getMenu = (record: T) => (
    <Menu>
      {actions?.map((action, index) => (
        <Menu.Item key={index} icon={action.icon} onClick={() => action.onClick(record)}>
          {action.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  const actionColumn = actions
    ? {
        title: '',
        key: 'actions',
        fixed: positionActionsColumn,
        width: 48,
        render: (_: any, record: T) => (
          <Dropdown overlay={getMenu(record)} trigger={['click']} placement='bottomRight' arrow>
            <Button type='text' icon={<EllipsisOutlined />} />
          </Dropdown>
        )
      }
    : null;

  const finalColumns =
    positionActionsColumn === 'first'
      ? [actionColumn, ...columns].filter(Boolean)
      : [...columns, actionColumn].filter(Boolean);

  return (
    <AntTable
      loading={isLoading}
      columns={finalColumns as ColumnsType<T>}
      dataSource={data}
      rowKey={(record: any) => record.id || JSON.stringify(record)}
      pagination={{
        current: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        total: rowCount,
        showSizeChanger: true,
        pageSizeOptions: pageSizeOptions,
        onChange: (page, pageSize) => setPagination({ pageIndex: page - 1, pageSize })
      }}
      scroll={{ x: 'max-content' }}
      showHeader
      size='small'
      rowClassName={(_, index) => (index % 2 === 0 ? 'table-row-light' : 'table-row-dark')}
      bordered={false}
    />
  );
};

export default Table;
