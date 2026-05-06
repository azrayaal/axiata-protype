import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Plus, Upload, Download, RotateCcw, Search, ChevronLeft, ChevronRight,
  Trash2, Pencil,
} from 'lucide-react'
import { contracts } from '../../data/contracts'
import { StatusBadge, TemplateBadge } from '../../components/ui/Badge'
import { Modal } from '../../components/ui/Modal'

const CATEGORIES = ['MOU', 'PKS', 'Kontrak', 'Perjanjian', 'Addendum']
const PAGE_SIZE_OPTIONS = [10, 25, 50]

export default function ContractList() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [deleteModal, setDeleteModal] = useState(null)
  const [list, setList] = useState(contracts)

  const filtered = list.filter(c => {
    const matchSearch = c.nama_perjanjian.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase())
    const matchCat = !category || c.kategori === category
    return matchSearch && matchCat
  })

  const total = filtered.length
  const totalPages = Math.ceil(total / pageSize)
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize)

  const handleReset = () => { setSearch(''); setCategory(''); setPage(1) }
  const handleSearch = () => setPage(1)
  const handleDelete = (id) => {
    setList(prev => prev.filter(c => c.id !== id))
    setDeleteModal(null)
  }

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-500">
        <span className="hover:text-[#1a3a6b] cursor-pointer">Karyawan</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">Daftar Kontrak</span>
      </nav>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Daftar Kontrak</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/kontrak/tambah')}
            className="flex items-center gap-2 border-2 border-[#1a3a6b] text-[#1a3a6b] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors"
          >
            <Plus size={16} /> Tambah Kontrak
          </button>
          <button className="flex items-center gap-2 bg-[#1a3a6b] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#15305a] transition-colors shadow-sm">
            <Upload size={16} /> Unggah Data
          </button>
        </div>
      </div>

      {/* Subheader */}
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
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1a3a6b] transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Kategori Kontrak</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1a3a6b] bg-white transition-all"
            >
              <option value="">Pilih Kategori</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Lihat</span>
            <select
              value={pageSize}
              onChange={e => { setPageSize(+e.target.value); setPage(1) }}
              className="border border-gray-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-200"
            >
              {PAGE_SIZE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <span>baris</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <RotateCcw size={14} /> Reset Filter
            </button>
            <button
              onClick={handleSearch}
              className="flex items-center gap-1.5 bg-[#1a3a6b] text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-[#15305a] transition-colors"
            >
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
                <th className="text-left py-3 px-4 font-semibold text-xs whitespace-nowrap">Counterpart</th>
                <th className="text-left py-3 px-4 font-semibold text-xs whitespace-nowrap">
                  <span className="flex items-center gap-1">PIC Legal <span className="text-blue-300">↑↓</span></span>
                </th>
                <th className="text-left py-3 px-4 font-semibold text-xs whitespace-nowrap">Template</th>
                <th className="text-left py-3 px-4 font-semibold text-xs whitespace-nowrap">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-xs rounded-tr-lg whitespace-nowrap">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400">
                    Tidak ada data kontrak
                  </td>
                </tr>
              ) : (
                paginated.map((c, i) => (
                  <tr
                    key={c.id}
                    className={`border-b border-gray-50 hover:bg-blue-50/30 transition-colors cursor-pointer ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
                  >
                    <td className="py-3 px-4 text-gray-600 text-xs font-mono whitespace-nowrap">
                      {c.id.slice(0, 10)}...
                    </td>
                    <td
                      className="py-3 px-4 text-gray-700 font-medium hover:text-[#1a3a6b] whitespace-nowrap"
                      onClick={() => navigate(`/kontrak/detail/${c.id}`)}
                    >
                      {c.nama_perjanjian}
                    </td>
                    <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{c.counterpart}</td>
                    <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{c.pic_legal}</td>
                    <td className="py-3 px-4"><TemplateBadge template={c.template} /></td>
                    <td className="py-3 px-4"><StatusBadge status={c.status} /></td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setDeleteModal(c)}
                          className="flex items-center gap-1 border border-gray-200 text-gray-500 px-3 py-1 rounded-lg text-xs hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={12} /> Hapus
                        </button>
                        <button
                          onClick={() => navigate(`/kontrak/edit/${c.id}`)}
                          className="flex items-center gap-1 bg-[#1a3a6b] text-white px-3 py-1 rounded-lg text-xs hover:bg-[#15305a] transition-colors"
                        >
                          <Pencil size={12} /> Ubah
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
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
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  page === p ? 'bg-[#1a3a6b] text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {p}
              </button>
            ))}
            {totalPages > 5 && <span className="text-gray-400 px-1">...</span>}
            {totalPages > 5 && (
              <button
                onClick={() => setPage(totalPages)}
                className={`w-8 h-8 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50`}
              >
                {totalPages}
              </button>
            )}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || totalPages === 0}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <Modal isOpen={!!deleteModal} onClose={() => setDeleteModal(null)} title="Konfirmasi Hapus" size="sm">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Apakah Anda yakin ingin menghapus kontrak <strong>{deleteModal?.nama_perjanjian}</strong> ({deleteModal?.id})?
          </p>
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => setDeleteModal(null)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              onClick={() => handleDelete(deleteModal?.id)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600"
            >
              Hapus
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
