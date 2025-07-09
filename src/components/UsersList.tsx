import React from 'react'
import {
  Table,
  Button,
  Space,
  message,
  Popconfirm,
  Card,
  Typography,
} from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
} from '@ant-design/icons'
import { useUsers, useDeleteUser, type User } from '../hooks/useUsers'

const { Title } = Typography

export const UsersList: React.FC = () => {
  const { data: users, isLoading, error } = useUsers()
  const deleteUserMutation = useDeleteUser()

  const handleDelete = async (id: number) => {
    try {
      await deleteUserMutation.mutateAsync(id)
      message.success('User deleted successfully')
    } catch (error) {
      message.error('Failed to delete user')
    }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (_: any, record: User) => (
        <Space size="middle">
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => {
              // Handle edit - you can implement modal or navigate to edit page
              message.info(`Edit user ${record.name}`)
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete User"
            description="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
            okType="danger"
          >
            <Button
              type="primary"
              danger
              size="small"
              icon={<DeleteOutlined />}
              loading={deleteUserMutation.isPending}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  if (error) {
    return (
      <Card>
        <div className="text-center text-red-500">
          <h3>Error loading users</h3>
          <p>
            {error instanceof Error ? error.message : 'Unknown error occurred'}
          </p>
        </div>
      </Card>
    )
  }

  return (
    <div className="p-6">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <Title level={2}>Users Management</Title>
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            onClick={() => {
              // Handle add user - you can implement modal or navigate to add page
              message.info('Add new user')
            }}
          >
            Add User
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={users}
          loading={isLoading}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} users`,
          }}
          scroll={{ x: 'max-content' }}
        />
      </Card>
    </div>
  )
}

export default UsersList
