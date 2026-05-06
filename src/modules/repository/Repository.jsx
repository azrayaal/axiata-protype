import { useState } from 'react'
import { Download, Search, RotateCcw, ChevronLeft, ChevronRight, Eye, FileText } from 'lucide-react'
import { contracts } from '../../data/contracts'
import { StatusBadge, TemplateBadge, PriorityBadge } from '../../components/ui/Badge'
import { Modal } from '../../components/ui/Modal'

const STATUSES = ['Draft', 'Review', 'Revisi', 'Approval', 'Signing', 'Selesai', 'Ditolak', 'Expired']
const PAGE_SIZE_OPTIONS = [10, 25, 50]

export default function Repository() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [detailModal, setDetailModal] = useState(null)

  const filtered = contracts.filter(c => {
    const matchSearch = c.nama_perjanjian.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.counterpart.toLowerCase().includes(search.toLowerCase())
    const matchStatus = !status || c.status === status
    return matchSearch && matchStatus
  })

  const total = filtered.length
  const totalPages = Math.ceil(total / pageSize)
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize)

  const formatCurrency = (val) => `Rp ${Number(val).toLocaleString('id-ID')}`

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-500">
        <span className="text-gray-800 font-medium">Repository</span>
        <span>/</span>
        <span className="text-gray-600">Daftar Dokumen</span>
      </nav>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Repository Kontrak</h1>
          <p className="text-sm text-gray-500 mt-0.5">Pusat penyimpanan seluruh dokumen kontrak CLM Axiata</p>
        </div>
        <button className="flex items-center gap-2 border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
          <Download size={15} /> Export
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Dokumen', value: contracts.length, color: 'bg-[#1a3a6b]' },
          { label: 'Kontrak Aktif', value: contracts.filter(c => c.status === 'Selesai').length, color: 'bg-green-600' },
          { label: 'Dalam Review', value: contracts.filter(c => c.status === 'Review').length, color: 'bg-blue-500' },
          { label: 'Butuh Perhatian', value: contracts.filter(c => ['Revisi', 'Ditolak'].includes(c.status)).length, color: 'bg-orange-500' },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4">
            <div className={`${stat.color} w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0`}>
              <FileText size={18} className="text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-4">
        {/* Filters */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Cari Kontrak</label>
            <input
              type="text"
              placeholder="Cari nama perjanjian, no kontrak, counterpart..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1a3a6b]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Status</label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1a3a6b] bg-white"
            >
              <option value="">Semua Status</option>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Lihat</span>
            <select value={pageSize} onChange={e => { setPageSize(+e.target.value); setPage(1) }} className="border border-gray-200 rounded-lg px-2 py-1 text-sm">
              {PAGE_SIZE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <span>baris</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => { setSearch(''); setStatus(''); setPage(1) }} className="flex items-center gap-1.5 border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
              <RotateCcw size={14} /> Reset
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
                <th className="text-left py-3 px-4 font-semibold text-xs whitespace-nowrap">Nama Perjanjian</th>
                <th className="text-left py-3 px-4 font-semibold text-xs whitespace-nowrap">Counterpart</th>
                <th className="text-left py-3 px-4 font-semibold text-xs whitespace-nowrap">Nilai Kontrak</th>
                <th className="text-left py-3 px-4 font-semibold text-xs whitespace-nowrap">Template</th>
                <th className="text-left py-3 px-4 font-semibold text-xs whitespace-nowrap">Prioritas</th>
                <th className="text-left py-3 px-4 font-semibold text-xs whitespace-nowrap">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-xs rounded-tr-lg whitespace-nowrap">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-12 text-gray-400">Tidak ada data kontrak</td></tr>
              ) : paginated.map((c, i) => (
                <tr key={c.id} className={`border-b border-gray-50 hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                  <td className="py-3 px-4 text-gray-600 text-xs font-mono whitespace-nowrap">{c.id}</td>
                  <td className="py-3 px-4 text-gray-700 font-medium whitespace-nowrap">{c.nama_perjanjian}</td>
                  <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{c.counterpart}</td>
                  <td className="py-3 px-4 text-gray-600 whitespace-nowrap text-xs">{formatCurrency(c.nilai)}</td>
                  <td className="py-3 px-4"><TemplateBadge template={c.template} /></td>
                  <td className="py-3 px-4"><PriorityBadge priority={c.prioritas} /></td>
                  <td className="py-3 px-4"><StatusBadge status={c.status} /></td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => setDetailModal(c)}
                      className="flex items-center gap-1.5 border border-[#1a3a6b] text-[#1a3a6b] px-3 py-1 rounded-lg text-xs font-medium hover:bg-blue-50 transition-colors"
                    >
                      <Eye size={12} /> Detail
                    </button>
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
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40">
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setPage(p)} className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${page === p ? 'bg-[#1a3a6b] text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>{p}</button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages || totalPages === 0} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <Modal isOpen={!!detailModal} onClose={() => setDetailModal(null)} title={`Detail Kontrak — ${detailModal?.id}`} size="lg">
        {detailModal && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Nama Perjanjian', value: detailModal.nama_perjanjian },
                { label: 'Counterpart', value: detailModal.counterpart },
                { label: 'Kategori', value: detailModal.kategori },
                { label: 'Tanggal Berlaku', value: detailModal.tanggal_berlaku },
                { label: 'Nilai Kontrak', value: formatCurrency(detailModal.nilai) },
                { label: 'Durasi', value: `${detailModal.durasi} bulan` },
                { label: 'PIC Legal', value: detailModal.pic_legal },
                { label: 'Template', value: detailModal.jenis_template },
              ].map(f => (
                <div key={f.label}>
                  <p className="text-xs text-gray-500 font-semibold mb-1">{f.label}</p>
                  <p className="text-sm text-gray-700 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">{f.value}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 pt-2">
              <StatusBadge status={detailModal.status} />
              <PriorityBadge priority={detailModal.prioritas} />
              <TemplateBadge template={detailModal.template} />
            </div>
            {detailModal.catatan_bu && (
              <div>
                <p className="text-xs text-gray-500 font-semibold mb-1">Catatan Tim BU</p>
                <p className="text-sm text-gray-700 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 leading-relaxed">{detailModal.catatan_bu}</p>
              </div>
            )}
            <div className="flex items-center gap-3 pt-2">
              {detailModal.doc_legalitas && (
                <button className="flex items-center gap-2 border border-gray-200 text-gray-600 px-3 py-2 rounded-lg text-xs hover:bg-gray-50">
                  <FileText size={14} className="text-red-500" /> {detailModal.doc_legalitas}
                  <Download size={12} className="text-[#1a3a6b]" />
                </button>
              )}
              {detailModal.doc_tambahan && (
                <button className="flex items-center gap-2 border border-gray-200 text-gray-600 px-3 py-2 rounded-lg text-xs hover:bg-gray-50">
                  <FileText size={14} className="text-red-500" /> {detailModal.doc_tambahan}
                  <Download size={12} className="text-[#1a3a6b]" />
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
