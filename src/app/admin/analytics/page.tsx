'use client'

import { useState } from 'react'
import { Trash2, Download, AlertTriangle, RefreshCw } from 'lucide-react'
import { useLocalStorage } from '@/lib/useLocalStorage'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const salesData = [
  { month: 'Jan', revenue: 4200, orders: 28, visitors: 1200 },
  { month: 'Feb', revenue: 5800, orders: 35, visitors: 1450 },
  { month: 'Mar', revenue: 7200, orders: 42, visitors: 1680 },
  { month: 'Apr', revenue: 6100, orders: 38, visitors: 1520 },
  { month: 'May', revenue: 8900, orders: 55, visitors: 2100 },
  { month: 'Jun', revenue: 10300, orders: 62, visitors: 2450 },
]

const deviceData = [
  { name: 'Mobile', value: 58 },
  { name: 'Desktop', value: 32 },
  { name: 'Tablet', value: 10 },
]

const COLORS = ['#3B2A20', '#000000', '#E2E2E2']

export default function AdminAnalytics() {
  const [data, setData] = useLocalStorage('admin-analytics', salesData)
  const [devices] = useState(deviceData)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const clearAllData = () => {
    setData([])
    setShowConfirm(false)
  }

  const exportCSV = () => {
    if (data.length === 0) return
    const headers = 'Month,Revenue,Orders,Visitors\n'
    const rows = data.map(d => `${d.month},${d.revenue},${d.orders},${d.visitors}`).join('\n')
    const blob = new Blob([headers + rows], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'analytics.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  const summary = {
    totalRevenue: data.reduce((s, d) => s + d.revenue, 0),
    totalOrders: data.reduce((s, d) => s + d.orders, 0),
    totalVisitors: data.reduce((s, d) => s + d.visitors, 0),
    avgOrderValue: data.length ? Math.round(data.reduce((s, d) => s + d.revenue, 0) / data.reduce((s, d) => s + d.orders, 0)) : 0,
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="font-serif text-headline-sm text-primary">Analytics</h2>
        <div className="flex gap-3">
          {data.length > 0 && (
            <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2.5 border border-outline-variant rounded-xl font-sans text-label-caps text-on-surface-variant hover:bg-surface-container-low transition-all">
              <Download size={16} /> Export CSV
            </button>
          )}
          <button onClick={() => setShowConfirm(true)} className="flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-700 rounded-xl font-sans text-label-caps hover:bg-red-100 transition-all">
            <Trash2 size={16} /> Clear Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: `$${summary.totalRevenue.toLocaleString()}`, color: 'text-green-700' },
          { label: 'Total Orders', value: summary.totalOrders.toString(), color: 'text-blue-700' },
          { label: 'Total Visitors', value: summary.totalVisitors.toLocaleString(), color: 'text-purple-700' },
          { label: 'Avg Order Value', value: `$${summary.avgOrderValue.toLocaleString()}`, color: 'text-amber-700' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 ambient-shadow">
            <p className="font-sans text-sm text-on-surface-variant mb-1">{s.label}</p>
            <p className={`font-sans text-2xl md:text-3xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 md:p-6 ambient-shadow">
          <h3 className="font-serif text-headline-sm text-primary mb-6">Revenue Overview</h3>
          {data.length > 0 ? (
            <div className="h-64 md:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E2E2" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#7E7576" />
                  <YAxis tick={{ fontSize: 12 }} stroke="#7E7576" />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E2E2' }} />
                  <Bar dataKey="revenue" fill="#3B2A20" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-on-surface-variant font-sans text-body-md">No data available</div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-5 md:p-6 ambient-shadow">
          <h3 className="font-serif text-headline-sm text-primary mb-6">Devices</h3>
          {devices.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={devices} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
                    {devices.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E2E2' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-on-surface-variant font-sans text-body-md">No data</div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 md:p-6 ambient-shadow">
        <h3 className="font-serif text-headline-sm text-primary mb-4">Monthly Breakdown</h3>
        {data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-outline-variant">
                  <th className="p-3 font-sans text-label-caps text-on-surface-variant">Month</th>
                  <th className="p-3 font-sans text-label-caps text-on-surface-variant">Revenue</th>
                  <th className="p-3 font-sans text-label-caps text-on-surface-variant">Orders</th>
                  <th className="p-3 font-sans text-label-caps text-on-surface-variant">Visitors</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d) => (
                  <tr key={d.month} className="border-b border-outline-variant/50">
                    <td className="p-3 font-sans text-sm text-primary">{d.month}</td>
                    <td className="p-3 font-sans text-sm text-primary font-medium">${d.revenue.toLocaleString()}</td>
                    <td className="p-3 font-sans text-sm text-on-surface-variant">{d.orders}</td>
                    <td className="p-3 font-sans text-sm text-on-surface-variant">{d.visitors.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center font-sans text-body-md text-on-surface-variant">All analytics data has been cleared.</div>
        )}
      </div>

      <div className="bg-white rounded-2xl p-5 md:p-6 ambient-shadow">
        <h3 className="font-serif text-headline-sm text-primary mb-4">Danger Zone</h3>
        <p className="font-sans text-body-md text-on-surface-variant mb-4">Reset all store data including products, orders, customers, coupons, and settings. This cannot be undone.</p>
        <button onClick={() => setShowResetConfirm(true)} className="flex items-center gap-2 px-5 py-3 bg-red-600 text-white rounded-xl font-sans text-label-caps hover:bg-red-700 transition-all">
          <RefreshCw size={16} /> Reset All Data
        </button>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowConfirm(false)} />
          <div className="relative bg-white rounded-2xl shadow-ambient-xl w-full max-w-sm p-6 text-center">
            <AlertTriangle size={40} className="mx-auto text-red-500 mb-4" />
            <h3 className="font-serif text-headline-sm text-primary mb-2">Delete All Analytics?</h3>
            <p className="font-sans text-body-md text-on-surface-variant mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={clearAllData} className="flex-1 px-5 py-3 bg-red-600 text-white rounded-xl font-sans text-label-caps hover:bg-red-700 transition-all">Yes, Delete</button>
              <button onClick={() => setShowConfirm(false)} className="flex-1 px-5 py-3 border border-outline-variant rounded-xl font-sans text-label-caps text-on-surface-variant hover:bg-surface-container-low transition-all">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowResetConfirm(false)} />
          <div className="relative bg-white rounded-2xl shadow-ambient-xl w-full max-w-sm p-6 text-center">
            <AlertTriangle size={48} className="mx-auto text-red-500 mb-4" />
            <h3 className="font-serif text-headline-sm text-primary mb-2">Reset All Data?</h3>
            <p className="font-sans text-body-md text-on-surface-variant mb-6">This will permanently delete all products, orders, customers, coupons, and settings. Refresh the page afterwards to reload initial data.</p>
            <div className="flex gap-3">
              <button onClick={() => { localStorage.clear(); setShowResetConfirm(false); window.location.reload() }} className="flex-1 px-5 py-3 bg-red-600 text-white rounded-xl font-sans text-label-caps hover:bg-red-700 transition-all">Yes, Reset Everything</button>
              <button onClick={() => setShowResetConfirm(false)} className="flex-1 px-5 py-3 border border-outline-variant rounded-xl font-sans text-label-caps text-on-surface-variant hover:bg-surface-container-low transition-all">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
