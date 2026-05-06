import { useNavigate } from 'react-router-dom'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts'
import { ChevronLeft, ChevronRight, Plus, Sparkles, TrendingUp, TrendingDown } from 'lucide-react'
import { monthlyData, statusPieData, templatePieData, top3Kontribusi } from '../../data/contracts'

import kontrakDisetujuiIcon from '../../assets/kontrakdisetujui.png'
import rataRataWaktuIcon from '../../assets/rata2waktu.png'
import kontrakMendesakIcon from '../../assets/kontrakmendesak.png'
import tingkatSelesaiIcon from '../../assets/tingkatselesai.png'
import axiataba from '../../assets/axiataba.png'
import heroBanner from '../../assets/hero.png'

const DAYS = ['SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB', 'MIN']

const calendarWeeks = [
  [16, 17, 18, 19, 20, 21, 22],
  [23, 24, 25, 26, 27, 28, 29],
  [30, 31, null, null, null, null, null],
]

const calendarEvents = [
  { title: 'Reporting Kontrak — KTR-2025-041', sub: 'PKS Distribusi · Prioritas Tinggi', time: '09:30 AM' },
  { title: 'Monitoring Kontrak — KTR-2025-033', sub: 'Konsultasi Hukum · Finalisasi', time: '11:30 AM' },
  { title: 'Print Hardcopy — KTR-2025-039', sub: 'MOU Distribusi · Print', time: '' },
]

function MiniCalendar({ cta }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <button className="p-1 hover:bg-gray-100 rounded"><ChevronLeft size={15} /></button>
        <span className="text-sm font-semibold text-gray-700">Mei 2026</span>
        <button className="p-1 hover:bg-gray-100 rounded"><ChevronRight size={15} /></button>
      </div>
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {DAYS.map(d => (
          <div key={d} className="text-center text-[10px] font-semibold text-gray-400 py-1">{d}</div>
        ))}
      </div>
      {calendarWeeks.map((week, wi) => (
        <div key={wi} className="grid grid-cols-7 gap-0.5 mb-0.5">
          {week.map((day, di) => (
            <div key={di} className={`text-center text-xs py-1.5 rounded-full cursor-pointer transition-colors ${
              day === 19 ? 'bg-[#1a3a6b] text-white font-bold' : day ? 'text-gray-600 hover:bg-blue-50' : ''
            }`}>
              {day || ''}
            </div>
          ))}
        </div>
      ))}

      <div className="mt-2 space-y-2 border-t border-gray-100 pt-3 flex-1">
        {calendarEvents.map((ev, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1a3a6b] mt-1.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-700 truncate">{ev.title}</p>
              <p className="text-[10px] text-gray-400 truncate">{ev.sub}</p>
            </div>
            {ev.time && <span className="text-[10px] text-gray-400 flex-shrink-0">{ev.time}</span>}
          </div>
        ))}
      </div>

      {cta && (
        <button
          onClick={cta.action}
          className="mt-3 w-full flex items-center justify-center gap-2 bg-[#1a3a6b] text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-[#15305a] transition-colors"
        >
          {cta.icon} {cta.label}
        </button>
      )}
    </div>
  )
}

function MetricCard({ label, value, change, positive, iconImg, unit }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div className="flex items-start justify-between mb-3">
        <img src={iconImg} alt={label} className="w-10 h-10 object-contain" />
        <span className={`flex items-center gap-0.5 text-xs font-semibold ${positive ? 'text-green-600' : 'text-red-500'}`}>
          {positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {change}
        </span>
      </div>
      <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-bold text-gray-800 mt-0.5">
        {value}{unit && <span className="text-sm font-normal text-gray-500 ml-0.5">{unit}</span>}
      </p>
      <p className="text-[10px] text-gray-400 mt-0.5">dari bulan lalu</p>
    </div>
  )
}

