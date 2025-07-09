import { createFileRoute } from '@tanstack/react-router'
import { Card, Typography, Space, Tag, Divider, Alert } from 'antd'
import {
  CheckCircleOutlined,
  ApiOutlined,
  DatabaseOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import UsersList from '../components/UsersList'

const { Title, Paragraph } = Typography

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <Card className="mb-6">
          <div className="text-center">
            <Title level={1} className="mb-4">
              🚀 Base Project Setup Complete!
            </Title>
            <Paragraph className="text-lg text-gray-600 mb-6">
              Your project is now configured with all the requested technologies
            </Paragraph>

            {/* Technology Stack Tags */}
            <Space wrap className="mb-6">
              <Tag
                icon={<CheckCircleOutlined />}
                color="green"
                className="text-base px-4 py-2"
              >
                ⚡ Vite
              </Tag>
              <Tag
                icon={<ApiOutlined />}
                color="blue"
                className="text-base px-4 py-2"
              >
                🔄 TanStack Router
              </Tag>
              <Tag
                icon={<DatabaseOutlined />}
                color="purple"
                className="text-base px-4 py-2"
              >
                🔍 TanStack Query
              </Tag>
              <Tag
                icon={<SettingOutlined />}
                color="orange"
                className="text-base px-4 py-2"
              >
                📡 Axios
              </Tag>
              <Tag
                icon={<CheckCircleOutlined />}
                color="cyan"
                className="text-base px-4 py-2"
              >
                🎨 Ant Design
              </Tag>
              <Tag
                icon={<CheckCircleOutlined />}
                color="geekblue"
                className="text-base px-4 py-2"
              >
                🎯 TypeScript
              </Tag>
              <Tag
                icon={<CheckCircleOutlined />}
                color="lime"
                className="text-base px-4 py-2"
              >
                💨 Tailwind CSS
              </Tag>
            </Space>
          </div>
        </Card>

        {/* Setup Information */}
        <Card className="mb-6">
          <Title level={3}>📋 What's Configured:</Title>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-blue-600">✅ TanStack Query</h4>
              <ul className="text-sm text-gray-600 ml-4">
                <li>• QueryClient with optimized defaults</li>
                <li>• React Query Devtools enabled</li>
                <li>• Custom hooks example (useUsers)</li>
                <li>• Cache management & mutations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-600">✅ Axios Setup</h4>
              <ul className="text-sm text-gray-600 ml-4">
                <li>• Configured base API instance</li>
                <li>• Request/Response interceptors</li>
                <li>• Auto token attachment</li>
                <li>• Error handling</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-600">✅ Ant Design</h4>
              <ul className="text-sm text-gray-600 ml-4">
                <li>• Complete component library</li>
                <li>• Icons package included</li>
                <li>• Table, Forms, Buttons, etc.</li>
                <li>• Works with Tailwind CSS</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-orange-600">
                ✅ TanStack Router
              </h4>
              <ul className="text-sm text-gray-600 ml-4">
                <li>• File-based routing</li>
                <li>• Type-safe navigation</li>
                <li>• Router devtools</li>
                <li>• QueryClient in context</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Demo Alert */}
        <Alert
          message="Demo Component Below"
          description="The UsersList component demonstrates TanStack Query + Axios + Ant Design integration. Note: API calls will fail until you configure a real backend endpoint in src/lib/api.ts"
          type="info"
          showIcon
          className="mb-6"
        />

        <Divider />

        {/* Demo Component */}
        <UsersList />
      </div>
    </div>
  )
}
