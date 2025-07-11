import { createFileRoute } from '@tanstack/react-router'
import { Card, Row, Col, Statistic } from 'antd'
import {
  UserOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  DollarOutlined,
} from '@ant-design/icons'

export const Route = createFileRoute('/')({
  component: AdminDashboard,
})

function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome to your admin panel. Here's an overview of your system.
        </p>
      </div>

      {/* Stats Cards */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="border-l-4 border-l-blue-500">
            <Statistic
              title={
                <span className="text-gray-600 font-medium">Total Users</span>
              }
              value={1234}
              prefix={<UserOutlined className="text-blue-500" />}
              valueStyle={{
                color: '#1f2937',
                fontSize: '2rem',
                fontWeight: 'bold',
              }}
            />
            <div className="mt-2 text-sm text-green-600">
              +12% from last month
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="border-l-4 border-l-green-500">
            <Statistic
              title={
                <span className="text-gray-600 font-medium">
                  Total Products
                </span>
              }
              value={567}
              prefix={<ShoppingCartOutlined className="text-green-500" />}
              valueStyle={{
                color: '#1f2937',
                fontSize: '2rem',
                fontWeight: 'bold',
              }}
            />
            <div className="mt-2 text-sm text-green-600">
              +8% from last month
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="border-l-4 border-l-orange-500">
            <Statistic
              title={
                <span className="text-gray-600 font-medium">Total Orders</span>
              }
              value={890}
              prefix={<FileTextOutlined className="text-orange-500" />}
              valueStyle={{
                color: '#1f2937',
                fontSize: '2rem',
                fontWeight: 'bold',
              }}
            />
            <div className="mt-2 text-sm text-red-600">-2% from last month</div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="border-l-4 border-l-purple-500">
            <Statistic
              title={<span className="text-gray-600 font-medium">Revenue</span>}
              value={45678}
              prefix={<DollarOutlined className="text-purple-500" />}
              precision={2}
              valueStyle={{
                color: '#1f2937',
                fontSize: '2rem',
                fontWeight: 'bold',
              }}
            />
            <div className="mt-2 text-sm text-green-600">
              +15% from last month
            </div>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Card
          title={<span className="text-lg font-semibold">Recent Activity</span>}
          className="shadow-sm"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <UserOutlined className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">New user registered</p>
                  <p className="text-sm text-gray-500">john.doe@example.com</p>
                </div>
              </div>
              <span className="text-xs text-gray-400">2 mins ago</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <ShoppingCartOutlined className="text-green-600" />
                </div>
                <div>
                  <p className="font-medium">New order placed</p>
                  <p className="text-sm text-gray-500">Order #12345</p>
                </div>
              </div>
              <span className="text-xs text-gray-400">5 mins ago</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <FileTextOutlined className="text-orange-600" />
                </div>
                <div>
                  <p className="font-medium">Product updated</p>
                  <p className="text-sm text-gray-500">iPhone 15 Pro</p>
                </div>
              </div>
              <span className="text-xs text-gray-400">10 mins ago</span>
            </div>
          </div>
        </Card>

        <Card
          title={<span className="text-lg font-semibold">Quick Actions</span>}
          className="shadow-sm"
        >
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-center">
              <UserOutlined className="text-2xl text-blue-600 mb-2" />
              <p className="font-medium text-blue-800">Add User</p>
            </button>

            <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-center">
              <ShoppingCartOutlined className="text-2xl text-green-600 mb-2" />
              <p className="font-medium text-green-800">Add Product</p>
            </button>

            <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-center">
              <FileTextOutlined className="text-2xl text-orange-600 mb-2" />
              <p className="font-medium text-orange-800">View Orders</p>
            </button>

            <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-center">
              <DollarOutlined className="text-2xl text-purple-600 mb-2" />
              <p className="font-medium text-purple-800">Reports</p>
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}
