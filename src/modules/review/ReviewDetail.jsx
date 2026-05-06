import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Download, FileText, CheckCircle2 } from 'lucide-react'
import { contracts } from '../../data/contracts'

const VALIDASI_ITEMS = [
  { key: 'identitas', label: 'Identitas para pihak lengkap' },
  { key: 'objek', label: 'Objek perjanjian jelas' },
  { key: 'sengketa', label: 'Klausul penyelesaian sengketa' },
  { key: 'jangka', label: 'Jangka waktu & pembaruan' },
]

const TINDAK_LANJUT_OPTIONS = [
  { value: 'kembali_bu', label: 'Kembalikan ke Business Unit (Revisi)' },
  { value: 'kirim_counterpart', label: 'Kirim ke Counterpart' },
  { value: 'finalisasi_clc', label: 'Finalisasi dan Unggah ke CLC' },
]

export default function ReviewDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const contract = contracts.find(c => c.id === id)

  const [validasi, setValidasi] = useState(contract?.validasi || { identitas: false, objek: false, sengketa: false, jangka: false })
  const [tindakLanjut, setTindakLanjut] = useState(contract?.tindak_lanjut || 'kirim_counterpart')
  const [catatan, setCatatan] = useState(contract?.catatan_reviewer || '')
  const [submitted, setSubmitted] = useState(false)

  if (!contract) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <p className="text-gray-500">Kontrak tidak ditemukan.</p>
        <button onClick={() => navigate('/review')} className="text-[#1a3a6b] font-medium text-sm">← Kembali</button>
      </div>
    )
  }

  const toggleValidasi = (key) => {
    setValidasi(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const formatCurrency = (val) => `Rp ${Number(val).toLocaleString('id-ID')}`

  if (submitted) {
    const tindakLabel = TINDAK_LANJUT_OPTIONS.find(t => t.value === tindakLanjut)?.label
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle2 size={40} className="text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Review Berhasil Dikirim!</h2>
        <div className="text-center space-y-1">
          <p className="text-gray-500 text-sm">Kontrak <strong>{contract.nama_perjanjian}</strong></p>
          <p className="text-gray-500 text-sm">Tindak lanjut: <strong className="text-[#1a3a6b]">{tindakLabel}</strong></p>
        </div>
        <button
          onClick={() => navigate('/review')}
          className="px-6 py-2.5 bg-[#1a3a6b] text-white rounded-lg text-sm font-semibold hover:bg-[#15305a]"
        >
          Kembali ke Daftar Review
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-500">
        <span className="hover:text-[#1a3a6b] cursor-pointer" onClick={() => navigate('/dashboard')}>Karyawan</span>
        <span>/</span>
        <span className="hover:text-[#1a3a6b] cursor-pointer" onClick={() => navigate('/review')}>Daftar Kontrak</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">Review Kontrak</span>
      </nav>

      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/review')} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Review Kontrak</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
        {/* Info Fields - Read Only */}
        <div className="grid grid-cols-2 gap-5">
          <InfoField label="Nama Perjanjian" value={contract.nama_perjanjian} />
          <InfoField label="Nama Counterpart" value={contract.counterpart} />
          <InfoField label="Kategori Kontrak" value={contract.kategori} />
          <InfoField label="Tanggal Berlaku" value={contract.tanggal_berlaku} />
          <InfoField label="Nilai Kontrak (Rp)" value={formatCurrency(contract.nilai)} />
          <InfoField label="Durasi (bulan)" value={contract.durasi} />
          <InfoField label="Prioritas" value={contract.prioritas} />
          <InfoField label="Jenis Template" value={contract.jenis_template} />
        </div>

        {/* Catatan Tim BU */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Catatan Tim BU</label>
          <div className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 bg-gray-50 min-h-[80px] leading-relaxed">
            {contract.catatan_bu || '—'}
          </div>
        </div>

        {/* Documents */}
        <div className="grid grid-cols-2 gap-5">
          {contract.doc_legalitas && (
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Dokumen Legalitas</label>
              <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50">
                <FileText size={16} className="text-red-500 flex-shrink-0" />
                <span className="text-sm text-gray-700 flex-1 truncate">{contract.doc_legalitas}</span>
                <button className="text-[#1a3a6b] hover:text-[#15305a]"><Download size={15} /></button>
              </div>
            </div>
          )}
          {contract.doc_tambahan && (
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Dokumen Tambahan</label>
              <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50">
                <FileText size={16} className="text-red-500 flex-shrink-0" />
                <span className="text-sm text-gray-700 flex-1 truncate">{contract.doc_tambahan}</span>
                <button className="text-[#1a3a6b] hover:text-[#15305a]"><Download size={15} /></button>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-100 pt-5 space-y-5">
          {/* Catatan Reviewer (editable) */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Catatan</label>
            <textarea
              rows={3}
              placeholder="Tambahkan catatan review di sini..."
              value={catatan}
              onChange={e => setCatatan(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1a3a6b] resize-none"
            />
          </div>

          {/* Validasi Legalitas */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2.5">Validasi Legalitas</label>
            <div className="grid grid-cols-2 gap-3">
              {VALIDASI_ITEMS.map(item => (
                <label key={item.key} className="flex items-center gap-2.5 cursor-pointer group">
                  <div
                    onClick={() => toggleValidasi(item.key)}
                    className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 transition-all cursor-pointer ${
                      validasi[item.key]
                        ? 'bg-[#1a3a6b] border-[#1a3a6b]'
                        : 'border-gray-300 bg-white hover:border-[#1a3a6b]'
                    }`}
                  >
                    {validasi[item.key] && <span className="text-white text-[11px] font-bold">✓</span>}
                  </div>
                  <span
                    className="text-sm text-gray-600 group-hover:text-gray-800 cursor-pointer"
                    onClick={() => toggleValidasi(item.key)}
                  >
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Tindak Lanjut */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2.5">Tindak Lanjut</label>
            <div className="space-y-2.5">
              {TINDAK_LANJUT_OPTIONS.map(option => (
                <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                  <div
                    onClick={() => setTindakLanjut(option.value)}
                    className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all cursor-pointer ${
                      tindakLanjut === option.value
                        ? 'border-[#1a3a6b]'
                        : 'border-gray-300 hover:border-[#1a3a6b]'
                    }`}
                  >
                    {tindakLanjut === option.value && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#1a3a6b]" />
                    )}
                  </div>
                  <span
                    onClick={() => setTindakLanjut(option.value)}
                    className={`text-sm cursor-pointer transition-colors w-full py-2.5 px-4 rounded-lg ${
                      tindakLanjut === option.value
                        ? 'bg-[#1a3a6b] text-white font-semibold'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky footer actions */}
      <div className="bg-white border-t border-gray-100 rounded-xl shadow-sm p-4 flex items-center justify-end gap-3">
        <button
          onClick={() => navigate('/review')}
          className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50"
        >
          Simpan
        </button>
        <button
          onClick={() => setSubmitted(true)}
          className="px-8 py-2.5 bg-[#1a3a6b] text-white rounded-lg text-sm font-semibold hover:bg-[#15305a] shadow-sm"
        >
          Kirim
        </button>
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
