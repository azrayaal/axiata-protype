import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload, FileText, X, CheckCircle2 } from 'lucide-react'
import { contracts } from '../../data/contracts'

export default function UploadRevisi() {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState('')
  const [file, setFile] = useState(null)
  const [catatan, setCatatan] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const revisiContracts = contracts.filter(c => c.status === 'Revisi' || c.status === 'Draft')

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle2 size={40} className="text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Revisi Berhasil Diunggah!</h2>
        <p className="text-gray-500 text-sm text-center">
          Dokumen revisi telah berhasil diunggah dan dikirim ke Tim Legal untuk ditinjau kembali.
        </p>
        <div className="flex gap-3">
          <button onClick={() => navigate('/kontrak/daftar')} className="px-6 py-2.5 border border-[#1a3a6b] text-[#1a3a6b] rounded-lg text-sm font-semibold hover:bg-blue-50">
            Daftar Kontrak
          </button>
          <button onClick={() => { setSubmitted(false); setSelectedId(''); setFile(null); setCatatan('') }} className="px-6 py-2.5 bg-[#1a3a6b] text-white rounded-lg text-sm font-semibold hover:bg-[#15305a]">
            Upload Lagi
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <nav className="flex items-center gap-1.5 text-sm text-gray-500">
        <span className="hover:text-[#1a3a6b] cursor-pointer" onClick={() => navigate('/kontrak/daftar')}>Kontrak</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">Upload Revisi</span>
      </nav>

      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Upload Revisi Dokumen</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5 max-w-2xl">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Pilih Kontrak <span className="text-red-500">*</span></label>
          <select
            value={selectedId}
            onChange={e => setSelectedId(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1a3a6b] bg-white"
          >
            <option value="">-- Pilih kontrak yang perlu direvisi --</option>
            {revisiContracts.map(c => (
              <option key={c.id} value={c.id}>{c.id} — {c.nama_perjanjian} ({c.status})</option>
            ))}
          </select>
        </div>

        {selectedId && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-xs font-semibold text-amber-700 mb-1">Catatan Reviewer:</p>
            <p className="text-sm text-amber-800">
              {contracts.find(c => c.id === selectedId)?.catatan_reviewer || 'Tidak ada catatan reviewer.'}
            </p>
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Upload Dokumen Revisi <span className="text-red-500">*</span></label>
          {file ? (
            <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50">
              <FileText size={16} className="text-red-500" />
              <span className="text-sm text-gray-700 flex-1 truncate">{file.name}</span>
              <button onClick={() => setFile(null)} className="text-gray-400 hover:text-red-500">
                <X size={14} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl py-8 cursor-pointer hover:border-[#1a3a6b] hover:bg-blue-50/30 transition-colors">
              <Upload size={28} className="text-gray-300" />
              <span className="text-sm text-gray-400">Drag & drop atau klik untuk upload</span>
              <span className="text-xs text-gray-400">PDF, DOC, DOCX (Maks. 10MB)</span>
              <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={e => e.target.files[0] && setFile(e.target.files[0])} />
            </label>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Catatan Revisi</label>
          <textarea
            rows={4}
            placeholder="Jelaskan perubahan yang dilakukan pada dokumen revisi ini..."
            value={catatan}
            onChange={e => setCatatan(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1a3a6b] resize-none"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <button onClick={() => navigate(-1)} className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50">
            Batal
          </button>
          <button
            onClick={() => { if (selectedId && file) setSubmitted(true) }}
            disabled={!selectedId || !file}
            className="px-8 py-2.5 bg-[#1a3a6b] text-white rounded-lg text-sm font-semibold hover:bg-[#15305a] disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center gap-2"
          >
            <Upload size={16} /> Kirim Revisi
          </button>
        </div>
      </div>
    </div>
  )
}
