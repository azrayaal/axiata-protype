export function StatusBadge({ status }) {
  const map = {
    Draft:    'bg-gray-100 text-gray-600 border border-gray-300',
    Review:   'bg-blue-100 text-blue-700 border border-blue-200',
    Revisi:   'bg-orange-100 text-orange-700 border border-orange-200',
    Approval: 'bg-amber-100 text-amber-700 border border-amber-200',
    Signing:  'bg-purple-100 text-purple-700 border border-purple-200',
    Selesai:  'bg-green-700 text-white',
    Ditolak:  'bg-red-100 text-red-700 border border-red-200',
    Expired:  'bg-red-200 text-red-800 border border-red-300',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${map[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  )
}

export function PriorityBadge({ priority }) {
  const map = {
    Tinggi: 'bg-red-100 text-red-700 border border-red-200',
    Sedang: 'bg-orange-100 text-orange-700 border border-orange-200',
    Rendah: 'bg-green-100 text-green-700 border border-green-200',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${map[priority] || 'bg-gray-100 text-gray-600'}`}>
      {priority}
    </span>
  )
}

export function TemplateBadge({ template }) {
  const map = {
    LN:    'bg-blue-100 text-[#1a3a6b] border border-blue-200 font-bold',
    Exter: 'text-orange-500 font-bold border border-orange-200 bg-orange-50',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs ${map[template] || 'bg-gray-100 text-gray-600'}`}>
      {template}
    </span>
  )
}
