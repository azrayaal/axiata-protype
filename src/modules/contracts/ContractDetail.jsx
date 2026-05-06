import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Download, FileText, Pencil } from 'lucide-react'
import { contracts } from '../../data/contracts'
import { StatusBadge, PriorityBadge, TemplateBadge } from '../../components/ui/Badge'

const STATUS_STEPS = ['Draft', 'Review', 'Approval', 'Signing', 'Selesai']

function LifecycleBar({ status }) {
  const idx = STATUS_STEPS.indexOf(status)
  const currentIdx = idx === -1 ? (status === 'Revisi' ? 1 : status === 'Expired' ? 4 : status === 'Ditolak' ? 2 : 0) : idx
  return (
    <div className="flex items-center gap-0">
      {STATUS_STEPS.map((step, i) => (
        <div key={step} className="flex items-center flex-1">
          <div className={`flex flex-col items-center flex-1`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
              i < currentIdx ? 'bg-[#1a3a6b] border-[#1a3a6b] text-white' :
              i === currentIdx ? 'bg-white border-[#1a3a6b] text-[#1a3a6b]' :
              'bg-white border-gray-200 text-gray-400'
            }`}>
              {i < currentIdx ? '✓' : i + 1}
            </div>
            <span className={`text-[10px] mt-1 font-medium ${i <= currentIdx ? 'text-[#1a3a6b]' : 'text-gray-400'}`}>
              {step}
            </span>
          </div>
          {i < STATUS_STEPS.length - 1 && (
            <div className={`h-0.5 flex-1 mb-4 ${i < currentIdx ? 'bg-[#1a3a6b]' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

export default function ContractDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const contract = contracts.find(c => c.id === id)

  if (!contract) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <p className="text-gray-500">Kontrak tidak ditemukan.</p>
        <button onClick={() => navigate('/kontrak/daftar')} className="text-[#1a3a6b] font-medium text-sm">
          ← Kembali ke Daftar
        </button>
      </div>
    )
  }

  const formatCurrency = (val) =>
    `Rp ${Number(val).toLocaleString('id-ID')}`

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-500">
        <span className="hover:text-[#1a3a6b] cursor-pointer" onClick={() => navigate('/kontrak/daftar')}>Daftar Kontrak</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">Detail Kontrak</span>
      </nav>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/kontrak/daftar')}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Detail Kontrak</h1>
            <p className="text-sm text-gray-500 font-mono">{contract.id}</p>
          </div>
        </div>
        <button
          onClick={() => navigate(`/kontrak/edit/${contract.id}`)}
          className="flex items-center gap-2 bg-[#1a3a6b] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#15305a]"
        >
          <Pencil size={15} /> Edit Kontrak
        </button>
      </div>

      {/* Lifecycle */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-sm font-semibold text-gray-600 mb-4">Progress Kontrak</h3>
        <LifecycleBar status={contract.status} />
      </div>

      {/* Info Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
        <div className="grid grid-cols-2 gap-5">
          <InfoField label="Nama Perjanjian" value={contract.nama_perjanjian} />
          <InfoField label="Nama Counterpart" value={contract.counterpart} />
          <InfoField label="Kategori Kontrak" value={contract.kategori} />
          <InfoField label="Tanggal Berlaku" value={contract.tanggal_berlaku} />
          <InfoField label="Nilai Kontrak (Rp)" value={formatCurrency(contract.nilai)} />
          <InfoField label="Durasi (bulan)" value={contract.durasi} />
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Prioritas</label>
            <PriorityBadge priority={contract.prioritas} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Status</label>
            <StatusBadge status={contract.status} />
          </div>
          <InfoField label="Jenis Template" value={contract.jenis_template} />
          <InfoField label="PIC Legal" value={contract.pic_legal} />
        </div>

        {contract.catatan_bu && (
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Catatan Tim BU</label>
            <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 leading-relaxed border border-gray-100">
              {contract.catatan_bu}
            </div>
          </div>
        )}

        {/* Documents */}
        <div className="grid grid-cols-2 gap-5">
          {contract.doc_legalitas && (
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Dokumen Legalitas</label>
              <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50">
                <FileText size={16} className="text-red-500 flex-shrink-0" />
                <span className="text-sm text-gray-700 flex-1 truncate">{contract.doc_legalitas}</span>
                <button className="text-[#1a3a6b] hover:text-[#15305a]"><Download size={16} /></button>
              </div>
            </div>
          )}
          {contract.doc_tambahan && (
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Dokumen Tambahan</label>
              <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50">
                <FileText size={16} className="text-red-500 flex-shrink-0" />
                <span className="text-sm text-gray-700 flex-1 truncate">{contract.doc_tambahan}</span>
                <button className="text-[#1a3a6b] hover:text-[#15305a]"><Download size={16} /></button>
              </div>
            </div>
          )}
        </div>

        {/* Reviewer notes */}
        {contract.catatan_reviewer && (
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Catatan Reviewer</label>
            <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-800 border border-blue-100">
              {contract.catatan_reviewer}
            </div>
          </div>
        )}

        {/* Validasi */}
        {contract.validasi && (
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-2">Validasi Legalitas</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: 'identitas', label: 'Identitas para pihak lengkap' },
                { key: 'objek', label: 'Objek perjanjian jelas' },
                { key: 'sengketa', label: 'Klausul penyelesaian sengketa' },
                { key: 'jangka', label: 'Jangka waktu & pembaruan' },
              ].map(item => (
                <div key={item.key} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${
                    contract.validasi[item.key] ? 'bg-[#1a3a6b]' : 'border-2 border-gray-300'
                  }`}>
                    {contract.validasi[item.key] && <span className="text-white text-[10px]">✓</span>}
                  </div>
                  <span className="text-sm text-gray-600">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function InfoField({ label, value }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 mb-1.5">{label}</label>
      <div className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 bg-gray-50 min-h-[40px] flex items-center">
        {value || '—'}
      </div>
    </div>
  )
}
