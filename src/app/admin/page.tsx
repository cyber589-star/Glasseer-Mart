'use client'

import { useState, useEffect } from 'react'
import { DollarSign, ShoppingBag, Users, TrendingUp, Package } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { supabase } from '@/lib/supabase'
import { formatPrice } from '@/lib/utils'

export default function AdminDashboard() {
  const [stats, setStats] = useState([
    { label: 'Total Revenue', value: 'Rs 0', change: '—', icon: DollarSign, color: 'bg-green-100 text-green-700' },
    { label: 'Total Orders', value: '0', change: '—', icon: ShoppingBag, color: 'bg-blue-100 text-blue-700' },
    { label: 'Total Customers', value: '0', change: '—', icon: Users, color: 'bg-purple-100 text-purple-700' },
    { label: 'Total Products', value: '0', change: '—', icon: Package, color: 'bg-amber-100 text-amber-700' },
  ])
  const [monthlySales, setMonthlySales] = useState<{ month: string; sales: number; orders: number }[]>([])
  const [categoryDist, setCategoryDist] = useState<{ name: string; value: number }[]>([])

  useEffect(() => {
    if (!supabase) return
    ;(async () => {
      const [ordersRes, customersRes, productsRes] = await Promise.all([
        supabase.from('orders').select('total, date, status'),
        supabase.from('customers').select('id', { count: 'exact', head: true }),
        supabase.from('products').select('id, category_id', { count: 'exact', head: true }),
      ])

      const orders = ordersRes.data || []
      const totalRevenue = orders.filter(o => o.status !== 'failed' && o.status !== 'cancelled').reduce((sum, o) => sum + Number(o.total || 0), 0)
      const totalOrders = orders.length
      const totalCustomers = customersRes.count || 0
      const totalProducts = productsRes.count || 0

      setStats([
        { label: 'Total Revenue', value: formatPrice(totalRevenue), change: `${totalOrders} orders`, icon: DollarSign, color: 'bg-green-100 text-green-700' },
        { label: 'Total Orders', value: String(totalOrders), change: `${orders.filter(o => o.status === 'pending').length} pending`, icon: ShoppingBag, color: 'bg-blue-100 text-blue-700' },
        { label: 'Total Customers', value: String(totalCustomers), change: 'registered', icon: Users, color: 'bg-purple-100 text-purple-700' },
        { label: 'Total Products', value: String(totalProducts), change: 'active', icon: Package, color: 'bg-amber-100 text-amber-700' },
      ])

      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
      const monthlyMap: Record<string, { sales: number; orders: number }> = {}
      for (const o of orders) {
        const d = new Date(o.date)
        const key = months[d.getMonth()]
        if (!monthlyMap[key]) monthlyMap[key] = { sales: 0, orders: 0 }
        monthlyMap[key].sales += Number(o.total || 0)
        monthlyMap[key].orders += 1
      }
      setMonthlySales(Object.entries(monthlyMap).map(([month, data]) => ({ month, ...data })))
    })()
  }, [])

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
        <div className="bg-white rounded-2xl p-6 ambient-shadow">
          <h3 className="font-serif text-headline-sm text-primary mb-6">Monthly Sales</h3>
          {monthlySales.length === 0 ? (
            <p className="font-sans text-sm text-on-surface-variant text-center py-8">No sales data yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fontFamily: 'Manrope' }} stroke="#9e9e9e" />
                <YAxis tick={{ fontSize: 12, fontFamily: 'Manrope' }} stroke="#9e9e9e" />
                <Tooltip />
                <Bar dataKey="sales" fill="#3B2A20" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="bg-white rounded-2xl p-6 ambient-shadow">
          <h3 className="font-serif text-headline-sm text-primary mb-6">Order Trends</h3>
          {monthlySales.length === 0 ? (
            <p className="font-sans text-sm text-on-surface-variant text-center py-8">No order data yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fontFamily: 'Manrope' }} stroke="#9e9e9e" />
                <YAxis tick={{ fontSize: 12, fontFamily: 'Manrope' }} stroke="#9e9e9e" />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#3B2A20" strokeWidth={2} dot={{ fill: '#3B2A20' }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  )
}
