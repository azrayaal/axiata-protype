import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Download, RotateCcw, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { contracts } from '../../data/contracts'
import { StatusBadge, PriorityBadge } from '../../components/ui/Badge'

const PRIORITIES = ['Tinggi', 'Sedang', 'Rendah']
const PAGE_SIZE_OPTIONS = [10, 25, 50]

export default function ReviewList() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [priority, setPriority] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const filtered = contracts.filter(c => {
    const matchSearch = c.nama_perjanjian.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase())
    const matchPriority = !priority || c.prioritas === priority
    return matchSearch && matchPriority
  })

  const total = filtered.length
  const totalPages = Math.ceil(total / pageSize)
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize)

  const handleReset = () => { setSearch(''); setPriority(''); setPage(1) }

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-500">
        <span className="hover:text-[#1a3a6b] cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">Review Kontrak</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-800">Review Kontrak</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">Last updated on : 10/01/2024, 10:00 AM ↺</p>
          <button className="flex items-center gap-2 border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            <Download size={15} /> Unduh Daftar Kontrak
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nama Perjanjian</label>
            <input
              type="text"
              placeholder="Cari Nama Perjanjian"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1a3a6b]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Kategori Prioritas</label>
            <select
              value={priority}
              onChange={e => setPriority(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1a3a6b] bg-white"
            >
              <option value="">Pilih Kategori Prioritas</option>
              {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Lihat</span>
            <select
              value={pageSize}
              onChange={e => { setPageSize(+e.target.value); setPage(1) }}
              className="border border-gray-200 rounded-lg px-2 py-1 text-sm"
            >
              {PAGE_SIZE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <span>baris</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleReset} className="flex items-center gap-1.5 border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
              <RotateCcw size={14} /> Reset Filter
            </button>
            <button onClick={() => setPage(1)} className="flex items-center gap-1.5 bg-[#1a3a6b] text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-[#15305a]">
              <Search size={14} /> Cari
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#1a3a6b] text-white">
                <th className="text-left py-3 px-4 font-semibold text-xs rounded-tl-lg whitespace-nowrap">No Kontrak</th>
                <th className="text-left py-3 px-4 font-semibold text-xs whitespace-nowrap">
                  <span className="flex items-center gap-1">Nama Perjanjian <span className="text-blue-300">↑↓</span></span>
                </th>
                <th className="text-left py-3 px-4 font-semibold text-xs whitespace-nowrap">BU Pemohon</th>
                <th className="text-left py-3 px-4 font-semibold text-xs whitespace-nowrap">
                  <span className="flex items-center gap-1">Tanggal Masuk <span className="text-blue-300">↑↓</span></span>
                </th>
                <th className="text-left py-3 px-4 font-semibold text-xs whitespace-nowrap">
                  <span className="flex items-center gap-1">Prioritas <span className="text-blue-300">↑↓</span></span>
                </th>
                <th className="text-left py-3 px-4 font-semibold text-xs whitespace-nowrap">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-xs rounded-tr-lg whitespace-nowrap">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-12 text-gray-400">Tidak ada data kontrak</td></tr>
              ) : paginated.map((c, i) => (
                <tr key={c.id} className={`border-b border-gray-50 hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                  <td className="py-3 px-4 text-gray-600 text-xs font-mono whitespace-nowrap">{c.id.slice(0, 10)}...</td>
                  <td
                    className="py-3 px-4 text-gray-700 font-medium hover:text-[#1a3a6b] cursor-pointer whitespace-nowrap"
                    onClick={() => navigate(`/review/${c.id}`)}
                  >
                    {c.nama_perjanjian}
                  </td>
                  <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{c.bu_pemohon || c.counterpart}</td>
                  <td className="py-3 px-4 text-gray-500 whitespace-nowrap">{c.tanggal_masuk}</td>
                  <td className="py-3 px-4"><PriorityBadge priority={c.prioritas} /></td>
                  <td className="py-3 px-4"><StatusBadge status={c.status} /></td>
                  <td className="py-3 px-4">
                    {c.status === 'Selesai' ? (
                      <button className="text-green-600 text-xs font-semibold px-3 py-1 rounded-lg border border-green-200 bg-green-50">
                        Selesai
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate(`/review/${c.id}`)}
                        className="border border-[#1a3a6b] text-[#1a3a6b] text-xs font-semibold px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        Review
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-sm text-gray-500">
            Menampilkan {Math.min((page - 1) * pageSize + 1, total)} sampai {Math.min(page * pageSize, total)} dari {total} baris
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40"
            >
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${page === p ? 'bg-[#1a3a6b] text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
              >
                {p}
              </button>
            ))}
            {totalPages > 5 && <span className="text-gray-400 px-1">...</span>}
            {totalPages > 5 && (
              <button onClick={() => setPage(totalPages)} className="w-8 h-8 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50">
                {totalPages}
              </button>
            )}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || totalPages === 0}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
