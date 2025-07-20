import React, { useState } from 'react'
import {
  Table,
  Button,
  Space,
  message,
  Popconfirm,
  Card,
  Typography,
  Tag,
  Modal,
  Form,
  Input,
  Select,
} from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  TranslationOutlined,
} from '@ant-design/icons'
import {
  useLanguages,
  useDeleteLanguage,
  useCreateLanguage,
  useUpdateLanguage,
} from '../hooks/useLanguages'
import type { Language, CreateLanguageData, UpdateLanguageData } from '../types'

const { Title } = Typography
const { Option } = Select

export const LanguagesList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingLanguage, setEditingLanguage] = useState<Language | null>(null)
  const [form] = Form.useForm()

  const {
    data: languagesResponse,
    isLoading,
    error,
  } = useLanguages({
    page: currentPage,
    limit: pageSize,
  })
  const deleteLanguageMutation = useDeleteLanguage()
  const createLanguageMutation = useCreateLanguage()
  const updateLanguageMutation = useUpdateLanguage()

  const languages = languagesResponse?.results || []
  const total = languagesResponse?.total || 0

  const handleDelete = async (id: number) => {
    try {
      await deleteLanguageMutation.mutateAsync(id)
      message.success('Language deleted successfully')
    } catch (error) {
      message.error('Failed to delete language')
    }
  }

  const handleEdit = (language: Language) => {
    setEditingLanguage(language)
    form.setFieldsValue(language)
    setIsModalVisible(true)
  }

  const handleAdd = () => {
    setEditingLanguage(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleModalSubmit = async () => {
    try {
      const values = await form.validateFields()

      if (editingLanguage) {
        await updateLanguageMutation.mutateAsync({
          id: editingLanguage.id,
          languageData: values as UpdateLanguageData,
        })
        message.success('Language updated successfully')
      } else {
        // Create new language
        await createLanguageMutation.mutateAsync(values as CreateLanguageData)
        message.success('Language created successfully')
      }

      setIsModalVisible(false)
      form.resetFields()
      setEditingLanguage(null)
    } catch (error) {
      message.error(
        editingLanguage
          ? 'Failed to update language'
          : 'Failed to create language',
      )
    }
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
    setEditingLanguage(null)
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
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      render: (text: string) => (text ? <Tag color="blue">{text}</Tag> : '-'),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => text || '-',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color =
          status === 'active'
            ? 'green'
            : status === 'inactive'
              ? 'red'
              : 'default'
        return <Tag color={color}>{status || 'Unknown'}</Tag>
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (_: any, record: Language) => (
        <Space size="middle">
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete Language"
            description="Are you sure you want to delete this language?"
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
              loading={deleteLanguageMutation.isPending}
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
          <h3>Error loading languages</h3>
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
          <Title level={2}>Languages Management</Title>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Add Language
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={languages}
          loading={isLoading}
          rowKey="id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} languages`,
            onChange: (page, size) => {
              setCurrentPage(page)
              setPageSize(size || 10)
            },
          }}
          scroll={{ x: 'max-content' }}
        />
      </Card>

      <Modal
        title={editingLanguage ? 'Edit Language' : 'Add Language'}
        open={isModalVisible}
        onOk={handleModalSubmit}
        onCancel={handleModalCancel}
        confirmLoading={
          createLanguageMutation.isPending || updateLanguageMutation.isPending
        }
        width={600}
      >
        <Form form={form} layout="vertical" name="languageForm">
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: 'Please input the language name!' },
            ]}
          >
            <Input placeholder="Enter language name" />
          </Form.Item>

          <Form.Item label="Code" name="code" rules={[{ required: false }]}>
            <Input placeholder="Enter language code (e.g., en, fr, es)" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea placeholder="Enter language description" rows={3} />
          </Form.Item>

          <Form.Item label="Status" name="status">
            <Select placeholder="Select status">
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
              <Option value="draft">Draft</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default LanguagesList
