'use client'

import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

const monthlySales: { month: string; sales: number; orders: number }[] = []

const categoryDist: { name: string; value: number }[] = []

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Revenue', value: 'Rs 0', change: '0%', icon: DollarSign, color: 'bg-green-100 text-green-700' },
    { label: 'Total Orders', value: '0', change: '0%', icon: ShoppingBag, color: 'bg-blue-100 text-blue-700' },
    { label: 'Total Customers', value: '0', change: '0%', icon: Users, color: 'bg-purple-100 text-purple-700' },
    { label: 'Conversion Rate', value: '0%', change: '0%', icon: TrendingUp, color: 'bg-amber-100 text-amber-700' },
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 md:p-6 ambient-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className="font-sans text-sm text-green-600 font-medium">{stat.change}</span>
            </div>
            <p className="font-sans text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
            <p className="font-sans text-sm text-on-surface-variant mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 md:p-6 ambient-shadow">
          <h3 className="font-serif text-headline-sm text-primary mb-6">Monthly Sales</h3>
          <div className="h-64 md:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E2E2" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fontFamily: 'Manrope' }} stroke="#7E7576" />
                <YAxis tick={{ fontSize: 12, fontFamily: 'Manrope' }} stroke="#7E7576" />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E2E2', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                <Bar dataKey="sales" fill="#3B2A20" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 md:p-6 ambient-shadow">
          <h3 className="font-serif text-headline-sm text-primary mb-6">Order Trends</h3>
          <div className="h-64 md:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E2E2" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fontFamily: 'Manrope' }} stroke="#7E7576" />
                <YAxis tick={{ fontSize: 12, fontFamily: 'Manrope' }} stroke="#7E7576" />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E2E2', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                <Line type="monotone" dataKey="orders" stroke="#000000" strokeWidth={2} dot={{ fill: '#000000', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 md:p-6 ambient-shadow">
        <h3 className="font-serif text-headline-sm text-primary mb-4">Category Distribution</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {categoryDist.map((cat) => (
            <div key={cat.name} className="text-center p-4 bg-surface-bright rounded-xl">
              <p className="font-sans text-2xl font-bold text-primary">{cat.value}%</p>
              <p className="font-sans text-sm text-on-surface-variant">{cat.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
