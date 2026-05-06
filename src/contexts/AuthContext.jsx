import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export const ROLES = {
  BU: 'business_unit',
  LEGAL: 'legal',
  APPROVER: 'approver',
  SUPERADMIN: 'superadmin',
}

export const MOCK_USERS = [
  {
    id: 'USR-001',
    name: 'Putra Saifudin',
    nik: 'P93312',
    role: ROLES.BU,
    roleLabel: 'Admin Pusat',
    division: 'Business Unit',
    avatar: 'PS',
  },
  {
    id: 'USR-002',
    name: 'Andi Riandi',
    nik: 'L10021',
    role: ROLES.LEGAL,
    roleLabel: 'Legal PIC',
    division: 'Tim Legal',
    avatar: 'AR',
  },
  {
    id: 'USR-003',
    name: 'Sari Widyawati',
    nik: 'A20033',
    role: ROLES.APPROVER,
    roleLabel: 'Manager',
    division: 'Approver',
    avatar: 'SW',
  },
  {
    id: 'USR-004',
    name: 'Budi Hartono',
    nik: 'SA0001',
    role: ROLES.SUPERADMIN,
    roleLabel: 'Superadmin',
    division: 'IT Admin',
    avatar: 'BH',
  },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = (selectedUser) => {
    setUser(selectedUser)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
