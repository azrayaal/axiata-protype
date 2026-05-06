import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload, FileText, X, CheckCircle2 } from 'lucide-react'

const CATEGORIES = ['MOU', 'PKS', 'Kontrak', 'Perjanjian', 'Addendum']
const TEMPLATES = ['LN Template', 'External Template (Non-Template)']
const PRIORITIES = ['Tinggi', 'Sedang', 'Rendah']

export default function ContractCreate() {
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    nama_perjanjian: '',
    counterpart: '',
    kategori: '',
    tanggal_berlaku: '',
    nilai: '',
    durasi: '',
    prioritas: '',
    jenis_template: '',
    catatan_bu: '',
    doc_legalitas: null,
    doc_tambahan: null,
  })
  const [errors, setErrors] = useState({})

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const handleFile = (field, file) => {
    setForm(prev => ({ ...prev, [field]: file }))
  }

  const validate = () => {
    const e = {}
    if (!form.nama_perjanjian) e.nama_perjanjian = 'Wajib diisi'
    if (!form.counterpart) e.counterpart = 'Wajib diisi'
    if (!form.kategori) e.kategori = 'Wajib dipilih'
    if (!form.tanggal_berlaku) e.tanggal_berlaku = 'Wajib diisi'
    if (!form.nilai) e.nilai = 'Wajib diisi'
    if (!form.durasi) e.durasi = 'Wajib diisi'
    if (!form.prioritas) e.prioritas = 'Wajib dipilih'
    if (!form.jenis_template) e.jenis_template = 'Wajib dipilih'
    return e
  }

  const handleSubmit = () => {
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle2 size={40} className="text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Kontrak Berhasil Disubmit!</h2>
        <p className="text-gray-500 text-sm text-center max-w-sm">
          Kontrak <strong>{form.nama_perjanjian}</strong> telah berhasil disubmit dan akan segera ditinjau oleh Tim Legal.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/kontrak/daftar')}
            className="px-6 py-2.5 border border-[#1a3a6b] text-[#1a3a6b] rounded-lg text-sm font-semibold hover:bg-blue-50"
          >
            Lihat Daftar Kontrak
          </button>
          <button
            onClick={() => { setSubmitted(false); setForm({ nama_perjanjian: '', counterpart: '', kategori: '', tanggal_berlaku: '', nilai: '', durasi: '', prioritas: '', jenis_template: '', catatan_bu: '', doc_legalitas: null, doc_tambahan: null }) }}
            className="px-6 py-2.5 bg-[#1a3a6b] text-white rounded-lg text-sm font-semibold hover:bg-[#15305a]"
          >
            Tambah Kontrak Lain
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-500">
        <span className="hover:text-[#1a3a6b] cursor-pointer" onClick={() => navigate('/kontrak/daftar')}>Daftar Kontrak</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">Tambah Kontrak</span>
      </nav>

      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/kontrak/daftar')}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Tambah Kontrak</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
        {/* Row 1 */}
        <div className="grid grid-cols-2 gap-5">
          <Field label="Nama Perjanjian" error={errors.nama_perjanjian} required>
            <input
              type="text"
              placeholder="Masukkan nama perjanjian"
              value={form.nama_perjanjian}
              onChange={e => handleChange('nama_perjanjian', e.target.value)}
              className={inputCls(errors.nama_perjanjian)}
            />
          </Field>
          <Field label="Nama Counterpart" error={errors.counterpart} required>
            <input
              type="text"
              placeholder="Masukkan nama counterpart"
              value={form.counterpart}
              onChange={e => handleChange('counterpart', e.target.value)}
              className={inputCls(errors.counterpart)}
            />
          </Field>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-2 gap-5">
          <Field label="Kategori Kontrak" error={errors.kategori} required>
            <select
              value={form.kategori}
              onChange={e => handleChange('kategori', e.target.value)}
              className={inputCls(errors.kategori)}
            >
              <option value="">Pilih Kategori</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Tanggal Berlaku" error={errors.tanggal_berlaku} required>
            <input
              type="date"
              value={form.tanggal_berlaku}
              onChange={e => handleChange('tanggal_berlaku', e.target.value)}
              className={inputCls(errors.tanggal_berlaku)}
            />
          </Field>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-2 gap-5">
          <Field label="Nilai Kontrak (Rp)" error={errors.nilai} required>
            <input
              type="text"
              placeholder="Contoh: 200.000.000"
              value={form.nilai}
              onChange={e => handleChange('nilai', e.target.value)}
              className={inputCls(errors.nilai)}
            />
          </Field>
          <Field label="Durasi (bulan)" error={errors.durasi} required>
            <input
              type="number"
              placeholder="Contoh: 12"
              min="1"
              value={form.durasi}
              onChange={e => handleChange('durasi', e.target.value)}
              className={inputCls(errors.durasi)}
            />
          </Field>
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-2 gap-5">
          <Field label="Prioritas" error={errors.prioritas} required>
            <select
              value={form.prioritas}
              onChange={e => handleChange('prioritas', e.target.value)}
              className={inputCls(errors.prioritas)}
            >
              <option value="">Pilih Prioritas</option>
              {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </Field>
          <Field label="Jenis Template" error={errors.jenis_template} required>
            <select
              value={form.jenis_template}
              onChange={e => handleChange('jenis_template', e.target.value)}
              className={inputCls(errors.jenis_template)}
            >
              <option value="">Pilih Template</option>
              {TEMPLATES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
        </div>

        {/* Catatan BU */}
        <Field label="Catatan Tim BU">
          <textarea
            rows={4}
            placeholder="Tambahkan catatan atau deskripsi kontrak..."
            value={form.catatan_bu}
            onChange={e => handleChange('catatan_bu', e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1a3a6b] resize-none transition-all"
          />
        </Field>

        {/* File Upload */}
        <div className="grid grid-cols-2 gap-5">
          <FileUpload
            label="Dokumen Legalitas"
            file={form.doc_legalitas}
            onChange={f => handleFile('doc_legalitas', f)}
            required
          />
          <FileUpload
            label="Dokumen Tambahan"
            file={form.doc_tambahan}
            onChange={f => handleFile('doc_tambahan', f)}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            onClick={() => navigate('/kontrak/daftar')}
            className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={() => { /* save as draft */ }}
            className="px-6 py-2.5 border border-[#1a3a6b] text-[#1a3a6b] rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors"
          >
            Simpan Draft
          </button>
          <button
            onClick={handleSubmit}
            className="px-8 py-2.5 bg-[#1a3a6b] text-white rounded-lg text-sm font-semibold hover:bg-[#15305a] transition-colors shadow-sm"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

function Field({ label, children, error, required }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}

function FileUpload({ label, file, onChange, required }) {
  return (
    <Field label={label} required={required}>
      {file ? (
        <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50">
          <FileText size={16} className="text-red-500 flex-shrink-0" />
          <span className="text-sm text-gray-700 flex-1 truncate">{file.name}</span>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-gray-400 hover:text-red-500 flex-shrink-0"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <label className="flex items-center gap-3 border-2 border-dashed border-gray-200 rounded-lg px-3 py-3 cursor-pointer hover:border-[#1a3a6b] hover:bg-blue-50/30 transition-colors">
          <Upload size={16} className="text-gray-400" />
          <span className="text-sm text-gray-400">Klik untuk upload file PDF</span>
          <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={e => e.target.files[0] && onChange(e.target.files[0])} />
        </label>
      )}
    </Field>
  )
}

function inputCls(error) {
  return `w-full border ${error ? 'border-red-300 bg-red-50' : 'border-gray-200'} rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1a3a6b] bg-white transition-all`
}