export default function DashboardBU() {
  const navigate = useNavigate()

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Halo, Tim Business Unit</h1>
          <p className="text-sm text-gray-500 mt-0.5">Selamat datang di dashboard CLM Axiata!</p>
        </div>
        <p className="text-xs text-gray-400 mt-1">Last updated on : 10/01/2024, 10:00 AM ↺</p>
      </div>

      {/* Top 3-column row */}
      <div className="grid grid-cols-3 gap-5 items-stretch">
        {/* Col 1 — Submitted */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col">
          <h3 className="text-sm font-semibold text-gray-600 mb-1">Kontrak yang Sudah di Submit</h3>
          <div className="flex items-end gap-2 mb-4">
            <span className="text-4xl font-bold text-gray-800">62</span>
            <span className="text-[10px] text-gray-400 mb-1 leading-tight">TOTAL KONTRAK DI SUBMIT<br/>HINGGA SAAT INI</span>
          </div>
          <div className="space-y-2 flex-1">
            <div className="relative h-10 bg-gray-100 rounded-lg overflow-hidden flex">
              <div className="bg-[#1a3a6b] h-full flex items-center justify-end pr-2" style={{ width: '80%' }}>
                <div className="absolute left-3 top-1/2 -translate-y-1/2 bg-white rounded px-1.5 py-0.5 text-[10px] font-bold text-[#1a3a6b] shadow-sm whitespace-nowrap">
                  Kontrak Selesai <span className="font-black">38</span>
                </div>
              </div>
              <div className="bg-blue-300 h-full" style={{ width: '11%' }} />
              <div className="bg-gray-300 h-full" style={{ width: '9%' }} />
            </div>
            <div className="flex gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-[#1a3a6b] inline-block" /> 80%</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-blue-300 inline-block" /> 11%</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-gray-300 inline-block" /> 9%</span>
            </div>
          </div>
        </div>

        {/* Col 2 — Banner */}
        <div className="relative rounded-xl overflow-hidden shadow-sm min-h-[200px]">
          <img src={heroBanner} alt="Kolaborasi Tanpa Batas" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="text-lg font-bold text-white leading-tight">Kolaborasi Tanpa Batas</h3>
            <p className="text-xs text-gray-200 mt-1 leading-relaxed">Pantau dan percepat setiap tahapan kontrak dalam satu platform terintegrasi.</p>
          </div>
        </div>

        {/* Col 3 — Calendar + CTA */}
        <MiniCalendar cta={{ label: '+ Tambah Kontrak', action: () => navigate('/kontrak/tambah') }} />
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-4 gap-4">
        <MetricCard label="Kontrak Disetujui" value="31" change="+38,12%" positive iconImg={kontrakDisetujuiIcon} />
        <MetricCard label="Rata-rata Waktu" value="4.8" unit="hari/kontrak" change="+28,3%" positive iconImg={rataRataWaktuIcon} />
        <MetricCard label="Kontrak Mendesak" value="5" change="-5,6%" positive={false} iconImg={kontrakMendesakIcon} />
        <MetricCard label="Tingkat Selesai" value="94%" change="+3,1%" positive iconImg={tingkatSelesaiIcon} />
      </div>

      {/* AI Decision */}
      <div className="rounded-xl overflow-hidden shadow-sm bg-gradient-to-r from-[#0e2347] via-[#0d3a72] to-[#0a8a70] p-6">
        <div className="grid grid-cols-4 gap-5 items-center">
          {/* Left — branding */}
          <div className="text-white flex flex-col h-full">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold">Ai Decision</h3>
              <span className="bg-gradient-to-r from-purple-500 to-blue-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles size={9} /> Ask AI
              </span>
            </div>
            <p className="text-xs text-blue-100 leading-relaxed mb-4">
              AI menganalisis performa vendor berdasarkan kesehatan keuangan, kepatuhan kontrak, histori, dan ketepatan pembayaran.
            </p>
            <div className="flex-1 flex items-end justify-end">
              <img src={axiataba} alt="Axiata AI" className="h-32 object-contain drop-shadow-lg" />
            </div>
          </div>

          {/* 3 white cards */}
          {[
            {
              label: 'Top Kontrak', labelColor: 'text-blue-600',
              count: '12', unit: 'Kontrak',
              desc: 'Kontrak dengan rekam jejak terbaik — skor keuangan 92/100, kepatuhan kontrak 98%, dan ketepatan pengiriman 96%. Tidak ada histori sengketa dalam 3 tahun terakhir.',
              company: 'PT Maju Bersama', companyColor: 'text-blue-600',
            },
            {
              label: 'Top vendor', labelColor: 'text-blue-600',
              count: '9', unit: 'Kontrak', extra: '1 Aktif',
              desc: 'Performa konsisten dengan skor keuangan 88/100 dan kepatuhan kontrak 95%. Seluruh deliverable diselesaikan tepat waktu dengan tingkat ketepatan 93%.',
              company: 'CV Teknologi', companyColor: 'text-blue-600',
            },
            {
              label: 'Kontrak Berisiko', labelColor: 'text-red-500',
              count: '3', unit: 'Kontrak',
              desc: 'Skor keuangan rendah di angka 41/100 dengan kepatuhan kontrak hanya 58%. Tercatat 3 kasus sengketa aktif dan sering mengalami keterlambatan pengiriman.',
              company: 'UD Sumber', companyColor: 'text-red-500',
            },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-md h-full flex flex-col">
              <span className={`text-xs font-bold ${item.labelColor} mb-2`}>{item.label}</span>
              <div className="flex items-end gap-1.5 mb-2">
                <span className="text-3xl font-bold text-gray-800">{item.count}</span>
                <span className="text-gray-500 text-sm mb-0.5">{item.unit}</span>
                {item.extra && <span className="text-gray-400 text-xs mb-0.5">{item.extra}</span>}
              </div>
              <p className="text-xs text-gray-500 leading-relaxed flex-1">{item.desc}</p>
              <p className={`text-sm font-bold mt-3 ${item.companyColor}`}>{item.company}</p>
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
                <th className="text-left py-2.5 px-3 text-xs font-semibold rounded-r-lg">
                  <span className="flex items-center gap-1">Jumlah Kontribusi <span className="text-blue-300">↑↓</span></span>
                </th>
              </tr>
            </thead>
            <tbody>
              {top3Kontribusi.map(row => (
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
            <BarChart data={monthlyData} barSize={26}>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={v => v >= 1000 ? `${v / 1000}K` : v} />
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
                <Pie data={statusPieData} cx="50%" cy="50%" innerRadius={50} outerRadius={78} paddingAngle={2} dataKey="value">
                  {statusPieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {statusPieData.map(item => (
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
                <Pie data={templatePieData} cx="50%" cy="50%" innerRadius={50} outerRadius={78} paddingAngle={2} dataKey="value">
                  {templatePieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {templatePieData.map(item => (
                <div key={item.name} className="flex items-center gap-2 text-xs">
                  <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
