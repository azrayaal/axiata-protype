import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, FileText, X, Upload, CheckCircle2 } from 'lucide-react'
import { contracts } from '../../data/contracts'

const CATEGORIES = ['MOU', 'PKS', 'Kontrak', 'Perjanjian', 'Addendum']
const TEMPLATES = ['LN Template', 'External Template (Non-Template)']
const PRIORITIES = ['Tinggi', 'Sedang', 'Rendah']

export default function ContractEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const original = contracts.find(c => c.id === id)
  const [saved, setSaved] = useState(false)

  const [form, setForm] = useState(original ? {
    nama_perjanjian: original.nama_perjanjian,
    counterpart: original.counterpart,
    kategori: original.kategori,
    tanggal_berlaku: original.tanggal_berlaku,
    nilai: original.nilai,
    durasi: original.durasi,
    prioritas: original.prioritas,
    jenis_template: original.jenis_template,
    catatan_bu: original.catatan_bu,
    doc_legalitas: original.doc_legalitas,
    doc_tambahan: original.doc_tambahan,
  } : {})

  if (!original) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <p className="text-gray-500">Kontrak tidak ditemukan.</p>
        <button onClick={() => navigate('/kontrak/daftar')} className="text-[#1a3a6b] font-medium text-sm">← Kembali</button>
      </div>
    )
  }

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSave = () => setSaved(true)

  if (saved) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle2 size={40} className="text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Perubahan Berhasil Disimpan!</h2>
        <p className="text-gray-500 text-sm">Kontrak <strong>{form.nama_perjanjian}</strong> telah diperbarui.</p>
        <button
          onClick={() => navigate('/kontrak/daftar')}
          className="px-6 py-2.5 bg-[#1a3a6b] text-white rounded-lg text-sm font-semibold hover:bg-[#15305a]"
        >
          Kembali ke Daftar
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <nav className="flex items-center gap-1.5 text-sm text-gray-500">
        <span className="hover:text-[#1a3a6b] cursor-pointer" onClick={() => navigate('/kontrak/daftar')}>Daftar Kontrak</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">Edit Kontrak</span>
      </nav>

      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-800">Edit Kontrak</h1>
          <p className="text-sm text-gray-400 font-mono">{original.id}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
        <div className="grid grid-cols-2 gap-5">
          <Field label="Nama Perjanjian" required>
            <input type="text" value={form.nama_perjanjian} onChange={e => handleChange('nama_perjanjian', e.target.value)} className={inputCls()} />
          </Field>
          <Field label="Nama Counterpart" required>
            <input type="text" value={form.counterpart} onChange={e => handleChange('counterpart', e.target.value)} className={inputCls()} />
          </Field>
          <Field label="Kategori Kontrak" required>
            <select value={form.kategori} onChange={e => handleChange('kategori', e.target.value)} className={inputCls()}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Tanggal Berlaku" required>
            <input type="date" value={form.tanggal_berlaku} onChange={e => handleChange('tanggal_berlaku', e.target.value)} className={inputCls()} />
          </Field>
          <Field label="Nilai Kontrak (Rp)" required>
            <input type="text" value={form.nilai} onChange={e => handleChange('nilai', e.target.value)} className={inputCls()} />
          </Field>
          <Field label="Durasi (bulan)" required>
            <input type="number" value={form.durasi} onChange={e => handleChange('durasi', e.target.value)} className={inputCls()} />
          </Field>
          <Field label="Prioritas" required>
            <select value={form.prioritas} onChange={e => handleChange('prioritas', e.target.value)} className={inputCls()}>
              {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </Field>
          <Field label="Jenis Template" required>
            <select value={form.jenis_template} onChange={e => handleChange('jenis_template', e.target.value)} className={inputCls()}>
              {TEMPLATES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
        </div>

        <Field label="Catatan Tim BU">
          <textarea
            rows={4}
            value={form.catatan_bu}
            onChange={e => handleChange('catatan_bu', e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1a3a6b] resize-none"
          />
        </Field>

        <div className="grid grid-cols-2 gap-5">
          <Field label="Dokumen Legalitas">
            <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50">
              <FileText size={16} className="text-red-500 flex-shrink-0" />
              <span className="text-sm text-gray-700 flex-1 truncate">{form.doc_legalitas || 'Belum ada dokumen'}</span>
              <label className="cursor-pointer text-[#1a3a6b] hover:text-[#15305a]">
                <Upload size={15} />
                <input type="file" className="hidden" accept=".pdf" />
              </label>
            </div>
          </Field>
          <Field label="Dokumen Tambahan">
            <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50">
              <FileText size={16} className="text-red-500 flex-shrink-0" />
              <span className="text-sm text-gray-700 flex-1 truncate">{form.doc_tambahan || 'Belum ada dokumen'}</span>
              <label className="cursor-pointer text-[#1a3a6b] hover:text-[#15305a]">
                <Upload size={15} />
                <input type="file" className="hidden" accept=".pdf" />
              </label>
            </div>
          </Field>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <button onClick={() => navigate(-1)} className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50">
            Batal
          </button>
          <button onClick={handleSave} className="px-8 py-2.5 bg-[#1a3a6b] text-white rounded-lg text-sm font-semibold hover:bg-[#15305a] shadow-sm">
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  )
}

function Field({ label, children, required }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  )
}

function inputCls() {
  return 'w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1a3a6b] bg-white transition-all'
}
