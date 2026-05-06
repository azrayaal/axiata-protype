import { useNavigate } from 'react-router-dom'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts'
import {
  TrendingUp, TrendingDown, Clock, AlertTriangle, CheckCircle2,
  ChevronLeft, ChevronRight, Sparkles,
} from 'lucide-react'
import { monthlyData, statusPieData, templatePieData, top3Kontribusi } from '../../data/contracts'

const DAYS = ['SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB', 'MIN']

function MiniCalendar() {
  const today = 19
  const weeks = [
    [16, 17, 18, 19, 20, 21, 22],
    [23, 24, 25, 26, 27, 28, 29],
    [30, 31, null, null, null, null, null],
  ]
  const events = [
    { title: 'Deadline Review — KTR-2025-041', sub: 'PKS Distribusi · Prioritas Tinggi', time: '09:30 AM' },
    { title: 'Review — KTR-2025-033', sub: 'Konsultasi Hukum · Finalisasi', time: '11:30 AM' },
    { title: 'Review — KTR-2025-039', sub: 'MOU Distribusi · Review', time: '' },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div className="flex items-center justify-between mb-3">
        <button className="p-1 hover:bg-gray-100 rounded"><ChevronLeft size={16} /></button>
        <span className="text-sm font-semibold text-gray-700">Mei 2026</span>
        <button className="p-1 hover:bg-gray-100 rounded"><ChevronRight size={16} /></button>
      </div>
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {DAYS.map(d => (
          <div key={d} className="text-center text-[10px] font-semibold text-gray-400 py-1">{d}</div>
        ))}
      </div>
      {weeks.map((week, wi) => (
        <div key={wi} className="grid grid-cols-7 gap-0.5 mb-0.5">
          {week.map((day, di) => (
            <div
              key={di}
              className={`text-center text-xs py-1.5 rounded-full cursor-pointer transition-colors ${
                day === today ? 'bg-[#1a3a6b] text-white font-bold' : day ? 'text-gray-600 hover:bg-blue-50' : ''
              }`}
            >
              {day || ''}
            </div>
          ))}
        </div>
      ))}
      <div className="mt-3 space-y-2 border-t border-gray-100 pt-3">
        {events.map((ev, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-700 truncate">{ev.title}</p>
              <p className="text-[10px] text-gray-400 truncate">{ev.sub}</p>
            </div>
            {ev.time && <span className="text-[10px] text-gray-400 flex-shrink-0">{ev.time}</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

function MetricCard({ label, value, change, positive, icon: Icon, color }) {
  const isUp = positive
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div className="flex items-start justify-between mb-2">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon size={18} className="text-white" />
        </div>
        <span className={`flex items-center gap-0.5 text-xs font-semibold ${isUp ? 'text-green-600' : 'text-red-500'}`}>
          {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {change}
        </span>
      </div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
      <p className="text-[10px] text-gray-400">dari bulan lalu</p>
    </div>
  )
}

export default function DashboardLegal() {
  const navigate = useNavigate()

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Halo, Tim Legal</h1>
          <p className="text-sm text-gray-500 mt-0.5">Selamat datang di dashboard CLM Axiata!</p>
        </div>
        <p className="text-xs text-gray-400">Last updated on : 10/01/2024, 10:00 AM ↺</p>
      </div>

      {/* Top Row */}
      <div className="grid grid-cols-3 gap-5">
        {/* Tugas Review */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-600 mb-1">Tugas Review</h3>
          <div className="flex items-end gap-2 mb-3">
            <span className="text-4xl font-bold text-gray-800">48</span>
            <span className="text-xs text-gray-400 mb-1">TOTAL KONTRAK DITANGANI HINGGA SAAT INI</span>
          </div>
          <div className="space-y-2">
            <div className="flex-1 h-6 bg-gray-100 rounded-md overflow-hidden flex">
              <div className="bg-[#1a3a6b] h-full flex items-center justify-center" style={{ width: '80%' }}>
                <span className="text-white text-[10px] font-semibold px-1">Kontrak Selesai</span>
              </div>
              <div className="bg-blue-200 h-full" style={{ width: '11%' }} />
              <div className="bg-gray-300 h-full" style={{ width: '9%' }} />
            </div>
            <div className="flex gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#1a3a6b] inline-block" /> 80%</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-blue-200 inline-block" /> 11%</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-gray-300 inline-block" /> 9%</span>
            </div>
            <div className="mt-2 inline-flex items-center gap-1.5 bg-[#1a3a6b] text-white text-xs px-3 py-1 rounded-full">
              <span className="font-bold">38</span>
              <span>Kontrak Selesai</span>
            </div>
          </div>
        </div>

        {/* Banner */}
        <div className="relative rounded-xl overflow-hidden shadow-sm bg-gradient-to-br from-[#0f2044] to-[#1a6b5a] flex flex-col justify-end p-5 min-h-[180px]">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
          <div className="relative z-10">
            <h3 className="text-lg font-bold text-white leading-tight">Kolaborasi Tanpa Batas</h3>
            <p className="text-xs text-gray-300 mt-1">Pantau dan percepat setiap tahapan kontrak dalam satu platform terintegrasi.</p>
          </div>
        </div>

        <MiniCalendar />
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <MetricCard label="KONTRAK DISETUJUI" value="31" change="+38,12%" positive icon={CheckCircle2} color="bg-[#1a3a6b]" />
        <MetricCard label="RATA-RATA WAKTU" value="4.8" change="+28,3%" positive icon={Clock} color="bg-blue-500" />
        <MetricCard label="KONTRAK MENDESAK" value="5" change="+5,8%" positive icon={AlertTriangle} color="bg-orange-500" />
        <MetricCard label="TINGKAT SELESAI" value="94%" change="+3,1%" positive icon={TrendingUp} color="bg-teal-600" />
      </div>

      {/* AI Decision */}
      <div className="rounded-xl overflow-hidden shadow-sm bg-gradient-to-r from-[#0e2347] via-[#0e3d6b] to-[#096b5e] p-6">
        <div className="grid grid-cols-4 gap-6">
          <div className="text-white">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-lg font-bold">Ai Decision</h3>
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles size={10} /> Ask AI
              </span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              AI menganalisis performa vendor berdasarkan kesehatan keuangan, kepatuhan kontrak, histori, dan ketepatan pembayaran.
            </p>
            <div className="mt-4 w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
              <span className="text-3xl">🤖</span>
            </div>
          </div>
          {[
            { label: 'Top Kontrak', count: '12', unit: 'Kontrak', desc: 'Kontrak dengan rekam jejak terbaik — skor keuangan 92/100, kepatuhan kontrak 98%, dan ketepatan pengiriman 96%.', company: 'PT Maju Bersama', color: 'text-blue-300' },
            { label: 'Top vendor', count: '9', unit: 'Kontrak', extra: '1 Aktif', desc: 'Performa konsisten dengan skor keuangan 88/100 dan kepatuhan kontrak 95%. Seluruh deliverable diselesaikan tepat waktu.', company: 'CV Teknologi', color: 'text-blue-300' },
            { label: 'Kontrak Berisiko', count: '3', unit: 'Kontrak', desc: 'Skor keuangan rendah di angka 41/100 dengan kepatuhan kontrak hanya 58%. Tercatat 3 kasus sengketa aktif.', company: 'UD Sumber', color: 'text-red-300' },
          ].map((item, i) => (
            <div key={i} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <span className={`text-xs font-semibold ${item.color}`}>{item.label}</span>
              <div className="flex items-end gap-2 my-2">
                <span className="text-3xl font-bold text-white">{item.count}</span>
                <span className="text-white/70 text-sm mb-0.5">{item.unit}</span>
                {item.extra && <span className="text-white/70 text-xs mb-0.5">{item.extra}</span>}
              </div>
              <p className="text-xs text-gray-300 leading-relaxed mb-3">{item.desc}</p>
              <p className={`text-sm font-bold ${item.color}`}>{item.company}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Charts */}
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Top 3 Kontribusi Kontrak</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#1a3a6b] text-white">
                <th className="text-left py-2.5 px-3 text-xs font-semibold rounded-l-lg">No</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold">Nama</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold rounded-r-lg">Jumlah Kontribusi ↑↓</th>
              </tr>
            </thead>
            <tbody>
              {top3Kontribusi.map((row) => (
                <tr key={row.no} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-3 text-gray-500">{row.no}</td>
                  <td className="py-3 px-3 text-gray-700 font-medium">{row.nama}</td>
                  <td className="py-3 px-3 text-gray-700 font-semibold">{row.jumlah}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-700">Jumlah Kontrak per Bulan</h3>
            <button className="text-xs border border-gray-200 px-3 py-1 rounded-lg text-gray-500 hover:bg-gray-50">Filter</button>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={monthlyData} barSize={24}>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={v => v >= 1000 ? `${v/1000}K` : v} />
              <Tooltip cursor={{ fill: '#f0f4f8' }} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="jumlah" fill="#1a3a6b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Status Kontrak per Tahapan</h3>
          <div className="flex items-center">
            <ResponsiveContainer width="55%" height={180}>
              <PieChart>
                <Pie data={statusPieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
                  {statusPieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {statusPieData.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-xs">
                  <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Kontrak Berdasarkan Template</h3>
          <div className="flex items-center">
            <ResponsiveContainer width="55%" height={180}>
              <PieChart>
                <Pie data={templatePieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
                  {templatePieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {templatePieData.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-xs">
                  <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-end">
        <button
          onClick={() => navigate('/review')}
          className="flex items-center gap-2 bg-[#1a3a6b] text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#15305a] transition-colors shadow-sm"
        >
          <CheckCircle2 size={18} /> Review Kontrak
        </button>
      </div>
    </div>
  )
}
