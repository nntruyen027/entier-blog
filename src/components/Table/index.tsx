import React from 'react';
import { Button, Dropdown, Menu, Table as AntTable } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { RowAction } from '~/types';
import { EllipsisOutlined } from '@ant-design/icons';

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
        pageSizeOptions: ['5', '10', '20', '50', '100'],
        defaultPageSize: 10,
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
